import { BookOpen, Layers, Compass, Globe2, Workflow } from "lucide-react";
import { AVAILABILITY } from "./feature-states.js";

// If a lucide name does not exist in the installed version, use the closest icon and report it.
// state: available | coming-later | hidden. A `path` (internal route) is added only when the article page exists.
// TODO(Debass): no article text, date, author or industry tag exists yet; all five are "coming-later" until content is supplied.
export const articles = [
  { id: "crm-erp-bmp-bos", icon: BookOpen, state: AVAILABILITY.COMING_LATER },
  { id: "adapt-to-your-business", icon: Layers, state: AVAILABILITY.COMING_LATER },
  { id: "sector-engine-selection", icon: Compass, state: AVAILABILITY.COMING_LATER },
  { id: "digital-management-africa", icon: Globe2, state: AVAILABILITY.COMING_LATER },
  { id: "tools-to-one-environment", icon: Workflow, state: AVAILABILITY.COMING_LATER },
];

// PDF order of the approved FAQ answers (Section 11).
export const faqKeys = [
  "whatIsNelias",
  "isErp",
  "sectorEngine",
  "addLater",
  "multipleOffices",
  "hosting",
  "connect",
  "getStarted",
  "tryNelias",
  "moreThanOneCompany",
];
