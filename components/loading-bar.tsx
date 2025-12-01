"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useNavigation } from "next/navigation";

export function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // `useNavigation` is only available in certain Next versions/runtime setups.
  // Guard the call so the app doesn't crash if the named export is missing.
  // The `typeof` check is stable across renders, so it's safe to conditionally
  // invoke the hook based on that check.
  let navigation: any = null;
  let navState: any = undefined;
  try {
    if (typeof useNavigation === "function") {
      navigation = (useNavigation as any)();
      navState = navigation?.state;
    }
  } catch (e) {
    // If calling the hook throws for any reason, fall back to undefined state.
    navigation = null;
    navState = undefined;
  }
  const [isLoading, setIsLoading] = useState(false);

  // Start loading immediately when navigation starts
  useEffect(() => {
    if (navState === "loading") {
      setIsLoading(true);
    }
    if (navState === "idle") {
      // Give a short delay so the user sees the completion animation
      const t = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(t);
    }
    // no cleanup here for 'loading' case
  }, [navState]);

  // Fallback for environments where `useNavigation` is not available
  // (or during certain transitions). When pathname/search params change,
  // show the bar for at least one animation cycle.
  useEffect(() => {
    if (navState === "loading") return; // handled above
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
    // We intentionally include navState to avoid clobbering a real navigation.
  }, [pathname, searchParams, navState]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed top-[73px] right-0 left-0 z-50 h-1 overflow-hidden bg-transparent md:left-72">
      <div className="animate-loading-bar h-full w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 shadow-lg shadow-blue-500/50" />
    </div>
  );
}
