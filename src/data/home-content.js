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
} from "lucide-react";

export const scenarioKeys = ["scattered", "visibility", "time"];

export const capabilityCards = [
  { id: "customers", icon: Users, area: "crm-sales" },
  { id: "sales", icon: TrendingUp, area: "crm-sales" },
  { id: "purchasing", icon: ShoppingCart, area: "purchasing-inventory" },
  { id: "inventory", icon: Boxes, area: "purchasing-inventory" },
  { id: "finance", icon: Wallet, area: "finance-accounting" },
  { id: "projects", icon: FolderKanban, area: "projects-timesheets" },
];

// TODO(Debass): capability suggestions are derived only from words in each approved industry summary. Confirm.
export const industryProfiles = {
  "retail-distribution": {
    icon: Store,
    areas: ["crm-sales", "purchasing-inventory"],
  },
  "professional-services": {
    icon: Briefcase,
    areas: [
      "crm-sales",
      "projects-timesheets",
      "finance-accounting",
      "reporting-analytics",
    ],
  },
  "manufacturing": {
    icon: Factory,
    areas: ["purchasing-inventory", "manufacturing-quality"],
  },
  "healthcare": {
    icon: Stethoscope,
    areas: ["purchasing-inventory", "customer-support-portal"],
  },
  "hospitality": {
    icon: BedDouble,
    areas: ["purchasing-inventory", "finance-accounting", "human-resources"],
  },
  "education-training": {
    icon: GraduationCap,
    areas: ["finance-accounting", "projects-timesheets"],
  },
  "insurance-financial-services": {
    icon: ShieldCheck,
    areas: [
      "crm-sales",
      "customer-support-portal",
      "workflows-automation",
    ],
  },
  "energy-field-services": {
    icon: Zap,
    areas: ["assets-maintenance", "projects-timesheets"],
  },
};
