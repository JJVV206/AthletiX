import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  className?: string;
};

export function Avatar({ name, className }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-primary/20 via-slate-900 to-sky/15 text-sm font-bold text-primary shadow-soft",
        className,
      )}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
