import { ArrowUpRight, Brain, Dumbbell, Droplets, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { useAppState } from "@/context/app-state-context";
import {
  performanceFocusLabels,
  sportLabels,
  supportModeLabels,
  trainingLevelLabels,
} from "@/data/mock-data";
import {
  buildWeeklyNutritionSummary,
  getCaloriesRemaining,
  getRemainingMacros,
  getWaterProgress,
} from "@/lib/nutrition";
import { useSession } from "@/context/session-context";
import { formatNumber } from "@/lib/utils";

const quickActions = [
  { label: "Fuel today", href: "/app/nutrition" },
  { label: "Log training", href: "/app/training" },
  { label: "Review progress", href: "/app/progress" },
];

export function DashboardPage() {
  const { nutrition, workout, analytics } = useAppState();
  const {
    session: { user },
  } = useSession();
  const weeklySummary = buildWeeklyNutritionSummary(nutrition);
  const remainingMacros = getRemainingMacros(nutrition);
  const caloriesRemaining = getCaloriesRemaining(nutrition);
  const hydrationProgress = Math.round(getWaterProgress(nutrition));
  const completedSets = workout.exercises.reduce(
    (count, exercise) => count + exercise.sets.filter((set) => set.completed).length,
    0,
  );
  const totalSets = workout.exercises.reduce(
    (count, exercise) => count + exercise.sets.length,
    0,
  );

  return (
    <PageShell className="space-y-6">
      <section data-reveal className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[34px] bg-gradient-to-br from-slate-950 via-slate-900 to-primary/12 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Today
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold tracking-tight">
            Clear priorities, then deeper tools when you need them.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            You are aligned for {sportLabels[user.sports[0]]} with a{" "}
            {performanceFocusLabels[user.performanceFocus].toLowerCase()} emphasis.
            Protein is the main nutrition gap today and your next structured session is{" "}
            {workout.title.toLowerCase()}.
          </p>
        </Card>

        <Card className="rounded-[34px] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Performance score
          </p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <p className="text-6xl font-extrabold tracking-tight text-primary">
              {user.performanceScore}
            </p>
            <div className="rounded-2xl bg-primary/12 p-4 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Training level
              </p>
              <p className="mt-3 text-lg font-semibold">
                {trainingLevelLabels[user.trainingLevel]}
              </p>
            </div>
            <div className="rounded-[24px] bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Support
              </p>
              <p className="mt-3 text-lg font-semibold">
                {supportModeLabels[user.supportMode]}
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card data-reveal className="rounded-[30px] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Fuel
              </p>
              <h2 className="mt-3 text-3xl font-bold">{caloriesRemaining} kcal</h2>
              <p className="mt-2 text-sm text-muted-foreground">Remaining today</p>
            </div>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <Droplets className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Protein", `${remainingMacros.protein}g left`],
              ["Carbs", `${remainingMacros.carbs}g left`],
              ["Hydration", `${hydrationProgress}% goal`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[20px] bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card data-reveal className="rounded-[30px] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Training
              </p>
              <h2 className="mt-3 text-2xl font-bold">{workout.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{workout.startsAt}</p>
            </div>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <Dumbbell className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Set progress", `${completedSets}/${Math.max(totalSets, 1)} done`],
              ["Volume", `${formatNumber(workout.volumeKg)} kg`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[20px] bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card data-reveal className="rounded-[30px] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Progress
              </p>
              <h2 className="mt-3 text-3xl font-bold">{weeklySummary.adherenceRate}%</h2>
              <p className="mt-2 text-sm text-muted-foreground">Weekly adherence</p>
            </div>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <Trophy className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Best streak", `${weeklySummary.bestStreak} days`],
              ["Next milestone", analytics.milestoneDate],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[20px] bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card data-reveal className="rounded-[30px] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Next actions
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {quickActions.map((action) => (
              <Button
                asChild
                key={action.href}
                variant="outline"
                className="h-auto justify-between rounded-[22px] px-5 py-4"
              >
                <Link to={action.href}>
                  <span>{action.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </Card>

        <Card data-reveal className="rounded-[30px] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Deeper insight
              </p>
              <h2 className="mt-3 text-2xl font-bold">What to review next</h2>
            </div>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <Brain className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            {analytics.recoveryInsight}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="ghost" className="px-0 text-primary">
              <Link to="/app/insights">Open insights</Link>
            </Button>
            <Button asChild variant="ghost" className="px-0 text-primary">
              <Link to="/app/sports">Open sports modules</Link>
            </Button>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
