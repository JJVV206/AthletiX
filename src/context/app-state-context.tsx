import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  exerciseLibrary,
  initialActivities,
  initialAnalytics,
  initialNutrition,
  initialRoutine,
  initialWorkout,
  mealPresets,
} from "@/data/mock-data";
import {
  ActivityItem,
  AnalyticsSnapshot,
  ExerciseLibraryItem,
  NutritionDay,
  RoutineTemplate,
  WorkoutSession,
} from "@/types/models";
import { createId } from "@/lib/utils";

const STORAGE_KEY = "vitalia-app-state-v1";

type AppStateShape = {
  nutrition: NutritionDay;
  workout: WorkoutSession;
  routine: RoutineTemplate;
  analytics: AnalyticsSnapshot;
  activities: ActivityItem[];
};

type AppStateContextValue = AppStateShape & {
  addPresetMeal: (mealId: string, presetId: string) => void;
  removeMealEntry: (mealId: string, entryId: string) => void;
  toggleWorkoutSet: (exerciseId: string, setId: string) => void;
  addWorkoutSet: (exerciseId: string) => void;
  setWorkoutNotes: (notes: string) => void;
  toggleRestTimer: () => void;
  adjustRestTimer: (nextSeconds: number) => void;
  addRoutineDay: () => void;
  addExerciseToRoutine: (exerciseId: string, dayId?: string) => void;
  toggleRoutinePublish: () => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

const initialState: AppStateShape = {
  nutrition: initialNutrition,
  workout: initialWorkout,
  routine: initialRoutine,
  analytics: initialAnalytics,
  activities: initialActivities,
};

function loadAppState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return initialState;

  try {
    return JSON.parse(stored) as AppStateShape;
  } catch {
    return initialState;
  }
}

export function AppStateProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AppStateShape>(() => loadAppState());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!state.workout.restTimerRunning) return;

    const timer = window.setInterval(() => {
      setState((previous) => {
        if (!previous.workout.restTimerRunning) return previous;

        const nextValue = Math.max(previous.workout.restTimerSeconds - 1, 0);

        return {
          ...previous,
          workout: {
            ...previous.workout,
            restTimerSeconds: nextValue,
            restTimerRunning: nextValue > 0,
          },
        };
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [state.workout.restTimerRunning]);

  const value = useMemo<AppStateContextValue>(
    () => ({
      ...state,
      addPresetMeal: (mealId, presetId) =>
        setState((previous) => {
          const preset = mealPresets.find((item) => item.id === presetId);
          if (!preset) return previous;

          const nextEntry = {
            ...preset,
            entryId: createId("meal"),
            mealId,
            loggedAt: new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }),
          };
          const nextActivity: ActivityItem = {
            id: createId("activity"),
            title: preset.name,
            subtitle: mealId[0].toUpperCase() + mealId.slice(1),
            caloriesDelta: preset.calories,
            tone: "positive",
            time: nextEntry.loggedAt,
          };

          return {
            ...previous,
            nutrition: {
              ...previous.nutrition,
              meals: previous.nutrition.meals.map((meal) =>
                meal.id === mealId
                  ? { ...meal, entries: [...meal.entries, nextEntry] }
                  : meal,
              ),
            },
            activities: [nextActivity, ...previous.activities].slice(0, 6),
          };
        }),
      removeMealEntry: (mealId, entryId) =>
        setState((previous) => ({
          ...previous,
          nutrition: {
            ...previous.nutrition,
            meals: previous.nutrition.meals.map((meal) =>
              meal.id === mealId
                ? {
                    ...meal,
                    entries: meal.entries.filter((entry) => entry.entryId !== entryId),
                  }
                : meal,
            ),
          },
        })),
      toggleWorkoutSet: (exerciseId, setId) =>
        setState((previous) => ({
          ...previous,
          workout: {
            ...previous.workout,
            exercises: previous.workout.exercises.map((exercise) =>
              exercise.id === exerciseId
                ? {
                    ...exercise,
                    sets: exercise.sets.map((set) =>
                      set.id === setId ? { ...set, completed: !set.completed } : set,
                    ),
                  }
                : exercise,
            ),
          },
        })),
      addWorkoutSet: (exerciseId) =>
        setState((previous) => ({
          ...previous,
          workout: {
            ...previous.workout,
            exercises: previous.workout.exercises.map((exercise) =>
              exercise.id === exerciseId
                ? {
                    ...exercise,
                    sets: [
                      ...exercise.sets,
                      {
                        id: createId("set"),
                        previous:
                          exercise.sets[exercise.sets.length - 1]?.previous ?? "Bodyweight",
                        weightKg: exercise.sets[exercise.sets.length - 1]?.weightKg ?? 20,
                        reps: exercise.sets[exercise.sets.length - 1]?.reps ?? 10,
                        completed: false,
                      },
                    ],
                  }
                : exercise,
            ),
          },
        })),
      setWorkoutNotes: (notes) =>
        setState((previous) => ({
          ...previous,
          workout: {
            ...previous.workout,
            notes,
          },
        })),
      toggleRestTimer: () =>
        setState((previous) => ({
          ...previous,
          workout: {
            ...previous.workout,
            restTimerRunning: !previous.workout.restTimerRunning,
          },
        })),
      adjustRestTimer: (nextSeconds) =>
        setState((previous) => ({
          ...previous,
          workout: {
            ...previous.workout,
            restTimerSeconds: Math.max(nextSeconds, 0),
          },
        })),
      addRoutineDay: () =>
        setState((previous) => ({
          ...previous,
          routine: {
            ...previous.routine,
            days: [
              ...previous.routine.days,
              {
                id: createId("day"),
                title: `Day ${previous.routine.days.length + 1}: New Focus`,
                exercises: [],
              },
            ],
          },
        })),
      addExerciseToRoutine: (exerciseId, dayId) =>
        setState((previous) => {
          const selectedDayId = dayId ?? previous.routine.days[0]?.id;
          const item = previous.routine.library.find(
            (exercise) => exercise.id === exerciseId,
          );

          if (!selectedDayId || !item) return previous;

          return {
            ...previous,
            routine: {
              ...previous.routine,
              days: previous.routine.days.map((day) =>
                day.id === selectedDayId
                  ? { ...day, exercises: [...day.exercises, item] }
                  : day,
              ),
            },
          };
        }),
      toggleRoutinePublish: () =>
        setState((previous) => ({
          ...previous,
          routine: {
            ...previous.routine,
            published: !previous.routine.published,
          },
        })),
    }),
    [state],
  );

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }

  return context;
}

export function filterLibraryByTag(
  library: ExerciseLibraryItem[],
  tag: ExerciseLibraryItem["tag"],
) {
  if (tag === "all") return library;
  return library.filter((item) => item.tag === tag);
}
