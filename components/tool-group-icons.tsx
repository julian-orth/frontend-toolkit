import {
  Braces,
  Fingerprint,
  Binary,
  Regex,
  Palette,
  Text,
  Clock,
  ShieldCheck,
  Shield,
  FileText,
  FileCode,
} from "lucide-react";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  braces: Braces,
  fingerprint: Fingerprint,
  binary: Binary,
  regex: Regex,
  palette: Palette,
  text: Text,
  clock: Clock,
  "shield-check": ShieldCheck,
  shield: Shield,
  "file-text": FileText,
  "file-code": FileCode,
};

export function ToolGroupIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const LucideIcon = icons[icon] || Braces;
  return <LucideIcon className={className} />;
}
