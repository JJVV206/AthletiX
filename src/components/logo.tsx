import { Orbit } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 font-display font-bold", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-secondary text-primary shadow-soft">
        <Orbit className="h-4 w-4" />
      </span>
      {!compact && (
        <div className="leading-none">
          <span className="text-2xl tracking-tight text-foreground">AthletiX</span>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Sports performance system
          </p>
        </div>
      )}
    </div>
  );
}
