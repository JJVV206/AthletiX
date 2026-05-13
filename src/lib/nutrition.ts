import {
  ActivityItem,
  DashboardSnapshot,
  FoodDatabaseEntry,
  MacroKey,
  MealEntry,
  MealSection,
  NutritionDay,
} from "@/types/models";

export const macroKeys: MacroKey[] = ["protein", "carbs", "fats"];

export function scaleMacros(
  macros: Record<MacroKey, number>,
  quantity: number,
): Record<MacroKey, number> {
  return {
    protein: Math.round(macros.protein * quantity),
    carbs: Math.round(macros.carbs * quantity),
    fats: Math.round(macros.fats * quantity),
  };
}

export function getMealEntryTotals(entry: MealEntry) {
  return {
    calories: Math.round(entry.calories * entry.quantity),
    macros: scaleMacros(entry.macros, entry.quantity),
  };
}

export function getMealTotals(meal: MealSection) {
  return meal.entries.reduce(
    (acc, entry) => {
      const totals = getMealEntryTotals(entry);
      acc.calories += totals.calories;
      macroKeys.forEach((macro) => {
        acc.macros[macro] += totals.macros[macro];
      });
      return acc;
    },
    {
      calories: 0,
      macros: { protein: 0, carbs: 0, fats: 0 },
    },
  );
}

export function getNutritionTotals(nutrition: NutritionDay) {
  return nutrition.meals.reduce(
    (acc, meal) => {
      const mealTotals = getMealTotals(meal);
      acc.calories += mealTotals.calories;
      macroKeys.forEach((macro) => {
        acc.macros[macro] += mealTotals.macros[macro];
      });
      acc.meals.push({
        mealId: meal.id,
        title: meal.title,
        calories: mealTotals.calories,
        macros: mealTotals.macros,
      });
      return acc;
    },
    {
      calories: 0,
      macros: { protein: 0, carbs: 0, fats: 0 },
      meals: [] as Array<{
        mealId: string;
        title: string;
        calories: number;
        macros: Record<MacroKey, number>;
      }>,
    },
  );
}

export function getCaloriesRemaining(nutrition: NutritionDay) {
  const totals = getNutritionTotals(nutrition);
  return Math.max(nutrition.budgetCalories - totals.calories + nutrition.burnedCalories, 0);
}

export function getRemainingMacros(nutrition: NutritionDay) {
  const totals = getNutritionTotals(nutrition);

  return {
    protein: Math.max(nutrition.macroTargets.protein - totals.macros.protein, 0),
    carbs: Math.max(nutrition.macroTargets.carbs - totals.macros.carbs, 0),
    fats: Math.max(nutrition.macroTargets.fats - totals.macros.fats, 0),
  };
}

export function getFoodById(nutrition: NutritionDay, foodId: string) {
  return nutrition.foodCatalog.find((food) => food.id === foodId);
}

export function getFoodsByIds(nutrition: NutritionDay, ids: string[]) {
  return ids
    .map((foodId) => getFoodById(nutrition, foodId))
    .filter((food): food is FoodDatabaseEntry => Boolean(food));
}

export function getFavoriteFoods(nutrition: NutritionDay) {
  return getFoodsByIds(nutrition, nutrition.favoriteFoodIds);
}

export function getRecentFoods(nutrition: NutritionDay) {
  return getFoodsByIds(nutrition, nutrition.recentFoodIds);
}

export function getWaterProgress(nutrition: NutritionDay) {
  if (nutrition.water.goalMl === 0) return 0;
  return (nutrition.water.consumedMl / nutrition.water.goalMl) * 100;
}

export function buildDashboardSnapshot(
  nutrition: NutritionDay,
  activities: ActivityItem[],
): DashboardSnapshot {
  const totals = getNutritionTotals(nutrition);

  return {
    caloriesLeft: getCaloriesRemaining(nutrition),
    eatenCalories: totals.calories,
    burnedCalories: nutrition.burnedCalories,
    macros: [
      {
        key: "protein",
        label: "Protein",
        current: totals.macros.protein,
        target: nutrition.macroTargets.protein,
        tone: "primary",
      },
      {
        key: "carbs",
        label: "Carbs",
        current: totals.macros.carbs,
        target: nutrition.macroTargets.carbs,
        tone: "lime",
      },
      {
        key: "fats",
        label: "Fats",
        current: totals.macros.fats,
        target: nutrition.macroTargets.fats,
        tone: "sky",
      },
    ],
    recommendedWorkout: {
      title: "Upper Power + Court Transfer",
      durationMin: 54,
      calories: 460,
      difficulty: "Performance block",
    },
    activities,
  };
}

export function buildDailyNutritionSummary(nutrition: NutritionDay) {
  const totals = getNutritionTotals(nutrition);
  const caloriesRemaining = getCaloriesRemaining(nutrition);
  const exceededCalories = Math.max(
    totals.calories - nutrition.budgetCalories - nutrition.burnedCalories,
    0,
  );
  const mealsLogged = nutrition.meals.filter((meal) => meal.entries.length > 0).length;

  return {
    consumedCalories: totals.calories,
    caloriesRemaining,
    exceededCalories,
    mealsLogged,
    waterProgress: getWaterProgress(nutrition),
  };
}

export function buildWeeklyNutritionSummary(nutrition: NutritionDay) {
  const days = nutrition.history.length;

  const totals = nutrition.history.reduce(
    (acc, day) => {
      acc.calories += day.calories;
      acc.protein += day.macros.protein;
      acc.withinTarget += day.withinTarget ? 1 : 0;
      return acc;
    },
    {
      calories: 0,
      protein: 0,
      withinTarget: 0,
    },
  );

  let currentStreak = 0;
  let bestStreak = 0;
  nutrition.history.forEach((day) => {
    if (day.withinTarget) {
      currentStreak += 1;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });

  const midpoint = Math.max(Math.floor(days / 2), 1);
  const previous = nutrition.history.slice(0, midpoint);
  const current = nutrition.history.slice(midpoint);
  const previousAverage =
    previous.reduce((acc, day) => acc + day.calories, 0) / previous.length;
  const currentAverage =
    current.reduce((acc, day) => acc + day.calories, 0) / current.length;

  return {
    averageCalories: Math.round(totals.calories / days),
    averageProtein: Math.round(totals.protein / days),
    daysWithinTarget: totals.withinTarget,
    adherenceRate: Math.round((totals.withinTarget / days) * 100),
    bestStreak,
    trendVsPreviousWeek: Math.round(currentAverage - previousAverage),
  };
}

export function matchesFoodQuery(food: FoodDatabaseEntry, query: string) {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return true;

  const haystacks = [
    food.name,
    food.brand ?? "",
    food.category,
    food.source,
  ].map((value) => value.toLowerCase());

  if (haystacks.some((value) => value.includes(normalizedQuery))) {
    return true;
  }

  return normalizedQuery
    .split(/\s+/)
    .every((token) => haystacks.some((value) => value.includes(token)));
}
