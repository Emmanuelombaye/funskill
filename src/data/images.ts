/** Local FunSkill media — served from /images (public). Prefer these over remote Unsplash. */
const base = "/images";

export const chess = {
  1: `${base}/chess1.jpeg`,
  2: `${base}/chess2.jpeg`,
  3: `${base}/chess3.jpeg`,
  4: `${base}/chess4.jpeg`,
  5: `${base}/chess5.jpeg`,
  video: `${base}/chessvideo.mp4`,
} as const;

export const skating = {
  1: `${base}/skating1.jpeg`,
  2: `${base}/skating2.jpeg`,
  3: `${base}/skating3.jpeg`,
  4: `${base}/skating4.jpeg`,
  5: `${base}/skating5.jpeg`,
  6: `${base}/skating6.jpeg`,
  7: `${base}/skating7.jpeg`,
} as const;

export const yoga = {
  1: `${base}/yoga1.jpeg`,
} as const;

/** Shared img props for fast paint */
export const imgFast = {
  decoding: "async" as const,
  loading: "lazy" as const,
};

export const imgHero = {
  decoding: "async" as const,
  loading: "eager" as const,
  fetchPriority: "high" as const,
};
