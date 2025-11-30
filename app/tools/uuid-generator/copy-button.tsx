"use client";
import React, { useState } from "react";
import PrimaryButton from "@/components/primary-button";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <PrimaryButton
      type="button"
      aria-label="Copy UUID"
      variant={copied ? "solid" : "outline"}
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className={copied ? "ring-2 ring-teal-400" : ""}
    >
      {copied ? "Copied!" : "Copy"}
    </PrimaryButton>
  );
}
