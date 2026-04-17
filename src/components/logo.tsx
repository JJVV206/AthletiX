import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 font-display font-bold", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-secondary text-primary">
        <Leaf className="h-4 w-4" />
      </span>
      {!compact && <span className="text-2xl tracking-tight text-primary">Vitalia</span>}
    </div>
  );
}
