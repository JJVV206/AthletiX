import { CheckCircle2, Minus, Plus } from "lucide-react";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageShell } from "@/components/page-shell";
import { useAppState } from "@/context/app-state-context";
import { useLoopPulse } from "@/lib/motion";
import { formatLongDuration, formatDuration, formatNumber } from "@/lib/utils";

export function WorkoutsPage() {
  const {
    workout,
    addWorkoutSet,
    adjustRestTimer,
    setWorkoutNotes,
    toggleRestTimer,
    toggleWorkoutSet,
  } = useAppState();
  const startButtonRef = useRef<HTMLButtonElement>(null);
  useLoopPulse(startButtonRef, workout.restTimerRunning);

  return (
    <PageShell className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card data-reveal className="rounded-[34px] bg-aurora p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Session
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">
            {workout.title}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{workout.startsAt}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Duration
              </p>
              <p className="mt-2 text-4xl font-bold text-primary">
                {formatLongDuration(workout.durationSeconds)}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Volume
              </p>
              <p className="mt-2 text-4xl font-bold text-primary">
                {formatNumber(workout.volumeKg)} kg
              </p>
            </div>
          </div>
        </Card>

        <Card data-reveal className="rounded-[34px] bg-primary p-8 text-center text-primary-foreground">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
            Rest timer
          </p>
          <p className="mt-6 text-7xl font-extrabold tracking-tight">
            {formatDuration(workout.restTimerSeconds)}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={() => adjustRestTimer(workout.restTimerSeconds - 15)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              ref={startButtonRef}
              variant="secondary"
              className="min-w-32 rounded-full"
              onClick={toggleRestTimer}
            >
              {workout.restTimerRunning ? "Pause" : "Start"}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={() => adjustRestTimer(workout.restTimerSeconds + 15)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        {workout.exercises.map((exercise) => (
          <Card key={exercise.id} data-reveal className="rounded-[32px] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold">{exercise.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {exercise.group} • {exercise.focus}
                </p>
              </div>
              <div className="rounded-2xl bg-secondary px-3 py-2 text-sm font-semibold text-primary">
                {exercise.icon}
              </div>
            </div>
            {exercise.locked ? (
              <div className="mt-6 rounded-[24px] bg-muted px-4 py-8 text-center text-sm text-muted-foreground">
                Awaiting previous sets...
              </div>
            ) : (
              <>
                <div className="mt-6 overflow-hidden rounded-[24px] border border-border/60">
                  <div className="grid grid-cols-[72px_1fr_96px_96px_60px] bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Set</span>
                    <span>Previous</span>
                    <span>Kg</span>
                    <span>Reps</span>
                    <span />
                  </div>
                  <div className="divide-y divide-border/60">
                    {exercise.sets.map((set, index) => (
                      <div
                        key={set.id}
                        className="grid grid-cols-[72px_1fr_96px_96px_60px] items-center px-4 py-4"
                      >
                        <span className="text-lg font-bold">{index + 1}</span>
                        <span className="text-muted-foreground">{set.previous}</span>
                        <span className="rounded-2xl bg-muted px-4 py-3 text-center font-semibold">
                          {set.weightKg}
                        </span>
                        <span className="rounded-2xl bg-muted px-4 py-3 text-center font-semibold">
                          {set.reps}
                        </span>
                        <button
                          type="button"
                          aria-label={`Toggle set ${index + 1}`}
                          aria-pressed={set.completed}
                          className="flex justify-center text-primary"
                          onClick={() => toggleWorkoutSet(exercise.id, set.id)}
                        >
                          <CheckCircle2
                            className={`h-6 w-6 ${
                              set.completed ? "fill-primary text-white" : "text-border"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full border-dashed"
                  onClick={() => addWorkoutSet(exercise.id)}
                >
                  + Add Set
                </Button>
              </>
            )}
          </Card>
        ))}
      </section>

      <Card data-reveal className="rounded-[32px] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Session notes
        </p>
        <Textarea
          className="mt-4"
          placeholder="How was your energy? Any pains or PRs?"
          value={workout.notes}
          onChange={(event) => setWorkoutNotes(event.target.value)}
        />
      </Card>

      <Button data-reveal size="lg" className="w-full">
        Complete Workout
      </Button>
    </PageShell>
  );
}
