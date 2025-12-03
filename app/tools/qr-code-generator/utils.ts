/**
 * QR Code Generator Utilities
 *
 * Utilities for generating QR codes with various content types and customization options.
 * Uses the qrcode library for browser-based QR code generation.
 */

import QRCode from "qrcode";

export type QRContentType = "url" | "text" | "wifi" | "vcard" | "email" | "sms";

export type ErrorCorrectionLevel = "low" | "medium" | "quartile" | "high";

export interface QRCodeOptions {
  errorCorrectionLevel: ErrorCorrectionLevel;
  width: number;
  color?: {
    dark: string;
    light: string;
  };
  margin?: number;
}

/**
 * Map our error correction levels to QRCode library levels
 */
const errorCorrectionLevelMap: Record<
  ErrorCorrectionLevel,
  "L" | "M" | "Q" | "H"
> = {
  low: "L",
  medium: "M",
  quartile: "Q",
  high: "H",
};

/**
 * Generate QR code and render to canvas
 * Returns the data URL of the generated QR code
 */
export function generateQRCode(
  content: string,
  canvas: HTMLCanvasElement,
  options: QRCodeOptions
): string {
  if (!content) {
    throw new Error("Content is required to generate QR code");
  }

  const errorLevel = errorCorrectionLevelMap[options.errorCorrectionLevel];

  try {
    QRCode.toCanvas(canvas, content, {
      errorCorrectionLevel: errorLevel,
      width: options.width,
      margin: options.margin || 4,
      color: {
        dark: options.color?.dark || "#000000",
        light: options.color?.light || "#ffffff",
      },
    });

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("QR code generation failed:", error);
    throw new Error("Failed to generate QR code");
  }
}

/**
 * Validate QR code content
 */
export function validateQRContent(
  content: string,
  type: QRContentType
): { valid: boolean; error?: string } {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: "Content cannot be empty" };
  }

  switch (type) {
    case "url":
      try {
        new URL(content);
        return { valid: true };
      } catch {
        return { valid: false, error: "Invalid URL format" };
      }
    case "email":
      if (!content.includes("mailto:")) {
        return { valid: false, error: "Invalid email format" };
      }
      return { valid: true };
    default:
      return { valid: true };
  }
}

/**
 * Calculate optimal QR code size based on content length
 */
export function calculateOptimalSize(contentLength: number): number {
  if (contentLength < 50) return 300;
  if (contentLength < 100) return 400;
  if (contentLength < 200) return 500;
  return 600;
}

/**
 * Get recommended error correction level based on use case
 */
export function getRecommendedErrorLevel(
  hasLogo: boolean,
  isOutdoor: boolean
): ErrorCorrectionLevel {
  if (hasLogo) return "high";
  if (isOutdoor) return "quartile";
  return "medium";
}
