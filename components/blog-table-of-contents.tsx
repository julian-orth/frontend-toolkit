"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function BlogTableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract headings from HTML content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const headingElements = tempDiv.querySelectorAll("h2, h3");

    const extractedHeadings: Heading[] = [];
    headingElements.forEach((heading, index) => {
      const text = heading.textContent || "";
      const id = `heading-${index}`;
      const level = parseInt(heading.tagName.substring(1));

      extractedHeadings.push({ id, text, level });

      // Add id to actual DOM element for scroll targeting
      setTimeout(() => {
        const actualHeading = document.querySelector(
          `.blog-content ${heading.tagName}:nth-of-type(${index + 1})`
        );
        if (actualHeading) {
          actualHeading.id = id;
        }
      }, 100);
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Track scroll position and highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left font-semibold text-gray-900 transition-colors hover:bg-gray-50 lg:hidden dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-800"
        aria-label="Toggle table of contents"
      >
        <span className="flex items-center gap-2">
          <List className="h-5 w-5" aria-hidden="true" />
          Table of Contents
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {isOpen ? "Hide" : "Show"}
        </span>
      </button>

      {/* Mobile Collapsible TOC */}
      {isOpen && (
        <nav
          className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6 lg:hidden dark:border-gray-800 dark:bg-gray-900"
          aria-label="Table of contents"
        >
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
              >
                <button
                  onClick={() => handleClick(heading.id)}
                  className={`cursor-pointer text-left text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    activeId === heading.id
                      ? "font-semibold text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-400"
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Desktop Sticky Sidebar */}
      <nav
        className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 lg:block dark:border-gray-800 dark:bg-gray-900"
        aria-label="Table of contents"
      >
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
          <List className="h-5 w-5" aria-hidden="true" />
          On this page
        </h2>
        <ul className="space-y-2.5">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
            >
              <button
                onClick={() => handleClick(heading.id)}
                className={`cursor-pointer text-left text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  activeId === heading.id
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-400"
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
