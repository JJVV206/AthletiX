import {
  ActivityItem,
  AnalyticsSnapshot,
  DashboardSnapshot,
  ExerciseLibraryItem,
  MacroKey,
  MealPreset,
  NutritionDay,
  OnboardingGoal,
  RoutineTemplate,
  SessionState,
  UserProfile,
  WorkoutSession,
} from "@/types/models";
import { createId } from "@/lib/utils";

export const goalCards: Array<{
  value: OnboardingGoal;
  title: string;
  description: string;
}> = [
  {
    value: "lose-weight",
    title: "Lose Weight",
    description: "Burn fat, tone your body, and feel lighter every day.",
  },
  {
    value: "gain-muscle",
    title: "Gain Muscle",
    description: "Build strength, add lean mass, and sculpt your physique.",
  },
  {
    value: "improve-habits",
    title: "Improve Habits",
    description: "Sleep better, hydrate smarter, and create sustainable rhythm.",
  },
  {
    value: "train-smarter",
    title: "Train Smarter",
    description: "Optimize recovery, performance, and day-to-day readiness.",
  },
];

export const initialUserProfile: UserProfile = {
  name: "Alex Rivers",
  email: "alex@vitalia.app",
  title: "Transformation strategist focused on longevity and functional strength.",
  vitalityScore: 92,
  currentWeightKg: 82.5,
  targetWeightKg: 78,
  bodyFatPercent: 18.2,
  hydrationLiters: 4,
  focus: "gain-muscle",
};

export const demoSession: SessionState = {
  authenticated: false,
  onboardingComplete: false,
  goal: null,
  user: initialUserProfile,
};

export const mealPresets: MealPreset[] = [
  {
    id: "avocado-toast",
    name: "Avocado Toast with Egg",
    amount: "1 serving",
    calories: 420,
    macros: { protein: 22, carbs: 31, fats: 18 },
    tone: "mint",
  },
  {
    id: "greek-yogurt",
    name: "Greek Yogurt Berries Bowl",
    amount: "1 bowl",
    calories: 245,
    macros: { protein: 18, carbs: 25, fats: 6 },
    tone: "sand",
  },
  {
    id: "kombucha-salad",
    name: "Kombucha Chicken Salad",
    amount: "1 plate",
    calories: 312,
    macros: { protein: 28, carbs: 16, fats: 12 },
    tone: "lime",
  },
  {
    id: "almonds",
    name: "Almonds (Raw)",
    amount: "35 g",
    calories: 203,
    macros: { protein: 7, carbs: 7, fats: 17 },
    tone: "sky",
  },
  {
    id: "smoothie",
    name: "Green Detox Smoothie",
    amount: "450 ml",
    calories: 188,
    macros: { protein: 8, carbs: 26, fats: 5 },
    tone: "mint",
  },
];

export const initialNutrition: NutritionDay = {
  budgetCalories: 2800,
  burnedCalories: 312,
  macroTargets: {
    protein: 150,
    carbs: 220,
    fats: 65,
  },
  suggestedPresets: mealPresets,
  meals: [
    {
      id: "breakfast",
      title: "Breakfast",
      targetCalories: 420,
      entries: [
        {
          ...mealPresets[0],
          entryId: createId("meal"),
          mealId: "breakfast",
          loggedAt: "08:10 AM",
        },
      ],
    },
    {
      id: "lunch",
      title: "Lunch",
      targetCalories: 645,
      entries: [
        {
          ...mealPresets[1],
          entryId: createId("meal"),
          mealId: "lunch",
          loggedAt: "12:40 PM",
        },
        {
          ...mealPresets[2],
          entryId: createId("meal"),
          mealId: "lunch",
          loggedAt: "01:05 PM",
        },
      ],
    },
    {
      id: "dinner",
      title: "Dinner",
      targetCalories: 780,
      entries: [],
    },
    {
      id: "snacks",
      title: "Snacks",
      targetCalories: 293,
      entries: [
        {
          ...mealPresets[3],
          entryId: createId("meal"),
          mealId: "snacks",
          loggedAt: "03:10 PM",
        },
      ],
    },
  ],
};

export const initialActivities: ActivityItem[] = [
  {
    id: "activity-1",
    title: "Avocado Toast & Poached Egg",
    subtitle: "Breakfast",
    caloriesDelta: 342,
    tone: "positive",
    time: "8:30 AM",
  },
  {
    id: "activity-2",
    title: "Morning Jog",
    subtitle: "Cardio",
    caloriesDelta: -210,
    tone: "negative",
    time: "7:15 AM",
  },
  {
    id: "activity-3",
    title: "Hydration",
    subtitle: "Daily goal",
    caloriesDelta: 0,
    tone: "neutral",
    time: "6:50 AM",
  },
];

