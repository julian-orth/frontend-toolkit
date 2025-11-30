"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // Show loading bar for minimum of one animation cycle (1s)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed left-0 right-0 top-[73px] z-50 h-1 overflow-hidden bg-transparent">
      <div className="h-full w-full animate-loading-bar bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 shadow-lg shadow-blue-500/50" />
    </div>
  );
}
