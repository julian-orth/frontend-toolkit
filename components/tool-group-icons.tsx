import {
  CodeSquare,
  Fingerprint,
  RefreshCw,
  Hash,
  SwatchBook,
  FileText,
  Clock,
  Key,
} from "lucide-react";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "code-bracket-square": CodeSquare,
  "finger-print": Fingerprint,
  "arrow-path": RefreshCw,
  hashtag: Hash,
  swatch: SwatchBook,
  "document-text": FileText,
  clock: Clock,
  key: Key,
};

export function ToolGroupIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const LucideIcon = icons[icon] || CodeSquare;
  return <LucideIcon className={className} />;
}
