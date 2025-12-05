"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToGroup component
 * Handles smooth scrolling to group sections when navigating with hash anchors
 */
export function ScrollToGroup() {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on /tools page
    if (pathname !== "/tools") return;

    const hash = window.location.hash;
    if (!hash) return;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        const headerOffset = 80; // Account for fixed header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
