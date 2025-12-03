import React from "react";
import { Link, Type, User, Wifi, Mail, MessageSquare } from "lucide-react";
import type { QRContentType } from "./utils";

interface ContentTypeSelectorProps {
  contentType: QRContentType;
  onContentTypeChange: (type: QRContentType) => void;
}

const contentTypeIcons: Record<
  QRContentType,
  React.ComponentType<{ className?: string }>
> = {
  url: Link,
  text: Type,
  vcard: User,
  wifi: Wifi,
  email: Mail,
  sms: MessageSquare,
};

export function ContentTypeSelector({
  contentType,
  onContentTypeChange,
}: ContentTypeSelectorProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
        QR Code Type
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {(
          ["url", "text", "vcard", "wifi", "email", "sms"] as QRContentType[]
        ).map((type) => {
          const Icon = contentTypeIcons[type];
          const isSelected = contentType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onContentTypeChange(type)}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-all ${
                isSelected
                  ? "border-purple-500 bg-purple-50 text-purple-700 dark:border-purple-500 dark:bg-purple-950/30 dark:text-purple-300"
                  : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-purple-700"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="capitalize">{type}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
