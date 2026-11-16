import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8787;

// PostgreSQL Connection Pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Strict Rate Limiting for Auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 attempts per IP
  message: { status: 'rate_limited', message: 'Too many attempts, please wait.' }
});

// ---------------------------------------------------------------------------
// 1. LEAD / DEMO SUBMISSION ENDPOINT (POST /lead)
// ---------------------------------------------------------------------------
app.post('/lead', async (req, res) => {
  const {
    type,
    language,
    fullName,
    workEmail,
    company,
    country,
    industry,
    companySize,
    businessNeeds,
    message,
    consent,
    pagePath
  } = req.body;

  if (!fullName || !workEmail || !company || !consent) {
    return res.status(400).json({ ok: false, error: 'validation' });
  }

  try {
    const query = `
      INSERT INTO lead_submissions (
        type, language, full_name, work_email, company, country,
        industry, company_size, business_needs, message, consent,
        page_path, ip_address, user_agent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id;
    `;

    const values = [
      type || 'contact',
      language || 'en',
      fullName.trim(),
      workEmail.trim().toLowerCase(),
      company.trim(),
      country || null,
      industry || null,
      companySize || null,
      Array.isArray(businessNeeds) ? businessNeeds : [],
      message ? message.trim() : null,
      Boolean(consent),
      pagePath || null,
      req.ip,
      req.headers['user-agent'] || null
    ];

    await pool.query(query, values);

    // Optional: Trigger notification email to contact@nelias.app here

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Lead error:', err);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
});

// ---------------------------------------------------------------------------
// 2. SIGN UP REGISTRATION (POST /sign-up)
// ---------------------------------------------------------------------------
app.post('/sign-up', async (req, res) => {
  const {
    fullName,
    email,
    company,
    country,
    phone,
    password,
    acceptedTerms,
    termsVersion,
    privacyVersion,
    locale
  } = req.body;

  if (!fullName || !email || !password || !acceptedTerms) {
    return res.status(400).json({ status: 'validation' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Check if user already exists
    const existing = await client.query('SELECT id FROM users WHERE email = $1', [normalizedEmail]);
    if (existing.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(200).json({ status: 'exists' });
    }

    // 2. Hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, 12);

    // 3. Create user record
    const insertUser = `
      INSERT INTO users (full_name, email, password_hash, company, country, phone, locale)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `;
    const userRes = await client.query(insertUser, [
      fullName.trim(),
      normalizedEmail,
      passwordHash,
      company.trim(),
      country,
      phone ? phone.trim() : null,
      locale || 'en'
    ]);
    const userId = userRes.rows[0].id;

    // 4. Log Terms of Use & Privacy Consent Evidence (Article 13 Compliance)
    const insertConsent = `
      INSERT INTO legal_consent_logs (user_id, terms_version, privacy_version, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5);
    `;
    await client.query(insertConsent, [
      userId,
      termsVersion || '1.1',
      privacyVersion || '1.1',
      req.ip,
      req.headers['user-agent']
    ]);

    await client.query('COMMIT');
    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Sign-up error:', err);
    return res.status(500).json({ status: 'error' });
  } finally {
    client.release();
  }
});

// ---------------------------------------------------------------------------
// 3. SIGN IN / AUTHENTICATION (POST /sign-in)
// ---------------------------------------------------------------------------
app.post('/sign-in', authLimiter, async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();

  try {
    const userRes = await pool.query(
      'SELECT id, password_hash, is_active FROM users WHERE email = $1',
      [normalizedEmail]
    );

    if (userRes.rows.length === 0) {
      // Log failed attempt for audit & rate limiting
      await pool.query(
        'INSERT INTO auth_audit_logs (email, event_type, failure_reason, ip_address) VALUES ($1, $2, $3, $4)',
        [normalizedEmail, 'login_failure', 'user_not_found', req.ip]
      );
      return res.status(401).json({ status: 'invalid' });
    }

    const user = userRes.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      await pool.query(
        'INSERT INTO auth_audit_logs (email, user_id, event_type, failure_reason, ip_address) VALUES ($1, $2, $3, $4, $5)',
        [normalizedEmail, user.id, 'login_failure', 'wrong_password', req.ip]
      );
      return res.status(401).json({ status: 'invalid' });
    }

    // Log success
    await pool.query(
      'INSERT INTO auth_audit_logs (email, user_id, event_type, ip_address) VALUES ($1, $2, $3, $4)',
      [normalizedEmail, user.id, 'login_success', req.ip]
    );

    return res.status(200).json({
      status: 'ok',
      redirectUrl: 'https://login.nelias.app/dashboard'
    });
  } catch (err) {
    console.error('Sign-in error:', err);
    return res.status(500).json({ status: 'error' });
  }
});

app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
});