export const initialWorkout: WorkoutSession = {
  title: "Afternoon Hypertrophy",
  startsAt: "Monday, Oct 24 • 02:45 PM",
  durationSeconds: 42 * 60 + 15,
  volumeKg: 4250,
  restTimerSeconds: 90,
  restTimerRunning: false,
  notes: "",
  exercises: [
    {
      id: "bench",
      name: "Barbell Bench Press",
      group: "Chest",
      focus: "Strength",
      icon: "barbell",
      sets: [
        {
          id: createId("set"),
          previous: "80 kg x 8",
          weightKg: 85,
          reps: 8,
          completed: true,
        },
        {
          id: createId("set"),
          previous: "80 kg x 8",
          weightKg: 85,
          reps: 8,
          completed: false,
        },
      ],
    },
    {
      id: "incline-db",
      name: "Incline Dumbbell Press",
      group: "Upper Chest",
      focus: "Hypertrophy",
      icon: "dumbbell",
      locked: true,
      sets: [],
    },
  ],
};

export const exerciseLibrary: ExerciseLibraryItem[] = [
  {
    id: "barbell-squat",
    name: "Barbell Squat",
    group: "Quads",
    focus: "Compound",
    repScheme: "4 Sets • 6-8 Reps",
    tag: "legs",
  },
  {
    id: "deadlift",
    name: "Deadlift",
    group: "Back",
    focus: "Compound",
    repScheme: "4 Sets • 3-5 Reps",
    tag: "back",
  },
  {
    id: "pull-ups",
    name: "Pull Ups",
    group: "Back",
    focus: "Bodyweight",
    repScheme: "3 Sets • AMRAP",
    tag: "back",
  },
  {
    id: "seated-row",
    name: "Seated Row",
    group: "Back",
    focus: "Isolation",
    repScheme: "3 Sets • 10-12 Reps",
    tag: "back",
  },
  {
    id: "standing-db-lateral-raise",
    name: "Standing Dumbbell Lateral Raise",
    group: "Shoulders",
    focus: "Accessory",
    repScheme: "3 Sets • 12-15 Reps",
    tag: "all",
  },
];

export const initialRoutine: RoutineTemplate = {
  id: "hypertrophy-phase",
  title: "Hypertrophy Phase A",
  phase: "Master Template",
  author: "Alex Rivers",
  updatedAt: "Updated 2h ago",
  published: true,
  library: exerciseLibrary,
  days: [
    {
      id: createId("day"),
      title: "Day 1: Push Focus",
      exercises: [exerciseLibrary[4]],
    },
  ],
};

export const initialAnalytics: AnalyticsSnapshot = {
  weightHistory: [79, 80, 80, 82, 81, 85, 84],
  nutritionGoalPercent: 84,
  prs: [
    {
      id: "deadlift",
      lift: "Deadlift",
      value: 315,
      unit: "lb",
      deltaLabel: "New record",
    },
    {
      id: "squat",
      lift: "Back Squat",
      value: 245,
      unit: "lb",
      deltaLabel: "10 lb gain",
    },
    {
      id: "bench",
      lift: "Bench Press",
      value: 185,
      unit: "lb",
      deltaLabel: "Steady climb",
    },
  ],
  recoveryInsight:
    "Your sleep score rebounded after two low-stress evenings. Maintain your current hydration pace to preserve momentum.",
  milestoneDate: "May 24",
};

export function buildDashboardSnapshot(
  nutrition: NutritionDay,
  activities: ActivityItem[],
): DashboardSnapshot {
  const totals = nutrition.meals.flatMap((meal) => meal.entries).reduce(
    (acc, entry) => {
      acc.calories += entry.calories;
      (["protein", "carbs", "fats"] as MacroKey[]).forEach((macro) => {
        acc.macros[macro] += entry.macros[macro];
      });
      return acc;
    },
    {
      calories: 0,
      macros: { protein: 0, carbs: 0, fats: 0 },
    },
  );

  return {
    caloriesLeft: Math.max(
      nutrition.budgetCalories - totals.calories + nutrition.burnedCalories,
      0,
    ),
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
      title: "High-Intensity Core Burn",
      durationMin: 35,
      calories: 420,
      difficulty: "Intermediate",
    },
    activities,
  };
}
