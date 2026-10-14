import oys1 from "@/assets/oys-session-1.jpeg";
import oys2 from "@/assets/oys-session-2.jpeg";
/**
 * ============================================================
 * PLACEHOLDER EVENT DATA — DEMONSTRATION ONLY
 * ------------------------------------------------------------
 * Replace the objects below with real event information.
 * Structure must stay the same; no layout changes are required.
 * ============================================================
 */

import p3 from "@/assets/Picture3.jpg";
import p5 from "@/assets/Picture5.jpg";
import p6 from "@/assets/Picture6.jpg";
import p8 from "@/assets/Picture8.jpg";
import p9 from "@/assets/Picture9.jpg";
import p13 from "@/assets/Picture13.jpg";
import p14 from "@/assets/Picture14.jpg";
import p15 from "@/assets/Picture15.jpg";
import orra1 from "@/assets/orra-1271.jpg";
import orra2 from "@/assets/orra-1314.jpg";
import orra3 from "@/assets/orra-1306.jpg";
import max1 from "@/assets/max-fashion-1.jpg";
import max2 from "@/assets/max-fashion-2.jpg";
import max3 from "@/assets/max-fashion-3.jpg";
import p18 from "@/assets/Picture18.jpg";
import leela1 from "@/assets/leela-1.jpg";
import leela2 from "@/assets/leela-2.jpg";
import taj1 from "@/assets/taj-1.jpg";
import taj2 from "@/assets/taj-2.jpg";
import taj3 from "@/assets/taj-3.jpg";
import rt1 from "@/assets/reliance-1.jpg";
import rt2 from "@/assets/reliance-2.jpg";
import rt3 from "@/assets/reliance-3.jpg";
import rt4 from "@/assets/reliance-4.jpg";
import vh1 from "@/assets/van-heusen-1.jpg";
import vh2 from "@/assets/van-heusen-2.jpg";
import vh3 from "@/assets/van-heusen-3.jpg";
import bb1 from "@/assets/bal-bharti-1.jpg";
import bb2 from "@/assets/bal-bharti-2.jpg";
import bb3 from "@/assets/bal-bharti-3.jpg";
import isb1 from "@/assets/isb-1.jpg";
import isb2 from "@/assets/isb-2.jpg";
import iim1 from "@/assets/iim-1.jpg";
import iim2 from "@/assets/iim-2.jpg";
import iim3 from "@/assets/iim-3.jpg";
import sem1 from "@/assets/sem-1.jpg";
import sem2 from "@/assets/sem-2.jpg";
import sem3 from "@/assets/sem-3.jpg";
import sem4 from "@/assets/sem-4.jpg";
import sem5 from "@/assets/sem-5.jpg";
import sem6 from "@/assets/sem-6.jpg";

export type UpcomingEvent = {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  description: string;
  cta: string;
  image: string;
};

export type PastEvent = {
  id: string;
  title: string;
  type: string;
  date: string;
  image: string;
  images?: string[];
};

const RAW_PAST_EVENTS: PastEvent[] = [
  { id: "past-01", title: "IIM Bangalore", type: "MASTER THE RIGHT DRESSS CODE ( MTRDC ) - for Graduates & Alumni of Business Schools", date: "3rd Feb 2015", image: iim1, images: [iim1, iim2, iim3] },
  { id: "past-02", title: "ISB Mohali", type: "MASTER THE RIGHT DRESSS CODE ( MTRDC ) - for Graduates & Alumni of Business Schools", date: "21st Sep 2018", image: isb1, images: [isb1, isb2] },
  { id: "past-03", title: "Van Husen Customers", type: "MASTER THE RIGHT DRESSS CODE - Corporate Dressing up", date: "18th May 2013", image: vh1, images: [vh1, vh2, vh3] },
  { id: "past-04", title: "Max Fashion Customers", type: "MASTER THE RIGHT DRESSS CODE - Corporate Dressing up", date: "26th April 2014", image: max1, images: [max1, max2, max3] },
  { id: "past-05", title: "The Raymond Shop Customers", type: "MASTER THE RIGHT DRESSS CODE - Corporate Dressing up", date: "15 July 2018", image: rt1, images: [rt1, rt2, rt3, rt4] },
  { id: "past-06", title: "Orra Fine Jewellery", type: "MASTER THE RIGHT DRESSS CODE - Styling session", date: "29th October 2023", image: orra1, images: [orra1, orra2, orra3] },
  { id: "past-07", title: "Bal Bharti School Teachers", type: "MASTER THE RIGHT DRESSS CODE - Styling session", date: "4th March 2024", image: bb1, images: [bb1, bb2, bb3] },
  { id: "past-08", title: "Reliance Trends", type: "DESIGN AESTHETICS AND STYLING WORKSHOP - for Brand teams", date: "May & October 2023", image: p3 },
  { id: "past-10", title: "Own Your Spotlight", type: "Own Your Spotlight – Online Styling & Mindset Coaching Session", date: "20th July 2025", image: oys1, images: [oys1, oys2] },
];

/* Pinned to the end of the list. Type and photos are stand-ins until the real details are supplied. */
const PINNED_LAST_EVENTS: PastEvent[] = [
  { id: "past-leela", title: "Leela Palace", type: "Corporate Image Consulting", date: "7th April 2013", image: leela1, images: [leela1, leela2] },
  { id: "past-taj", title: "Taj Mahal Delhi", type: "Corporate Image Consulting", date: "Feb 2013", image: taj1, images: [taj1, taj2, taj3] },
];

/* PLACEHOLDER — upcoming events */
const MONTHS = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

/** Parses dates like "3rd Feb 2015", "15 July 2018" or "May & October 2023" (uses the latest month). */
export function parseEventDate(value: string): number {
  const text = value.toLowerCase();
  const year = Number(text.match(/\d{4}/)?.[0] ?? 0);
  let month = 0;
  MONTHS.forEach((m, idx) => { if (new RegExp(`\\b${m}`).test(text)) month = Math.max(month, idx); });
  const day = Number(text.replace(/\d{4}/, "").match(/\b(\d{1,2})(st|nd|rd|th)?\b/)?.[1] ?? 1);
  return new Date(year, month, day).getTime();
}

export const PAST_EVENTS: PastEvent[] = [
  ...[...RAW_PAST_EVENTS].sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date)),
  ...PINNED_LAST_EVENTS,
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  { id: "upcoming-01", title: "The Art of Personal Style", type: "Personal Image Workshop", date: "18 October 2026", location: "Bengaluru", description: "An immersive session exploring colour, silhouettes, wardrobe choices and the relationship between personal style and professional presence.", cta: "Book your place", image: p8 },
  { id: "upcoming-02", title: "Master the Right Dress Code", type: "Image & Dress Code Seminar", date: "07 November 2026", location: "New Delhi", description: "A practical session on professional attire, personal presentation and making confident choices that communicate who you are.", cta: "Book your place", image: p6 },
  { id: "upcoming-03", title: "Fashion in Motion", type: "Fashion Show", date: "28 November 2026", location: "Mumbai", description: "An editorial fashion experience bringing together styling, presentation and contemporary fashion perspectives.", cta: "Book your place", image: p14 },
];

/* PLACEHOLDER — editorial imagery for feature sections */
export const EVENTS_MEDIA = {
  featuredShow: p15,
  seminarPrimary: p3,
  seminarGallery: [sem1, sem2, sem3, sem4, sem5, sem6],
  seminarSecondary: p8,
};
