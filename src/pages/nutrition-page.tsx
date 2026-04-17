import { Search, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PageShell } from "@/components/page-shell";
import { buildDashboardSnapshot } from "@/data/mock-data";
import { useAppState } from "@/context/app-state-context";

const suggestedMealBySection: Record<string, string> = {
  breakfast: "avocado-toast",
  lunch: "kombucha-salad",
  dinner: "smoothie",
  snacks: "almonds",
};

const toneClasses = {
  mint: "bg-secondary text-primary",
  lime: "bg-lime/20 text-primary",
  sky: "bg-sky/60 text-primary",
  sand: "bg-sand text-primary",
};

export function NutritionPage() {
  const { nutrition, addPresetMeal, removeMealEntry } = useAppState();
  const snapshot = buildDashboardSnapshot(nutrition, []);

  return (
    <PageShell className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card data-reveal className="rounded-[34px] p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Daily budget
              </p>
              <h1 className="mt-3 text-5xl font-bold tracking-tight">
                {snapshot.caloriesLeft}
                <span className="ml-2 text-lg font-medium text-muted-foreground">
                  kcal left
                </span>
              </h1>
            </div>
            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-muted-foreground">Consumed</p>
                <p className="text-2xl font-bold">{snapshot.eatenCalories}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Exercise</p>
                <p className="text-2xl font-bold">{snapshot.burnedCalories}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-[24px] bg-muted px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              aria-label="Add food"
              className="h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0"
              placeholder="Add food"
            />
            <Button size="sm">Log Meal</Button>
          </div>
        </Card>

        <Card data-reveal className="rounded-[34px] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Daily macros
          </p>
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
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {nutrition.meals.map((meal) => (
            <Card key={meal.id} data-reveal className="rounded-[32px] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{meal.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {meal.targetCalories} kcal target
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPresetMeal(meal.id, suggestedMealBySection[meal.id])}
                >
                  + Add to {meal.title}
                </Button>
              </div>
              <div className="mt-5 space-y-3">
                {meal.entries.length > 0 ? (
                  meal.entries.map((entry) => (
                    <div
                      key={entry.entryId}
                      className="flex items-center justify-between rounded-[22px] bg-muted/70 px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold">{entry.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.amount} • {entry.loggedAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{entry.calories} kcal</span>
                        <button
                          type="button"
                          aria-label={`Remove ${entry.name}`}
                          className="rounded-full p-1 text-muted-foreground transition hover:bg-white"
                          onClick={() => removeMealEntry(meal.id, entry.entryId)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[22px] border border-dashed border-border bg-white/50 px-4 py-8 text-center text-sm text-muted-foreground">
                    No food logged for {meal.title.toLowerCase()} yet.
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Card data-reveal className="rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Recently eaten
          </p>
          <div className="mt-5 space-y-4">
            {nutrition.suggestedPresets.map((item) => (
              <div
                key={item.id}
                className="rounded-[24px] border border-border/60 bg-white/85 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`rounded-2xl px-3 py-2 text-xs font-semibold ${toneClasses[item.tone]}`}>
                    {item.calories} kcal
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addPresetMeal("breakfast", item.id)}
                  >
                    Quick log
                  </Button>
                </div>
                <p className="mt-4 font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.amount}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
