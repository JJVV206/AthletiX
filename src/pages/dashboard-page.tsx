import { ArrowUpRight, Brain, Dumbbell, Droplets, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { useAppState } from "@/context/app-state-context";
import { supportModeLabels, trainingLevelLabels } from "@/data/mock-data";
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
    <PageShell className="space-y-4 sm:space-y-6">
      <section data-reveal className="mx-auto w-full max-w-[21.5rem] sm:max-w-[24rem] xl:max-w-[26rem]">
        <Card className="rounded-[28px] p-5 sm:rounded-[34px] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Performance score
          </p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <p className="text-[4rem] font-extrabold leading-none tracking-tight text-primary sm:text-6xl">
              {user.performanceScore}
            </p>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary sm:p-4">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] bg-white/5 p-3.5 sm:rounded-[24px] sm:p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Training level
              </p>
              <p className="mt-2.5 text-[15px] font-semibold sm:mt-3 sm:text-lg">
                {trainingLevelLabels[user.trainingLevel]}
              </p>
            </div>
            <div className="rounded-[18px] bg-white/5 p-3.5 sm:rounded-[24px] sm:p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Support
              </p>
              <p className="mt-2.5 text-[15px] font-semibold sm:mt-3 sm:text-lg">
                {supportModeLabels[user.supportMode]}
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto grid w-full max-w-[21.5rem] gap-3 sm:max-w-none sm:gap-4 lg:grid-cols-3">
        <Card data-reveal className="rounded-[26px] p-[1.125rem] sm:rounded-[30px] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Fuel
              </p>
              <h2 className="mt-2.5 text-[1.7rem] font-bold sm:mt-3 sm:text-3xl">{caloriesRemaining} kcal</h2>
              <p className="mt-2 text-sm text-muted-foreground">Remaining today</p>
            </div>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <Droplets className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 grid gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-3">
            {[
              ["Protein", `${remainingMacros.protein}g left`],
              ["Carbs", `${remainingMacros.carbs}g left`],
              ["Hydration", `${hydrationProgress}% goal`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[16px] bg-white/5 p-3 sm:rounded-[20px] sm:p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1.5 text-sm font-semibold sm:mt-2 sm:text-base">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card data-reveal className="rounded-[26px] p-[1.125rem] sm:rounded-[30px] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Training
              </p>
              <h2 className="mt-2.5 text-lg font-bold sm:mt-3 sm:text-2xl">{workout.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{workout.startsAt}</p>
            </div>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <Dumbbell className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 grid gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3">
            {[
              ["Set progress", `${completedSets}/${Math.max(totalSets, 1)} done`],
              ["Volume", `${formatNumber(workout.volumeKg)} kg`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[16px] bg-white/5 p-3 sm:rounded-[20px] sm:p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1.5 text-sm font-semibold sm:mt-2 sm:text-base">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card data-reveal className="rounded-[26px] p-[1.125rem] sm:rounded-[30px] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Progress
              </p>
              <h2 className="mt-2.5 text-[1.7rem] font-bold sm:mt-3 sm:text-3xl">{weeklySummary.adherenceRate}%</h2>
              <p className="mt-2 text-sm text-muted-foreground">Weekly adherence</p>
            </div>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <Trophy className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 grid gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3">
            {[
              ["Best streak", `${weeklySummary.bestStreak} days`],
              ["Next milestone", analytics.milestoneDate],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[16px] bg-white/5 p-3 sm:rounded-[20px] sm:p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1.5 text-sm font-semibold sm:mt-2 sm:text-base">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto grid w-full max-w-[21.5rem] gap-3 sm:max-w-none sm:gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card data-reveal className="rounded-[26px] p-[1.125rem] sm:rounded-[30px] sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Next actions
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {quickActions.map((action) => (
              <Button
                asChild
                key={action.href}
                variant="outline"
                className="h-auto justify-between rounded-[20px] px-4 py-4 sm:rounded-[22px] sm:px-5"
              >
                <Link to={action.href}>
                  <span>{action.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </Card>

        <Card data-reveal className="rounded-[26px] p-[1.125rem] sm:rounded-[30px] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Deeper insight
              </p>
              <h2 className="mt-3 text-xl font-bold sm:text-2xl">What to review next</h2>
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
