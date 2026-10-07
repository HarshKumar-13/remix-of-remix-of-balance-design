export const SERVICE_IDS = [
  "corporate-image-consulting",
  "personal-image-consulting",
  "styling-workshops",
  "brand-design-workshops",
  "own-your-spotlight",
  "trend-forecasting",
  "graphic-print-design",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICES: { id: ServiceId; title: string; summary: string }[] = [
  {
    id: "corporate-image-consulting",
    title: "Corporate Image Consulting",
    summary:
      "Coaching professionals to look sharp and stylish, build self confidence and a magnetic personality; styling sessions and mindset coaching to command respect in meetings, presentations and high-stake conversations.",
  },
  {
    id: "personal-image-consulting",
    title: "Personal Image Consulting",
    summary:
      "\"Master the Right Dress Code\" — a visual, interactive seminar on which colour, fit and style suit an individual's skin tone, height and body type.",
  },
  {
    id: "styling-workshops",
    title: "Design Aesthetics & Styling Workshops",
    summary:
      "For teams of fashion and retail brands: VM teams so stores look more attractive, and sales teams so they become stylists who guide customers.",
  },
  {
    id: "brand-design-workshops",
    title: "Design Workshops & Seminars",
    summary:
      "For teams of apparel and fashion brands in Design Aesthetics, Fashion Styling and Trend Forecasting.",
  },
  {
    id: "own-your-spotlight",
    title: "Own Your Spotlight",
    summary:
      "Online coaching for professionals to look sharp, build self confidence and a magnetic personality as they meet and interact with the world.",
  },
  {
    id: "trend-forecasting",
    title: "Trend Forecasting & Line Presentation",
    summary:
      "Anticipating what customers will embrace in upcoming seasons and defining the styles or style groups needed to meet a business target.",
  },
  {
    id: "graphic-print-design",
    title: "Graphic & Print Design",
    summary: "CADs for shirts, graphic design for T-shirts and textile print design for apparel.",
  },
];
