export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "dressing-the-modern-workplace",
    title: "Dressing the modern workplace",
    excerpt:
      "Dress codes have softened, but expectation has not. A field note on how teams can look considered without looking corporate.",
    date: "12 August 2026",
    category: "Corporate Image",
    image: "/assets/Picture6.jpg",
    body: [
      "The dress code has not disappeared — it has become unspoken. In most organisations today, the rules live in observation rather than in a handbook, which makes them harder to follow and far easier to get wrong.",
      "In our workshops we begin with the same question: what should someone understand about your organisation within the first ten seconds of meeting your team? Fit, proportion and colour answer that question long before anyone speaks.",
      "The aim is never uniformity. It is coherence — a shared level of care that lets individual personality show through without diluting the identity of the brand behind it.",
    ],
  },
  {
    slug: "reading-a-trend-before-it-arrives",
    title: "Reading a trend before it arrives",
    excerpt:
      "Forecasting is less about prediction and more about attention. How colour, material and mood stories are built season after season.",
    date: "24 June 2026",
    category: "Trend Forecasting",
    image: "/assets/Picture8.jpg",
    body: [
      "A forecast begins as a collection of fragments: a pavement colour, a fabric weight, a shift in how people are travelling. Alone they mean little. Grouped, they describe a direction.",
      "We translate those fragments into palettes, material stories and print directions that a design team can act on — specific enough to sample from, open enough to interpret.",
      "The seasons that work best are the ones where the story is legible at a glance on the board and still holds together on the shop floor eighteen months later.",
    ],
  },
  {
    slug: "the-quiet-power-of-uniform-design",
    title: "The quiet power of uniform design",
    excerpt:
      "A uniform is the most worn piece of brand identity a company owns. It deserves the same rigour as a logo.",
    date: "03 April 2026",
    category: "Uniform Design",
    image: "/assets/Picture15.jpg",
    body: [
      "Uniforms are worn for eight hours a day, photographed constantly and remembered longer than any campaign. Yet they are often the last item on the identity brief.",
      "Good uniform design starts with the body and the shift: movement, temperature, laundering, longevity. Only then does it turn to colour story, motif and finish.",
      "When it is done properly, the wearer stands slightly taller — and that posture is the part guests actually remember.",
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
