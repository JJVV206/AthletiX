import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  initialActivities,
  initialAnalytics,
  initialNutrition,
  initialRoutine,
  initialWorkout,
} from "@/data/mock-data";
import {
  ActivityItem,
  AnalyticsSnapshot,
  CustomFoodInput,
  ExerciseLibraryItem,
  NutritionDay,
  NutritionTargetUpdate,
  RoutineTemplate,
  WorkoutSession,
} from "@/types/models";
import { createId } from "@/lib/utils";

const STORAGE_KEY = "vitalai-app-state-v3";

type AppStateShape = {
  nutrition: NutritionDay;
  workout: WorkoutSession;
  routine: RoutineTemplate;
  analytics: AnalyticsSnapshot;
  activities: ActivityItem[];
};

type AppStateContextValue = AppStateShape & {
  addFoodToMeal: (
    mealId: string,
    foodId: string,
    options?: {
      quantity?: number;
      searchQuery?: string;
    },
  ) => void;
  updateMealEntryQuantity: (mealId: string, entryId: string, quantity: number) => void;
  removeMealEntry: (mealId: string, entryId: string) => void;
  toggleFavoriteFood: (foodId: string) => void;
  addWater: (amountMl: number) => void;
  createCustomFood: (input: CustomFoodInput) => void;
  saveMealTemplate: (mealId: string, name?: string) => void;
  applyMealTemplate: (mealId: string, templateId: string) => void;
  copyYesterdayMeal: (mealId: string) => void;
  quickAddCalories: (mealId: string, payload: { name: string; calories: number }) => void;
  updateNutritionTargets: (update: NutritionTargetUpdate) => void;
  recordNutritionSearch: (query: string) => void;
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

function currentTimeLabel() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function buildRecentIds(nextId: string, previousIds: string[]) {
  return [nextId, ...previousIds.filter((id) => id !== nextId)].slice(0, 8);
}

function buildRecentSearches(query: string, previousSearches: string[]) {
  const normalized = query.trim();
  if (!normalized) return previousSearches;
  return [normalized, ...previousSearches.filter((item) => item !== normalized)].slice(
    0,
    8,
  );
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
      addFoodToMeal: (mealId, foodId, options) =>
        setState((previous) => {
          const food = previous.nutrition.foodCatalog.find((item) => item.id === foodId);
          if (!food) return previous;

          const quantity = Math.max(options?.quantity ?? 1, 1);
          const loggedAt = currentTimeLabel();
          const nextEntry = {
            ...food,
            entryId: createId("meal"),
            foodId: food.id,
            mealId,
            loggedAt,
            quantity,
          };
          const nextActivity: ActivityItem = {
            id: createId("activity"),
            title: food.name,
            subtitle: mealId[0].toUpperCase() + mealId.slice(1),
            caloriesDelta: Math.round(food.calories * quantity),
            tone: "positive",
            time: loggedAt,
          };

          return {
            ...previous,
            nutrition: {
              ...previous.nutrition,
              recentFoodIds: buildRecentIds(food.id, previous.nutrition.recentFoodIds),
              recentSearches: buildRecentSearches(
                options?.searchQuery ?? "",
                previous.nutrition.recentSearches,
              ),
              meals: previous.nutrition.meals.map((meal) =>
                meal.id === mealId
                  ? { ...meal, entries: [...meal.entries, nextEntry] }
                  : meal,
              ),
            },
            activities: [nextActivity, ...previous.activities].slice(0, 8),
          };
        }),
      updateMealEntryQuantity: (mealId, entryId, quantity) =>
        setState((previous) => ({
          ...previous,
          nutrition: {
            ...previous.nutrition,
            meals: previous.nutrition.meals.map((meal) =>
              meal.id === mealId
                ? {
                    ...meal,
                    entries: meal.entries.map((entry) =>
                      entry.entryId === entryId
                        ? { ...entry, quantity: Math.max(quantity, 1) }
                        : entry,
                    ),
                  }
                : meal,
            ),
          },
        })),
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
      toggleFavoriteFood: (foodId) =>
        setState((previous) => {
          const isFavorite = previous.nutrition.favoriteFoodIds.includes(foodId);

          return {
            ...previous,
            nutrition: {
              ...previous.nutrition,
              favoriteFoodIds: isFavorite
                ? previous.nutrition.favoriteFoodIds.filter((id) => id !== foodId)
                : [foodId, ...previous.nutrition.favoriteFoodIds].slice(0, 12),
            },
          };
        }),
      addWater: (amountMl) =>
        setState((previous) => {
          const hydrationActivity: ActivityItem = {
            id: createId("activity"),
            title: "Hydration",
            subtitle: `${amountMl} ml added`,
            caloriesDelta: 0,
            tone: "neutral",
            time: currentTimeLabel(),
          };

          return {
            ...previous,
            nutrition: {
              ...previous.nutrition,
              water: {
                ...previous.nutrition.water,
                consumedMl: previous.nutrition.water.consumedMl + amountMl,
              },
            },
            activities: [hydrationActivity, ...previous.activities].slice(0, 8),
          };
        }),
      createCustomFood: (input) =>
        setState((previous) => {
          const id = createId("food");
          const customFood = {
            id,
            name: input.name.trim(),
            brand: input.brand?.trim() || undefined,
            category: input.category ?? "homemade",
            source: "custom" as const,
            servingLabel: input.servingLabel.trim(),
            calories: input.calories,
            macros: input.macros,
            verified: false,
            tone: "mint" as const,
          };

          return {
            ...previous,
            nutrition: {
              ...previous.nutrition,
              foodCatalog: [customFood, ...previous.nutrition.foodCatalog],
              favoriteFoodIds: [id, ...previous.nutrition.favoriteFoodIds].slice(0, 12),
              recentFoodIds: buildRecentIds(id, previous.nutrition.recentFoodIds),
            },
          };
        }),
      saveMealTemplate: (mealId, name) =>
        setState((previous) => {
          const meal = previous.nutrition.meals.find((item) => item.id === mealId);
          if (!meal || meal.entries.length === 0) return previous;

          const template = {
            id: createId("template"),
            name: name?.trim() || `${meal.title} Template`,
            mealId,
            items: meal.entries.map((entry) => ({
              foodId: entry.foodId,
              quantity: entry.quantity,
            })),
          };

          return {
            ...previous,
            nutrition: {
              ...previous.nutrition,
              mealTemplates: [template, ...previous.nutrition.mealTemplates].slice(0, 10),
            },
          };
        }),
      applyMealTemplate: (mealId, templateId) =>
        setState((previous) => {
          const template = previous.nutrition.mealTemplates.find(
            (item) => item.id === templateId,
          );
          if (!template) return previous;

          const loggedAt = currentTimeLabel();
          const templateEntries = template.items
            .map((item) => {
              const food = previous.nutrition.foodCatalog.find(
                (entry) => entry.id === item.foodId,
              );
              if (!food) return null;
              return {
                ...food,
                entryId: createId("meal"),
                foodId: food.id,
                mealId,
                loggedAt,
                quantity: item.quantity,
              };
            })
            .filter(Boolean);

          return {
            ...previous,
            nutrition: {
              ...previous.nutrition,
              meals: previous.nutrition.meals.map((meal) =>
                meal.id === mealId
                  ? {
                      ...meal,
                      entries: [...meal.entries, ...(templateEntries as typeof meal.entries)],
                    }
                  : meal,
              ),
            },
          };
        }),
      copyYesterdayMeal: (mealId) =>
        setState((previous) => {
          const yesterday = previous.nutrition.yesterdayMeals.find(
            (item) => item.mealId === mealId,
          );
          if (!yesterday) return previous;

          const loggedAt = currentTimeLabel();
          const nextEntries = yesterday.items
            .map((item) => {
              const food = previous.nutrition.foodCatalog.find(
                (entry) => entry.id === item.foodId,
              );
              if (!food) return null;
              return {
                ...food,
                entryId: createId("meal"),
                foodId: food.id,
                mealId,
                loggedAt,
                quantity: item.quantity,
              };
            })
            .filter(Boolean);

          return {
            ...previous,
            nutrition: {
              ...previous.nutrition,
              meals: previous.nutrition.meals.map((meal) =>
                meal.id === mealId
                  ? { ...meal, entries: nextEntries as typeof meal.entries }
                  : meal,
              ),
            },
          };
        }),
      quickAddCalories: (mealId, payload) =>
        setState((previous) => {
          const loggedAt = currentTimeLabel();
          const quickEntry = {
            id: createId("manual"),
            name: payload.name.trim() || "Quick Add",
            category: "homemade" as const,
            source: "custom" as const,
            servingLabel: "manual",
            calories: payload.calories,
            macros: { protein: 0, carbs: 0, fats: 0 },
            verified: false,
            tone: "sand" as const,
            entryId: createId("meal"),
            foodId: createId("quick"),
            mealId,
            loggedAt,
            quantity: 1,
          };

          return {
            ...previous,
            nutrition: {
              ...previous.nutrition,
              meals: previous.nutrition.meals.map((meal) =>
                meal.id === mealId
                  ? { ...meal, entries: [...meal.entries, quickEntry] }
                  : meal,
              ),
            },
          };
        }),
      updateNutritionTargets: (update) =>
        setState((previous) => ({
          ...previous,
          nutrition: {
            ...previous.nutrition,
            budgetCalories: update.budgetCalories,
            macroTargets: update.macroTargets,
            targetStyle: update.targetStyle,
          },
        })),
      recordNutritionSearch: (query) =>
        setState((previous) => ({
          ...previous,
          nutrition: {
            ...previous.nutrition,
            recentSearches: buildRecentSearches(query, previous.nutrition.recentSearches),
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
