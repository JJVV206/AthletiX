import { cn, clamp } from "@/lib/utils";
import { useAnimatedNumber } from "@/lib/motion";

type RingMetricProps = {
  value: number;
  max: number;
  label: string;
  subLabel: string;
  className?: string;
  tone?: "primary" | "lime" | "sky";
};

const toneClasses = {
  primary: "stroke-primary",
  lime: "stroke-lime",
  sky: "stroke-sky",
};

export function RingMetric({
  value,
  max,
  label,
  subLabel,
  className,
  tone = "primary",
}: RingMetricProps) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const progress = clamp((value / max) * 100, 0, 100);
  const offset = circumference - (progress / 100) * circumference;
  const animatedValue = useAnimatedNumber(value);

  return (
    <div className={cn("relative flex h-64 items-center justify-center", className)}>
      <svg className="h-56 w-56 -rotate-90" viewBox="0 0 180 180" aria-hidden="true">
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          className="text-muted"
          fill="transparent"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          className={toneClasses[tone]}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-5xl font-extrabold tracking-tight">{animatedValue}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{subLabel}</p>
      </div>
    </div>
  );
}
