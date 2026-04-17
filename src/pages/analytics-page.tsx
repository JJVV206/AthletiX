import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { RingMetric } from "@/components/app/ring-metric";
import { useAppState } from "@/context/app-state-context";

export function AnalyticsPage() {
  const { analytics } = useAppState();

  return (
    <PageShell className="space-y-6">
      <Card data-reveal className="rounded-[34px] bg-aurora p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Analytics hub
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">
          Your transformation in high definition.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Weight trend, nutrition adherence, and strength progression are all moving in
          the right direction.
        </p>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card data-reveal className="rounded-[32px] p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Weight history
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Down 2.8% this month</p>
            </div>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-8 grid grid-cols-7 items-end gap-3">
            {analytics.weightHistory.map((value, index) => (
              <div key={`${value}-${index}`} className="space-y-3 text-center">
                <div
                  className={`rounded-t-2xl ${
                    index === analytics.weightHistory.length - 2
                      ? "bg-lime"
                      : "bg-primary/18"
                  }`}
                  style={{ height: `${value * 2.2}px` }}
                />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card data-reveal className="rounded-[32px] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Nutrition goal
          </p>
          <RingMetric
            value={analytics.nutritionGoalPercent}
            max={100}
            label="goal completion"
            subLabel="Month to date"
            tone="lime"
            className="h-72"
          />
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card data-reveal className="rounded-[32px] p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Strength progression
              </p>
              <h2 className="mt-2 text-2xl font-bold">Recent PRs</h2>
            </div>
            <Button variant="secondary">Log New PR</Button>
          </div>
          <div className="mt-6 space-y-4">
            {analytics.prs.map((pr) => (
              <div
                key={pr.id}
                className="rounded-[24px] border border-border/60 bg-white/85 px-5 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{pr.lift}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{pr.deltaLabel}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-extrabold">
                      {pr.value}
                      <span className="ml-1 text-base font-medium text-muted-foreground">
                        {pr.unit}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card data-reveal className="rounded-[32px] bg-primary p-8 text-primary-foreground">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
            Optimize your recovery
          </p>
          <p className="mt-6 text-lg leading-8 text-primary-foreground/90">
            {analytics.recoveryInsight}
          </p>
          <div className="mt-10 rounded-[24px] bg-white/10 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-primary-foreground/70">
              Next milestone
            </p>
            <p className="mt-3 text-4xl font-bold">{analytics.milestoneDate}</p>
            <p className="mt-2 text-primary-foreground/80">
              Projected date to hit the next composition checkpoint.
            </p>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
