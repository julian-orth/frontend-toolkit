"use client";

import { useState, useRef, useEffect } from "react";
import SidebarNav from "@/components/SidebarNav";
import { Menu, X } from "lucide-react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap focus when open
  useEffect(() => {
    if (!open) return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <button
        className="rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none md:hidden dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      {open && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/40 transition-opacity dark:bg-black/60"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <aside className="animate-slide-in-left relative h-full w-72 max-w-full border-r border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
            <button
              className="absolute top-4 right-4 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              autoFocus
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <SidebarNav />
          </aside>
        </div>
      )}
      <style jsx global>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}
