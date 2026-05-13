import { ArrowUpRight, LineChart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { useAppState } from "@/context/app-state-context";
import { buildWeeklyNutritionSummary } from "@/lib/nutrition";

export function ProgressPage() {
  const { analytics, nutrition } = useAppState();
  const weeklySummary = buildWeeklyNutritionSummary(nutrition);

  return (
    <PageShell className="space-y-6">
      <Card data-reveal className="rounded-[34px] bg-gradient-to-r from-slate-950 to-primary/10 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Progress
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">
          Performance trends, not vanity charts.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          Start with the few indicators that actually matter. Open deeper analysis only
          when you are ready to review what is moving performance forward.
        </p>
      </Card>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          ["Weekly adherence", `${weeklySummary.adherenceRate}%`],
          ["Average protein", `${weeklySummary.averageProtein} g`],
          ["Best streak", `${weeklySummary.bestStreak} days`],
        ].map(([label, value]) => (
          <Card key={label} data-reveal className="rounded-[28px] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-4 text-4xl font-bold tracking-tight">{value}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card data-reveal className="rounded-[32px] p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Body trend
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Latest 7 data points</p>
            </div>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-8 grid grid-cols-7 items-end gap-3">
            {analytics.weightHistory.map((value, index) => (
              <div key={`${value}-${index}`} className="space-y-3 text-center">
                <div
                  className={`rounded-t-2xl ${
                    index === analytics.weightHistory.length - 2 ? "bg-lime" : "bg-primary/18"
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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                What stands out
              </p>
              <h2 className="mt-2 text-2xl font-bold">A few useful signals</h2>
            </div>
            <LineChart className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-6 space-y-4">
            {[
              "Protein consistency is strongest on your best training days.",
              "Hydration is steadier in weeks where readiness also feels higher.",
              "Most extra calories are coming from late-day drift, not planned meals.",
            ].map((insight) => (
              <div
                key={insight}
                className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-muted-foreground"
              >
                {insight}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card data-reveal className="rounded-[32px] p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Performance markers
              </p>
              <h2 className="mt-2 text-2xl font-bold">Recent bests and movement</h2>
            </div>
            <Button variant="outline">Export review</Button>
          </div>
          <div className="mt-6 space-y-4">
            {analytics.prs.map((pr) => (
              <div
                key={pr.id}
                className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4"
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

        <Card data-reveal className="rounded-[32px] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Deeper layer
          </p>
          <h2 className="mt-3 text-2xl font-bold">Review more when needed</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            This screen stays focused on the most useful progress markers. When you want
            coaching-style interpretation, open the insights layer for richer context.
          </p>
          <div className="mt-6 rounded-[24px] bg-primary/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Next milestone
            </p>
            <p className="mt-3 text-4xl font-bold">{analytics.milestoneDate}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Projected performance checkpoint based on current consistency.
            </p>
          </div>
          <Button asChild className="mt-6">
            <Link to="/app/insights">
              Open Insights
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </section>
    </PageShell>
  );
}
