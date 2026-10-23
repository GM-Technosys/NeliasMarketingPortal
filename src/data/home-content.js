import {
  Users,
  TrendingUp,
  ShoppingCart,
  Boxes,
  Wallet,
  FolderKanban,
  Store,
  Briefcase,
  Factory,
  Stethoscope,
  BedDouble,
  GraduationCap,
  ShieldCheck,
  Zap,
  Building2,
  Pill,
  HardHat,
  Laptop,
} from "lucide-react";
import { industryAreas } from "./industry-areas.js";

export const scenarioKeys = ["scattered", "visibility", "time"];

export const capabilityCards = [
  { id: "customers", icon: Users, area: "crm-sales" },
  { id: "sales", icon: TrendingUp, area: "crm-sales" },
  { id: "purchasing", icon: ShoppingCart, area: "purchasing-inventory" },
  { id: "inventory", icon: Boxes, area: "purchasing-inventory" },
  { id: "finance", icon: Wallet, area: "finance-accounting" },
  { id: "projects", icon: FolderKanban, area: "projects-timesheets" },
];

const industryIcons = {
  "retail-distribution": Store,
  "professional-services": Briefcase,
  "manufacturing": Factory,
  "healthcare": Stethoscope,
  "hospitality": BedDouble,
  "education-training": GraduationCap,
  "insurance-financial-services": ShieldCheck,
  "energy-field-services": Zap,
  "real-estate": Building2,
  "pharmacies": Pill,
  "construction-btp": HardHat,
  "it-technology-services": Laptop,
};

// TODO(Debass): capability suggestions are derived only from words in each approved industry summary. Confirm.
export const industryProfiles = Object.fromEntries(
  Object.entries(industryAreas).map(([slug, areas]) => [
    slug,
    {
      icon: industryIcons[slug],
      areas,
    },
  ]),
);

