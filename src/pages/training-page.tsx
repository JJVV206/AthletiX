import { useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Minus,
  Plus,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageShell } from "@/components/page-shell";
import { useAppState } from "@/context/app-state-context";
import { useLoopPulse } from "@/lib/motion";
import { formatDuration, formatLongDuration, formatNumber } from "@/lib/utils";

export function TrainingPage() {
  const {
    workout,
    routine,
    addExerciseToRoutine,
    addRoutineDay,
    addWorkoutSet,
    adjustRestTimer,
    setWorkoutNotes,
    toggleRestTimer,
    toggleRoutinePublish,
    toggleWorkoutSet,
  } = useAppState();
  const [query, setQuery] = useState("");
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(
    workout.exercises.find((exercise) => !exercise.locked)?.id ?? workout.exercises[0]?.id,
  );
  const startButtonRef = useRef<HTMLButtonElement>(null);
  useLoopPulse(startButtonRef, workout.restTimerRunning);

  const filteredLibrary = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return routine.library;

    return routine.library.filter((item) =>
      [item.name, item.group, item.focus].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [query, routine.library]);

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
      <section className="mx-auto w-full max-w-[21.5rem] sm:max-w-[24rem] xl:mx-0 xl:max-w-[28rem]">
        <Card className="rounded-[34px] p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Main action
              </p>
              <p className="mt-4 text-6xl font-extrabold tracking-tight text-primary">
                {formatDuration(workout.restTimerSeconds)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Rest timer</p>
            </div>
            <div className="rounded-2xl bg-primary/12 p-4 text-primary">
              <Clock3 className="h-6 w-6" />
            </div>
          </div>
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
              variant="default"
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
          <div className="mt-8 rounded-[24px] bg-white/5 p-5">
            <p className="text-sm font-semibold">Plan status</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {routine.published
                ? "This performance block is live and ready for execution."
                : "This block is still in draft mode."}
            </p>
            <Button className="mt-4" variant="outline" onClick={toggleRoutinePublish}>
              {routine.published ? "Unpublish block" : "Publish block"}
            </Button>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-4">
          {workout.exercises.map((exercise) => {
            const isExpanded = expandedExerciseId === exercise.id;
            const completedExerciseSets = exercise.sets.filter((set) => set.completed).length;

            return (
              <Card key={exercise.id} data-reveal className="rounded-[28px] p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                      {exercise.group}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">{exercise.name}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{exercise.focus}</p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {completedExerciseSets}/{exercise.sets.length || 0} sets completed
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        setExpandedExerciseId((previous) =>
                          previous === exercise.id ? null : exercise.id,
                        )
                      }
                    >
                      {isExpanded ? (
                        <>
                          Hide details
                          <ChevronUp className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show details
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {isExpanded ? (
                  exercise.locked ? (
                    <div className="mt-5 rounded-[24px] bg-white/5 px-4 py-8 text-center text-sm text-muted-foreground">
                      Awaiting previous block completion...
                    </div>
                  ) : (
                    <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
                      <div className="overflow-hidden rounded-[24px] border border-white/10">
                        <div className="grid grid-cols-[72px_1fr_96px_96px_60px] bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          <span>Set</span>
                          <span>Previous</span>
                          <span>Kg</span>
                          <span>Reps</span>
                          <span />
                        </div>
                        <div className="divide-y divide-white/10">
                          {exercise.sets.map((set, index) => (
                            <div
                              key={set.id}
                              className="grid grid-cols-[72px_1fr_96px_96px_60px] items-center px-4 py-4"
                            >
                              <span className="text-lg font-bold">{index + 1}</span>
                              <span className="text-muted-foreground">{set.previous}</span>
                              <span className="rounded-2xl bg-white/5 px-4 py-3 text-center font-semibold">
                                {set.weightKg}
                              </span>
                              <span className="rounded-2xl bg-white/5 px-4 py-3 text-center font-semibold">
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
                                    set.completed ? "fill-primary text-background" : "text-border"
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-dashed"
                        onClick={() => addWorkoutSet(exercise.id)}
                      >
                        + Add Set
                      </Button>
                    </div>
                  )
                ) : null}
              </Card>
            );
          })}

          <Card data-reveal className="rounded-[28px] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Session notes
            </p>
            <Textarea
              className="mt-4"
              placeholder="Track energy, technical notes, pain points, or notable outputs."
              value={workout.notes}
              onChange={(event) => setWorkoutNotes(event.target.value)}
            />
          </Card>
        </div>

        <div className="space-y-4">
          <Card data-reveal className="rounded-[28px] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Program overview
            </p>
            <h2 className="mt-3 text-2xl font-bold">{routine.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {routine.phase} • {routine.updatedAt}
            </p>
            <div className="mt-5 space-y-3">
                      {routine.days.map((day) => (
                <div key={day.id} className="rounded-[22px] bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold">{day.title}</p>
                    <span className="text-sm text-muted-foreground">
                      {day.exercises.length} exercises
                    </span>
                  </div>
                  {day.exercises.length > 0 ? (
                    <div className="mt-4 space-y-2">
                      {day.exercises.map((exercise) => (
                        <div
                          key={`${day.id}-${exercise.id}`}
                          className="rounded-[18px] bg-slate-950/55 px-3 py-3 text-sm"
                        >
                          <p className="font-semibold">{exercise.name}</p>
                          <p className="mt-1 text-muted-foreground">{exercise.repScheme}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full" onClick={addRoutineDay}>
              Add New Training Day
            </Button>
          </Card>

          <Card data-reveal className="rounded-[28px] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Exercise library
            </p>
            <Input
              className="mt-4"
              placeholder="Search movements..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="mt-4 space-y-3">
              {filteredLibrary.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-4"
                >
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.group} • {item.focus}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.repScheme}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 px-0 text-primary"
                    onClick={() => addExerciseToRoutine(item.id)}
                  >
                    Add to day 1 plan
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
