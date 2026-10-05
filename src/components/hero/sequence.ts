export type Motion = "fadeScale" | "clip" | "blur" | "slide" | "flash" | "dissolve";
export type Placement = "left" | "edge" | "over" | "outside" | "oversize" | "low";
export type Seg = string | { em: string };

export type Beat = {
  kind: "phrase" | "question" | "statement";
  parts: Seg[];
  motion: Motion;
  place: Placement;
  ms: number;
};

const P = 1500;
const Q = 2500;
const S = 3000;

export const BEATS: Beat[] = [
  { kind: "phrase", parts: ["Design & Styling workshops"], motion: "fadeScale", place: "left", ms: P },
  { kind: "phrase", parts: ["creating looks"], motion: "clip", place: "over", ms: P },
  { kind: "phrase", parts: ["personal image consulting"], motion: "blur", place: "edge", ms: P },
  { kind: "phrase", parts: ["fashion forecasting"], motion: "flash", place: "oversize", ms: P },
  { kind: "phrase", parts: ["creating fashion collections"], motion: "slide", place: "low", ms: P },
  { kind: "phrase", parts: ["Design Aesthetics workshops"], motion: "dissolve", place: "outside", ms: P },

  { kind: "question", parts: ["How do I look smart, presentable & successful to others?"], motion: "blur", place: "left", ms: Q },
  { kind: "question", parts: ["How to look slim and tall?"], motion: "dissolve", place: "over", ms: Q },
  { kind: "question", parts: ["How to look presentable with your height, skin tone and body type?"], motion: "fadeScale", place: "edge", ms: Q },
  { kind: "question", parts: ["How to buy clothes that enhance your attributes and diminish your problem areas?"], motion: "clip", place: "low", ms: Q },
  { kind: "question", parts: ["How to carry different looks?"], motion: "blur", place: "outside", ms: Q },
  { kind: "question", parts: ["Whats in trend and how to choose the right one for yourself?"], motion: "dissolve", place: "left", ms: Q },

  {
    kind: "statement",
    parts: ["Get the exposure to new fits, colours, styles, patterns and silhouettes that most importantly work for your body type and skin tone."],
    motion: "fadeScale",
    place: "left",
    ms: S,
  },
  {
    kind: "statement",
    parts: ["WE transform the way ", { em: "YOU" }, " dress up such that your visual impact is more powerful and ", { em: "confident" }, "."],
    motion: "clip",
    place: "edge",
    ms: S,
  },
  {
    kind: "statement",
    parts: ["We Create wardrobes that enhance our strength areas and diminish our problem areas."],
    motion: "slide",
    place: "low",
    ms: S,
  },
  {
    kind: "statement",
    parts: ["To dress & style themselves just like a ", { em: "Designer" }, " for your ", { em: "LIFETIME" }, "."],
    motion: "blur",
    place: "over",
    ms: S,
  },
  {
    kind: "statement",
    parts: ["Build ", { em: "confidence" }, " and self Pride and have a ", { em: "magnetic presence" }, "."],
    motion: "dissolve",
    place: "left",
    ms: S,
  },
];
