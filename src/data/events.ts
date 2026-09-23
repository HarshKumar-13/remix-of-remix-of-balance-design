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
  year: string;
  location: string;
  description: string;
  image: string;
};

/* PLACEHOLDER — upcoming events */
export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "upcoming-01",
    title: "The Art of Personal Style",
    type: "Personal Image Workshop",
    date: "18 October 2026",
    location: "Bengaluru",
    description:
      "An immersive session exploring colour, silhouettes, wardrobe choices and the relationship between personal style and professional presence.",
    cta: "Book your place",
    image: p8,
  },
  {
    id: "upcoming-02",
    title: "Master the Right Dress Code",
    type: "Image & Dress Code Seminar",
    date: "07 November 2026",
    location: "New Delhi",
    description:
      "A practical session on professional attire, personal presentation and making confident choices that communicate who you are.",
    cta: "Book your place",
    image: p6,
  },
  {
    id: "upcoming-03",
    title: "Fashion in Motion",
    type: "Fashion Show",
    date: "28 November 2026",
    location: "Mumbai",
    description:
      "An editorial fashion experience bringing together styling, presentation and contemporary fashion perspectives.",
    cta: "Book your place",
    image: p14,
  },
];

/* PLACEHOLDER — past events */
export const PAST_EVENTS: PastEvent[] = [
  {
    id: "past-01",
    title: "Image, Identity & Impact",
    type: "Corporate Image Seminar",
    year: "2026",
    location: "Bengaluru",
    description:
      "A leadership-focused seminar on how appearance, behaviour and communication shape professional presence.",
    image: p5,
  },
  {
    id: "past-02",
    title: "The Right Dress Code",
    type: "Professional Image Workshop",
    year: "2026",
    location: "Hyderabad",
    description:
      "A working session decoding dress codes and translating them into a wardrobe that works every day.",
    image: p9,
  },
  {
    id: "past-03",
    title: "Style in Motion",
    type: "Fashion Show",
    year: "2025",
    location: "Mumbai",
    description:
      "A runway presentation exploring silhouette, texture and movement as a single visual language.",
    image: p18,
  },
  {
    id: "past-04",
    title: "Defining Who Am I",
    type: "Personal Image Seminar",
    year: "2025",
    location: "New Delhi",
    description:
      "An intimate seminar on identity, self-perception and dressing in a way that feels honest and considered.",
    image: p13,
  },
];

/* PLACEHOLDER — editorial imagery for feature sections */
export const EVENTS_MEDIA = {
  featuredShow: p15,
  seminarPrimary: p3,
  seminarSecondary: p8,
};
