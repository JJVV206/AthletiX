import { PropsWithChildren, useRef } from "react";
import { cn } from "@/lib/utils";
import { useRevealAnimation } from "@/lib/motion";

type PageShellProps = PropsWithChildren<{
  className?: string;
}>;

export function PageShell({ className, children }: PageShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealAnimation(ref);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}
    </div>
  );
}
