import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Dumbbell,
  Gauge,
  ShieldCheck,
  Target,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/logo";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  goalCards,
  onboardingDefaults,
  performanceFocusCards,
  sportCards,
  supportModeCards,
  trainingLevelCards,
} from "@/data/mock-data";
import { useSession } from "@/context/session-context";
import { OnboardingSelection, OnboardingGoal, PerformanceFocus, SportDiscipline, SupportMode, TrainingLevel } from "@/types/models";

const goalIcons: Record<OnboardingGoal, typeof Target> = {
  "body-composition": Target,
  "build-strength": Dumbbell,
  "game-performance": Trophy,
  consistency: Gauge,
};

const performanceFocusIcons: Record<PerformanceFocus, typeof Dumbbell> = {
  strength: Dumbbell,
  conditioning: Gauge,
  skill: Trophy,
  recovery: Brain,
};

const supportIcons: Record<SupportMode, typeof ShieldCheck> = {
  "self-manage": Target,
  "ai-plus": Brain,
  "pro-coaching": ShieldCheck,
};

const levelIcons: Record<TrainingLevel, typeof Gauge> = {
  foundation: Target,
  intermediate: Gauge,
  competitive: Trophy,
};

const totalSteps = 4;

function StepCard({
  active,
  onClick,
  title,
  description,
  icon: Icon,
  badge,
  multiSelect = false,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
  icon: typeof Target;
  badge?: string;
  multiSelect?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-[30px] border p-6 text-left transition ${
        active
          ? "border-primary bg-gradient-to-r from-primary/12 to-sky/10 shadow-glow"
          : "border-white/10 bg-white/5 hover:border-primary/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        {badge ? (
          <div className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {badge}
          </div>
        ) : null}
      </div>
      <h2 className="mt-5 text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
      {multiSelect ? (
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
          {active ? "Selected" : "Tap to add"}
        </p>
      ) : null}
    </button>
  );
}

