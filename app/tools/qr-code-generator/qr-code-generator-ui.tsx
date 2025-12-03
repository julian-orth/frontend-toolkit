"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  generateQRCode,
  type QRCodeOptions,
  type QRContentType,
  type ErrorCorrectionLevel,
} from "./utils";
import { ContentTypeSelector } from "./content-type-selector";
import { ContentForms } from "./content-forms";
import { CustomizationOptions } from "./customization-options";
import { QRPreview } from "./qr-preview";

type ExportFormat = "png" | "svg";

export function QRCodeGeneratorUI() {
  const [contentType, setContentType] = useState<QRContentType>("url");
  const [content, setContent] = useState("");
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>("medium");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState(300);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // WiFi specific fields
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState<
    "WPA" | "WEP" | "nopass"
  >("WPA");

  // vCard specific fields
  const [vcardName, setVcardName] = useState("");
  const [vcardPhone, setVcardPhone] = useState("");
  const [vcardEmail, setVcardEmail] = useState("");
  const [vcardOrg, setVcardOrg] = useState("");
  const [vcardUrl, setVcardUrl] = useState("");

  // Email specific fields
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // SMS specific fields
  const [smsPhone, setSmsPhone] = useState("");
  const [smsMessage, setSmsMessage] = useState("");

  // Generate QR code content based on type
  const getQRContent = useCallback(() => {
    switch (contentType) {
      case "url":
        return content;
      case "text":
        return content;
      case "wifi":
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
      case "vcard":
        return `BEGIN:VCARD
VERSION:3.0
FN:${vcardName}
TEL:${vcardPhone}
EMAIL:${vcardEmail}
ORG:${vcardOrg}
URL:${vcardUrl}
END:VCARD`;
      case "email":
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case "sms":
        return `sms:${smsPhone}?body=${encodeURIComponent(smsMessage)}`;
      default:
        return content;
    }
  }, [
    contentType,
    content,
    wifiSsid,
    wifiPassword,
    wifiEncryption,
    vcardName,
    vcardPhone,
    vcardEmail,
    vcardOrg,
    vcardUrl,
    emailTo,
    emailSubject,
    emailBody,
    smsPhone,
    smsMessage,
  ]);

  // Generate QR code manually
  const handleGenerate = useCallback(() => {
    const qrContent = getQRContent();

    if (!qrContent || qrContent.trim() === "") {
      setQrDataUrl(null);
      return;
    }

    if (!canvasRef.current) {
      console.error("Canvas ref not available");
      return;
    }

    const options: QRCodeOptions = {
      errorCorrectionLevel: errorLevel,
      width: size,
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
    };

    try {
      const dataUrl = generateQRCode(qrContent, canvasRef.current, options);
      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
      setQrDataUrl(null);
    }
  }, [getQRContent, errorLevel, size, foregroundColor, backgroundColor]);

  // Auto-generate on content change
  useEffect(() => {
    const timer = setTimeout(() => {
      const qrContent = getQRContent();
      if (qrContent && qrContent.trim() !== "" && canvasRef.current) {
        handleGenerate();
      } else {
        setQrDataUrl(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [getQRContent, handleGenerate]);

  // Copy QR code as image
  const handleCopy = useCallback(async () => {
    if (!canvasRef.current) return;

    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      });
    } catch (error) {
      console.error("Failed to copy QR code:", error);
    }
  }, []);

  // Download QR code
  const handleDownload = useCallback(
    (format: ExportFormat) => {
      if (!canvasRef.current || !qrDataUrl) return;

      const link = document.createElement("a");
      link.download = `qrcode.${format}`;

      if (format === "png") {
        link.href = qrDataUrl;
      } else if (format === "svg") {
        const svgData = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${backgroundColor}"/>
  <image href="${qrDataUrl}" x="0" y="0" width="${size}" height="${size}"/>
</svg>`;
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        link.href = URL.createObjectURL(blob);
      }

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (format === "svg") {
        URL.revokeObjectURL(link.href);
      }
    },
    [qrDataUrl, size, backgroundColor]
  );

  // Reset to defaults
  const handleReset = useCallback(() => {
    setContent("");
    setErrorLevel("medium");
    setForegroundColor("#000000");
    setBackgroundColor("#ffffff");
    setSize(300);
    setWifiSsid("");
    setWifiPassword("");
    setWifiEncryption("WPA");
    setVcardName("");
    setVcardPhone("");
    setVcardEmail("");
    setVcardOrg("");
    setVcardUrl("");
    setEmailTo("");
    setEmailSubject("");
    setEmailBody("");
    setSmsPhone("");
    setSmsMessage("");
  }, []);

  return (
    <div className="space-y-8">
      <ContentTypeSelector
        contentType={contentType}
        onContentTypeChange={setContentType}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-6">
          <ContentForms
            contentType={contentType}
            content={content}
            onContentChange={setContent}
            wifiSsid={wifiSsid}
            wifiPassword={wifiPassword}
            wifiEncryption={wifiEncryption}
            onWifiSsidChange={setWifiSsid}
            onWifiPasswordChange={setWifiPassword}
            onWifiEncryptionChange={setWifiEncryption}
            vcardName={vcardName}
            vcardPhone={vcardPhone}
            vcardEmail={vcardEmail}
            vcardOrg={vcardOrg}
            vcardUrl={vcardUrl}
            onVcardNameChange={setVcardName}
            onVcardPhoneChange={setVcardPhone}
            onVcardEmailChange={setVcardEmail}
            onVcardOrgChange={setVcardOrg}
            onVcardUrlChange={setVcardUrl}
            emailTo={emailTo}
            emailSubject={emailSubject}
            emailBody={emailBody}
            onEmailToChange={setEmailTo}
            onEmailSubjectChange={setEmailSubject}
            onEmailBodyChange={setEmailBody}
            smsPhone={smsPhone}
            smsMessage={smsMessage}
            onSmsPhoneChange={setSmsPhone}
            onSmsMessageChange={setSmsMessage}
          />

          <CustomizationOptions
            errorLevel={errorLevel}
            onErrorLevelChange={setErrorLevel}
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
            onForegroundColorChange={setForegroundColor}
            onBackgroundColorChange={setBackgroundColor}
            size={size}
            onSizeChange={setSize}
            onGenerate={handleGenerate}
            onReset={handleReset}
          />
        </div>

        {/* Preview Section */}
        <QRPreview
          qrDataUrl={qrDataUrl}
          size={size}
          canvasRef={canvasRef}
          copied={copied}
          onCopy={handleCopy}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
