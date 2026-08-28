import { useEffect, useRef } from "react";
import { usePortal } from "./store";

export function TrackPage({ page }: { page: "home" | "coaches" | "book" | "programs" }) {
  const { trackPage } = usePortal();
  const once = useRef(false);
  useEffect(() => {
    if (once.current) return;
    once.current = true;
    trackPage(page);
  }, [page, trackPage]);
  return null;
}

export function TrackCoach({ slug }: { slug: string }) {
  const { trackCoachView } = usePortal();
  const seen = useRef("");
  useEffect(() => {
    if (!slug || seen.current === slug) return;
    seen.current = slug;
    trackCoachView(slug);
  }, [slug, trackCoachView]);
  return null;
}