export function OnboardingGoalsPage() {
  const navigate = useNavigate();
  const { completeOnboarding, session } = useSession();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [selection, setSelection] = useState<OnboardingSelection>({
    goal: session.goal ?? session.user.focus ?? onboardingDefaults.goal,
    sports: session.user.sports.length ? session.user.sports : onboardingDefaults.sports,
    trainingLevel: session.user.trainingLevel ?? onboardingDefaults.trainingLevel,
    performanceFocus:
      session.user.performanceFocus ?? onboardingDefaults.performanceFocus,
    supportMode: session.user.supportMode ?? onboardingDefaults.supportMode,
    targetWeightKg: session.user.targetWeightKg ?? onboardingDefaults.targetWeightKg,
    weeklyTrainingDays:
      session.user.weeklyTrainingDays ?? onboardingDefaults.weeklyTrainingDays,
  });

  const progressValue = useMemo(
    () => ((step + 1) / totalSteps) * 100,
    [step],
  );

  function toggleSport(sport: SportDiscipline) {
    setSelection((previous) => ({
      ...previous,
      sports: previous.sports.includes(sport)
        ? previous.sports.filter((item) => item !== sport)
        : [...previous.sports, sport],
    }));
  }

  function validateCurrentStep() {
    if (step === 1 && selection.sports.length === 0) {
      setError("Select at least one sport to personalize the platform.");
      return false;
    }

    if (step === 3 && selection.weeklyTrainingDays < 1) {
      setError("Please set how many training days you plan each week.");
      return false;
    }

    setError("");
    return true;
  }

  function handleContinue() {
    if (!validateCurrentStep()) return;

    if (step === totalSteps - 1) {
      completeOnboarding(selection);
      navigate("/app");
      return;
    }

    setStep((previous) => previous + 1);
  }

  return (
    <PageShell>
      <div className="container flex min-h-screen max-w-4xl flex-col py-8">
        <div data-reveal className="flex items-center justify-between">
          <Logo />
          <Button
            variant="ghost"
            onClick={() => {
              completeOnboarding(selection);
              navigate("/app");
            }}
          >
            Skip for now
          </Button>
        </div>

        <Card data-reveal className="mt-8 rounded-[38px] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Step {step + 1} of {totalSteps}
            </p>
            <p className="text-sm font-medium text-muted-foreground">
              {Math.round(progressValue)}% complete
            </p>
          </div>
          <Progress value={progressValue} className="mt-4 h-2" />

          {step === 0 ? (
            <div className="mt-8">
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Choose your primary performance objective
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                This sets the tone for how AthletiX prioritizes fueling, training, and
                review surfaces.
              </p>
              <div className="mt-8 grid gap-4">
                {goalCards.map((goal) => {
                  const Icon = goalIcons[goal.value];
                  return (
                    <StepCard
                      key={goal.value}
                      active={selection.goal === goal.value}
                      onClick={() =>
                        setSelection((previous) => ({ ...previous, goal: goal.value }))
                      }
                      title={goal.title}
                      description={goal.description}
                      icon={Icon}
                    />
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="mt-8">
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Which sports should the platform optimize for?
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Select one or more disciplines. The platform will surface relevant
                dashboards, modules, and guidance based on these choices.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {sportCards.map((sport) => (
                  <StepCard
                    key={sport.value}
                    active={selection.sports.includes(sport.value)}
                    onClick={() => toggleSport(sport.value)}
                    title={sport.title}
                    description={sport.description}
                    icon={Trophy}
                    multiSelect
                  />
                ))}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="mt-8 space-y-10">
              <div>
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  Define your current training profile
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  We use this to keep the product ambitious without overwhelming the
                  user.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Training level
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {trainingLevelCards.map((level) => (
                    <StepCard
                      key={level.value}
                      active={selection.trainingLevel === level.value}
                      onClick={() =>
                        setSelection((previous) => ({
                          ...previous,
                          trainingLevel: level.value,
                        }))
                      }
                      title={level.title}
                      description={level.description}
                      icon={levelIcons[level.value]}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Performance focus
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {performanceFocusCards.map((focus) => (
                    <StepCard
                      key={focus.value}
                      active={selection.performanceFocus === focus.value}
                      onClick={() =>
                        setSelection((previous) => ({
                          ...previous,
                          performanceFocus: focus.value,
                        }))
                      }
                      title={focus.title}
                      description={focus.description}
                      icon={performanceFocusIcons[focus.value]}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="mt-8 space-y-10">
              <div>
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  Set your support layer and body goals
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Start self-managed, add AI in Plus, or access professionals in Pro.
                </p>
              </div>

              <div className="grid gap-4">
                {supportModeCards.map((mode) => (
                  <StepCard
                    key={mode.value}
                    active={selection.supportMode === mode.value}
                    onClick={() =>
                      setSelection((previous) => ({
                        ...previous,
                        supportMode: mode.value,
                      }))
                    }
                    title={mode.title}
                    description={mode.description}
                    icon={supportIcons[mode.value]}
                    badge={mode.badge}
                  />
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="target-weight"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Target Body Weight (kg)
                  </label>
                  <Input
                    id="target-weight"
                    type="number"
                    value={selection.targetWeightKg}
                    onChange={(event) =>
                      setSelection((previous) => ({
                        ...previous,
                        targetWeightKg: Number(event.target.value || 0),
                      }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="weekly-training-days"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Training Days Per Week
                  </label>
                  <Input
                    id="weekly-training-days"
                    type="number"
                    value={selection.weeklyTrainingDays}
                    onChange={(event) =>
                      setSelection((previous) => ({
                        ...previous,
                        weeklyTrainingDays: Number(event.target.value || 0),
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="mt-6 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              {error}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                if (step === 0) {
                  navigate("/auth");
                  return;
                }

                setStep((previous) => previous - 1);
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button size="lg" onClick={handleContinue}>
              {step === totalSteps - 1 ? "Enter Platform" : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
