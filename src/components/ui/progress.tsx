import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  className?: string;
  indicatorClassName?: string;
};

export function Progress({
  value,
  className,
  indicatorClassName,
}: ProgressProps) {
  return (
    <div className={cn("h-2.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full bg-primary transition-all", indicatorClassName)}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}
