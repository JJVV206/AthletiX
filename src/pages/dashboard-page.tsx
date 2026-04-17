import {
  Activity,
  ArrowUpRight,
  Droplets,
  Flame,
  Plus,
  Scale,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageShell } from "@/components/page-shell";
import { RingMetric } from "@/components/app/ring-metric";
import { buildDashboardSnapshot } from "@/data/mock-data";
import { useAppState } from "@/context/app-state-context";
import { useSession } from "@/context/session-context";
import { formatNumber } from "@/lib/utils";

const actionCards = [
  { label: "Log Meal", icon: Plus, tone: "bg-secondary text-primary" },
  { label: "Log Water", icon: Droplets, tone: "bg-lime/20 text-primary" },
  { label: "Log Weight", icon: Scale, tone: "bg-sky/50 text-primary" },
  { label: "More", icon: Activity, tone: "bg-muted text-muted-foreground" },
];

export function DashboardPage() {
  const { nutrition, activities } = useAppState();
  const {
    session: { user },
  } = useSession();
  const snapshot = buildDashboardSnapshot(nutrition, activities);

  return (
    <PageShell className="space-y-6">
      <section data-reveal className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[34px] bg-aurora p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Good morning, {user.name.split(" ")[0]}
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">
            Your vitality score is {user.vitalityScore}.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Nutrition consistency is trending upward. Keep protein slightly higher at
            lunch to preserve the momentum.
          </p>
        </Card>
        <Card className="overflow-hidden rounded-[34px] bg-primary p-8 text-primary-foreground">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
            Recommended for you
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            {snapshot.recommendedWorkout.title}
          </h2>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-primary-foreground/80">
            <span>{snapshot.recommendedWorkout.durationMin} min</span>
            <span>{snapshot.recommendedWorkout.calories} kcal</span>
            <span>{snapshot.recommendedWorkout.difficulty}</span>
          </div>
          <Button variant="secondary" className="mt-8 w-full sm:w-auto">
            Start Workout
          </Button>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card data-reveal className="rounded-[34px] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Daily calories
          </p>
          <RingMetric
            value={snapshot.caloriesLeft}
            max={nutrition.budgetCalories}
            label="kcal left"
            subLabel={`${formatNumber(snapshot.eatenCalories)} eaten`}
          />
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Eaten</p>
              <p className="text-3xl font-bold">{snapshot.eatenCalories}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Burned</p>
              <p className="text-3xl font-bold">{snapshot.burnedCalories}</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card data-reveal className="rounded-[34px] p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Nutrition macros
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your protein intake is slightly behind target for lunch.
                </p>
              </div>
              <Flame className="h-6 w-6 text-primary" />
            </div>
            <div className="mt-6 space-y-5">
              {snapshot.macros.map((macro) => (
                <div key={macro.key}>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                    <span>{macro.label}</span>
                    <span className="text-muted-foreground">
                      {macro.current}/{macro.target}g
                    </span>
                  </div>
                  <Progress
                    value={(macro.current / macro.target) * 100}
                    indicatorClassName={
                      macro.tone === "lime"
                        ? "bg-lime"
                        : macro.tone === "sky"
                          ? "bg-sky"
                          : "bg-primary"
                    }
                  />
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {actionCards.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.label}
                  data-reveal
                  className="rounded-[30px] p-6 text-center"
                >
                  <div
                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${action.tone}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 font-semibold">{action.label}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Card data-reveal className="rounded-[34px] p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Recent activity
            </p>
            <h2 className="mt-2 text-2xl font-bold">Your live daily feed</h2>
          </div>
          <Button variant="ghost" className="text-primary">
            View All
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {snapshot.activities.map((item) => (
            <div
              key={item.id}
              className="rounded-[28px] border border-border/60 bg-white/80 p-5"
            >
              <p className="text-sm text-muted-foreground">
                {item.subtitle} • {item.time}
              </p>
              <p className="mt-3 text-xl font-bold">{item.title}</p>
              <p
                className={`mt-4 text-2xl font-extrabold ${
                  item.tone === "negative"
                    ? "text-rose-500"
                    : item.tone === "neutral"
                      ? "text-primary"
                      : "text-primary"
                }`}
              >
                {item.caloriesDelta > 0 ? "+" : item.caloriesDelta < 0 ? "-" : ""}
                {Math.abs(item.caloriesDelta)}
                {item.caloriesDelta !== 0 ? " kcal" : ""}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
