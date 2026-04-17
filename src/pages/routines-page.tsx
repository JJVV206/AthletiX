import { useMemo, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/page-shell";
import { filterLibraryByTag, useAppState } from "@/context/app-state-context";
import { ExerciseLibraryItem } from "@/types/models";

const tags: ExerciseLibraryItem["tag"][] = ["all", "chest", "legs", "back"];

export function RoutinesPage() {
  const { routine, addExerciseToRoutine, addRoutineDay, toggleRoutinePublish } =
    useAppState();
  const [activeTag, setActiveTag] = useState<ExerciseLibraryItem["tag"]>("all");

  const filteredLibrary = useMemo(
    () => filterLibraryByTag(routine.library, activeTag),
    [activeTag, routine.library],
  );

  return (
    <PageShell className="space-y-6">
      <Card data-reveal className="rounded-[34px] p-8">
        <Badge variant="subtle" className="w-fit text-primary">
          {routine.phase}
        </Badge>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">
          {routine.title}
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Created by {routine.author} • {routine.updatedAt}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="secondary">Save Draft</Button>
          <Button onClick={toggleRoutinePublish}>
            {routine.published ? "Unpublish Routine" : "Publish Routine"}
          </Button>
        </div>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {routine.days.map((day) => (
            <Card key={day.id} data-reveal className="rounded-[32px] p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">{day.title}</h2>
                <span className="text-sm text-muted-foreground">
                  {day.exercises.length} exercises
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {day.exercises.map((exercise) => (
                  <div
                    key={`${day.id}-${exercise.id}`}
                    className="rounded-[22px] bg-muted/70 px-4 py-4"
                  >
                    <p className="font-semibold">{exercise.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {exercise.repScheme} • {exercise.group} • {exercise.focus}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          <Button variant="outline" className="w-full" onClick={addRoutineDay}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Training Day
          </Button>
        </div>

        <Card data-reveal className="rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Exercise library
          </p>
          <Input className="mt-5" placeholder="Search movements..." />
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                  activeTag === tag ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {filteredLibrary.map((item) => (
              <div
                key={item.id}
                className="rounded-[24px] border border-border/60 bg-white/80 p-4"
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
                  Add to Day 1
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
