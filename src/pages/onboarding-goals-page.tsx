import { useState } from "react";
import { ArrowLeft, ArrowRight, Brain, Dumbbell, Flame, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/logo";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { goalCards } from "@/data/mock-data";
import { useSession } from "@/context/session-context";
import { OnboardingGoal } from "@/types/models";

const icons = {
  "lose-weight": Flame,
  "gain-muscle": Dumbbell,
  "improve-habits": Brain,
  "train-smarter": Sparkles,
};

export function OnboardingGoalsPage() {
  const navigate = useNavigate();
  const { completeOnboarding, session } = useSession();
  const [selected, setSelected] = useState<OnboardingGoal>(
    session.goal ?? "gain-muscle",
  );

  return (
    <PageShell>
      <div className="container flex min-h-screen max-w-3xl flex-col py-8">
        <div data-reveal className="flex items-center justify-between">
          <Logo />
          <Button variant="ghost" onClick={() => navigate("/auth")}>
            Skip
          </Button>
        </div>

        <Card data-reveal className="mt-8 rounded-[38px] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Step 2 of 5
            </p>
            <p className="text-sm font-medium text-muted-foreground">40% complete</p>
          </div>
          <Progress value={40} className="mt-4 h-2" />

          <div className="mt-8">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              What&apos;s your primary focus?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;ll tailor your workouts and nutrition plans based on your choice.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            {goalCards.map((goal) => {
              const Icon = icons[goal.value];
              const active = selected === goal.value;

              return (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => setSelected(goal.value)}
                  className={`rounded-[30px] border p-6 text-left transition ${
                    active
                      ? "border-primary bg-gradient-to-r from-secondary to-lime/10 shadow-glow"
                      : "border-white/60 bg-white hover:border-primary/25"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-2xl font-bold">{goal.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {goal.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              size="lg"
              onClick={() => {
                completeOnboarding(selected);
                navigate("/app");
              }}
            >
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
