"use client";

import { useEffect, useState } from "react";
import "@/app/blog/blog-content.css";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Add copy buttons to all code blocks
    const codeBlocks = document.querySelectorAll(".blog-content pre");

    codeBlocks.forEach((block, index) => {
      const pre = block as HTMLPreElement;

      // Skip if button already exists
      if (pre.parentElement?.classList.contains("code-block-wrapper")) return;

      // Create wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Add unique ID
      pre.setAttribute("data-code-id", `code-${index}`);

      // Create copy button
      const button = document.createElement("button");
      button.className = "copy-button";
      button.setAttribute("data-code-id", `code-${index}`);
      button.setAttribute("aria-label", "Copy code to clipboard");
      button.setAttribute("title", "Copy code");
      button.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg class="check-icon hidden" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;

      wrapper.appendChild(button);
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest(".copy-button") as HTMLButtonElement;
      if (button) {
        const codeId = button.getAttribute("data-code-id");
        if (codeId) {
          const pre = document.querySelector(`pre[data-code-id="${codeId}"]`);
          if (!pre) return;

          const code = pre.querySelector("code");
          const text = code?.textContent || pre.textContent || "";

          navigator.clipboard.writeText(text).then(() => {
            const copyIcon = button.querySelector(".copy-icon");
            const checkIcon = button.querySelector(".check-icon");

            copyIcon?.classList.add("hidden");
            checkIcon?.classList.remove("hidden");

            setTimeout(() => {
              copyIcon?.classList.remove("hidden");
              checkIcon?.classList.add("hidden");
            }, 2000);
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [content]);

  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
