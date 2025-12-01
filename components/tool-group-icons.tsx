import {
  Braces,
  Fingerprint,
  Binary,
  Regex,
  Palette,
  Text,
  Clock,
  ShieldCheck,
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
