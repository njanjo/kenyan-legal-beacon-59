import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top on every route change so each page starts loading
 * from the top. Hash links (e.g. /services#family-law) still smooth-scroll
 * to their anchor after the target route has rendered.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a tick so lazily-loaded route content is in the DOM first.
      const t = window.setTimeout(() => {
        try {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
          }
        } catch {
          // Invalid selector — fall through to top.
        }
        window.scrollTo(0, 0);
      }, 120);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
