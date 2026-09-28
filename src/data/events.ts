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
import p18 from "@/assets/Picture18.jpg";

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
};

export const PAST_EVENTS: PastEvent[] = [
  { id: "past-01", title: "IIM Bangalore", type: "MASTER THE RIGHT DRESSS CODE ( MTRDC ) - for Graduates & Alumni of Business Schools", date: "3rd Feb 2015", image: p5 },
  { id: "past-02", title: "ISB Mohali", type: "MASTER THE RIGHT DRESSS CODE ( MTRDC ) - for Graduates & Alumni of Business Schools", date: "21st Sep 2018", image: p9 },
  { id: "past-03", title: "Van Husen Customers", type: "MASTER THE RIGHT DRESSS CODE - Corporate Dressing up", date: "18th May 2013", image: p6 },
  { id: "past-04", title: "Max Fashion Customers", type: "MASTER THE RIGHT DRESSS CODE - Corporate Dressing up", date: "26th April 2014", image: p13 },
  { id: "past-05", title: "The Raymond Shop Customers", type: "MASTER THE RIGHT DRESSS CODE - Corporate Dressing up", date: "15 July 2018", image: p3 },
  { id: "past-06", title: "Orra Fine Jewellery", type: "MASTER THE RIGHT DRESSS CODE - Styling session", date: "29th October 2023", image: p14 },
  { id: "past-07", title: "Bal Bharti School Teachers", type: "MASTER THE RIGHT DRESSS CODE - Styling session", date: "4th March 2024", image: p8 },
  { id: "past-08", title: "Reliance Trends", type: "DESIGN AESTHETICS AND STYLING WORKSHOP - for Brand teams", date: "May & October 2023", image: p18 },
  { id: "past-09", title: "GMETRI Technologies", type: "DESIGN AESTHETICS AND STYLING WORKSHOP - for Brand teams", date: "19th Sep 2025", image: p15 },
  { id: "past-10", title: "Own Your Spotlight", type: "Own Your Spotlight – Online Styling & Mindset Coaching Session", date: "20th July 2025", image: p5 },
];

/* PLACEHOLDER — upcoming events */
export const UPCOMING_EVENTS: UpcomingEvent[] = [
  { id: "upcoming-01", title: "The Art of Personal Style", type: "Personal Image Workshop", date: "18 October 2026", location: "Bengaluru", description: "An immersive session exploring colour, silhouettes, wardrobe choices and the relationship between personal style and professional presence.", cta: "Book your place", image: p8 },
  { id: "upcoming-02", title: "Master the Right Dress Code", type: "Image & Dress Code Seminar", date: "07 November 2026", location: "New Delhi", description: "A practical session on professional attire, personal presentation and making confident choices that communicate who you are.", cta: "Book your place", image: p6 },
  { id: "upcoming-03", title: "Fashion in Motion", type: "Fashion Show", date: "28 November 2026", location: "Mumbai", description: "An editorial fashion experience bringing together styling, presentation and contemporary fashion perspectives.", cta: "Book your place", image: p14 },
];

/* PLACEHOLDER — editorial imagery for feature sections */
export const EVENTS_MEDIA = {
  featuredShow: p15,
  seminarPrimary: p3,
  seminarGallery: [p3, p5, p9, p13, p6],
  seminarSecondary: p8,
};
