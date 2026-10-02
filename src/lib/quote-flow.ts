export type MoveDistance =
  | "Local"
  | "Short Haul"
  | "Long Distance"
  | "Local Labor Only";

export type HomeType = "House" | "Apt" | "Condo" | "Others";

export type RoomType = string;

export type DateType = "Exact" | "Flexibile" | "NotSure";

export interface QuoteFormData {
  moveType: MoveDistance | "";
  homeType: HomeType | "";
  roomType: RoomType | "";
  zipcode: string;
  destinationZip: string;
  dateType: DateType | "";
  date: string;
  name: string;
  phone: string;
  smsConsent: boolean;
}

export const initialQuoteFormData: QuoteFormData = {
  moveType: "",
  homeType: "",
  roomType: "",
  zipcode: "",
  destinationZip: "",
  dateType: "",
  date: "",
  name: "",
  phone: "",
  smsConsent: false,
};

export const MOVE_DISTANCE_OPTIONS = [
  {
    label: "LOCAL",
    desc: "Less than 35 miles",
    value: "Local" as const,
  },
  {
    label: "MORE THAN 1 HOUR AWAY",
    desc: "More than 35 miles",
    value: "Short Haul" as const,
  },
  {
    label: "OUT OF STATE",
    desc: "Exclusive direct service",
    value: "Long Distance" as const,
  },
  {
    label: "LOADING OR UNLOADING ONLY",
    desc: "We got pros to lend a hand",
    value: "Local Labor Only" as const,
  },
] as const;

export const HOME_TYPE_OPTIONS = [
  {
    label: "HOUSE",
    desc: "Experienced crews to handle any sized home",
    value: "House" as const,
  },
  {
    label: "APARTMENT",
    desc: "Our most common move size...we're experts!",
    value: "Apt" as const,
  },
  {
    label: "CONDO",
    desc: "We know condo rules",
    value: "Condo" as const,
  },
  {
    label: "FEW ITEMS, OFFICE, & STORAGE",
    desc: "We've got you covered.",
    value: "Others" as const,
  },
] as const;

export const ROOM_OPTIONS: Record<
  HomeType,
  { label: string; desc: string; value: string }[]
> = {
  House: [
    { label: "4+ Bedroom", desc: "No job too small", value: "4 Bedroom or more" },
    { label: "3 BEDROOM", desc: "Quick and simple move...we'll keep it that way", value: "3 Bedroom" },
    { label: "2 BEDROOM", desc: "Our most common move size...we're experts!", value: "2 Bedroom" },
    { label: "A few items", desc: "No job too small", value: "Few Items" },
  ],
  Apt: [
    { label: "1 BEDROOM", desc: "Quick and simple move...we'll keep it that way", value: "1 Bedroom" },
    { label: "2 BEDROOM", desc: "Our most common move size...we're experts!", value: "2 Bedroom or more" },
    { label: "3+ BEDROOM", desc: "Experienced crews to handle any sized home", value: "2 Bedroom or more" },
    { label: "A few items", desc: "No job too small", value: "Few Items" },
  ],
  Condo: [
    { label: "3+ BEDROOM", desc: "Experienced crews to handle any sized home", value: "2 Bedroom or more" },
    { label: "2 BEDROOM", desc: "Our most common move size...we're experts!", value: "2 Bedroom or more" },
    { label: "1 BEDROOM", desc: "Quick and simple move...we'll keep it that way", value: "1 Bedroom" },
    { label: "A few items", desc: "No job too small", value: "Few Items" },
  ],
  Others: [
    { label: "Office", desc: "We keep your business moving", value: "Small Office" },
    { label: "Storage", desc: "Our most common move size...we're experts!", value: "Storage" },
    { label: "A few items", desc: "No job too small", value: "Few Items" },
  ],
};

export const DATE_TYPE_OPTIONS = [
  { label: "I have an exact date", desc: "Grab the best deal", value: "Exact" as const },
  { label: "I have a little flexibility", desc: "We got you", value: "Flexibile" as const },
  { label: "I'm not sure", desc: "Don't worry, you can still get a quote", value: "NotSure" as const },
] as const;

export type QuoteStepId =
  | "move"
  | "type"
  | "size"
  | "zip"
  | "about-date"
  | "date"
  | "confirm"
  | "call";

export function buildQuoteSteps(data: QuoteFormData): QuoteStepId[] {
  const steps: QuoteStepId[] = ["move", "type", "size", "zip", "about-date"];
  if (data.dateType === "Exact" || data.dateType === "Flexibile") {
    steps.push("date");
  }
  steps.push("confirm", "call");
  return steps;
}

export function sizeStepTitle(homeType: HomeType | ""): string {
  if (homeType === "House") return "How many bedrooms are in your home?";
  if (homeType === "Apt") return "How many bedrooms are in your apartment?";
  if (homeType === "Condo") return "How many bedrooms are in your home?";
  if (homeType === "Others") return "What can we help you move?";
  return "How many bedrooms are in your home?";
}

export function zipStepTitle(data: QuoteFormData): string {
  if (data.moveType === "Long Distance") return "Where are you moving from and to?";
  return "Where are you moving from?";
}

export function needsDestinationZip(data: QuoteFormData): boolean {
  return data.moveType === "Long Distance";
}

export function isLocalLaborOnly(data: QuoteFormData): boolean {
  return data.moveType === "Local Labor Only";
}
