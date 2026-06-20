import {
  ActivityItem,
  AnalyticsSnapshot,
  ExerciseLibraryItem,
  FoodDatabaseEntry,
  MacroKey,
  NutritionDay,
  OnboardingSelection,
  OnboardingGoal,
  PerformanceFocus,
  RoutineTemplate,
  SessionState,
  SportDiscipline,
  SupportMode,
  TrainingLevel,
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
    value: "body-composition",
    title: "Body Composition",
    description:
      "Improve body composition with structured fueling, training, and repeatable weekly adherence.",
  },
  {
    value: "build-strength",
    title: "Build Strength",
    description:
      "Develop force, movement quality, and confident progression across the lifts that matter.",
  },
  {
    value: "game-performance",
    title: "Game Performance",
    description:
      "Improve match readiness, conditioning, and sport-specific sharpness without guesswork.",
  },
  {
    value: "consistency",
    title: "Consistency",
    description:
      "Lock in your weekly rhythm with clear systems for nutrition, training, and recovery.",
  },
];

export const sportCards: Array<{
  value: SportDiscipline;
  title: string;
  description: string;
}> = [
  {
    value: "strength",
    title: "Gym / Strength",
    description: "PR tracking, volume, split planning, and strength progression.",
  },
  {
    value: "tennis",
    title: "Tennis",
    description: "Court sessions, technical blocks, recovery load, and match readiness.",
  },
  {
    value: "padel",
    title: "Padel",
    description: "Padel-specific workload, rotational power, and match-week structure.",
  },
  {
    value: "soccer",
    title: "Soccer",
    description: "Conditioning, sprint work, session notes, and game-load awareness.",
  },
  {
    value: "basketball",
    title: "Basketball",
    description: "Skill sessions, jump and sprint prep, and practice-to-game alignment.",
  },
];

export const trainingLevelCards: Array<{
  value: TrainingLevel;
  title: string;
  description: string;
}> = [
  {
    value: "foundation",
    title: "Foundation",
    description: "Building structure, movement confidence, and baseline consistency.",
  },
  {
    value: "intermediate",
    title: "Intermediate",
    description: "Training 3-5 days weekly with clear goals and measurable progression.",
  },
  {
    value: "competitive",
    title: "Competitive",
    description: "Serious athlete mode with higher precision, performance, and scheduling demands.",
  },
];

export const performanceFocusCards: Array<{
  value: PerformanceFocus;
  title: string;
  description: string;
}> = [
  {
    value: "strength",
    title: "Strength",
    description: "Max force output, gym progression, and robust movement patterns.",
  },
  {
    value: "conditioning",
    title: "Conditioning",
    description: "Work capacity, repeated efforts, and better fatigue resistance.",
  },
  {
    value: "skill",
    title: "Skill",
    description: "Technique quality, sport-specific practice, and sharper execution.",
  },
  {
    value: "recovery",
    title: "Recovery",
    description: "Readiness, durability, sleep, hydration, and lower-noise decision making.",
  },
];

export const supportModeCards: Array<{
  value: SupportMode;
  title: string;
  description: string;
  badge: string;
}> = [
  {
    value: "self-manage",
    title: "Self-Manage",
    description: "Core tracking tools for disciplined users who want clean structure.",
    badge: "Free",
  },
  {
    value: "ai-plus",
    title: "AI Support",
    description: "Unlock premium recommendations, smart reviews, and adaptive guidance.",
    badge: "Plus",
  },
  {
    value: "pro-coaching",
    title: "Professional Support",
    description: "Add access to sport-specific specialists for a more elite support layer.",
    badge: "Pro",
  },
];

export const sportLabels: Record<SportDiscipline, string> = {
  strength: "Strength",
  tennis: "Tennis",
  padel: "Padel",
  soccer: "Soccer",
  basketball: "Basketball",
};

export const trainingLevelLabels: Record<TrainingLevel, string> = {
  foundation: "Foundation",
  intermediate: "Intermediate",
  competitive: "Competitive",
};

export const performanceFocusLabels: Record<PerformanceFocus, string> = {
  strength: "Strength",
  conditioning: "Conditioning",
  skill: "Skill",
  recovery: "Recovery",
};

export const supportModeLabels: Record<SupportMode, string> = {
  "self-manage": "Self-Manage",
  "ai-plus": "AI Plus",
  "pro-coaching": "Pro Coaching",
};

export const onboardingDefaults: OnboardingSelection = {
  goal: "build-strength",
  sports: ["strength", "padel"],
  trainingLevel: "intermediate",
  performanceFocus: "strength",
  supportMode: "ai-plus",
  targetWeightKg: 79,
  weeklyTrainingDays: 5,
};

export const initialUserProfile: UserProfile = {
  name: "Alex Rivers",
  email: "alex@vitalai.app",
  title:
    "Hybrid athlete profile built around strength, repeatable court performance, and high-quality recovery.",
  performanceScore: 92,
  currentWeightKg: 82.5,
  targetWeightKg: onboardingDefaults.targetWeightKg,
  bodyFatPercent: 18.2,
  hydrationGoalLiters: 4,
  focus: onboardingDefaults.goal,
  sports: onboardingDefaults.sports,
  trainingLevel: onboardingDefaults.trainingLevel,
  performanceFocus: onboardingDefaults.performanceFocus,
  supportMode: onboardingDefaults.supportMode,
  membership: "plus",
  weeklyTrainingDays: onboardingDefaults.weeklyTrainingDays,
};

export const demoSession: SessionState = {
  authenticated: false,
  onboardingComplete: false,
  goal: null,
  user: initialUserProfile,
};

export const foodCatalog: FoodDatabaseEntry[] = [
  {
    id: "avocado-toast",
    name: "Avocado Toast with Egg",
    category: "homemade",
    source: "generic",
    servingLabel: "1 plate",
    calories: 420,
    macros: { protein: 22, carbs: 31, fats: 18 },
    verified: true,
    tone: "mint",
  },
  {
    id: "black-coffee",
    name: "Black Coffee",
    category: "drinks",
    source: "generic",
    servingLabel: "250 ml",
    calories: 5,
    macros: { protein: 0, carbs: 1, fats: 0 },
    verified: true,
    tone: "sand",
  },
  {
    id: "greek-yogurt-bowl",
    name: "Greek Yogurt Berries Bowl",
    category: "common",
    source: "generic",
    servingLabel: "1 bowl",
    calories: 245,
    macros: { protein: 18, carbs: 25, fats: 6 },
    verified: true,
    tone: "sand",
  },
  {
    id: "kombucha-salad",
    name: "Kombucha Chicken Salad",
    brand: "Field House",
    category: "restaurant",
    source: "restaurant",
    servingLabel: "1 plate",
    calories: 312,
    macros: { protein: 28, carbs: 16, fats: 12 },
    verified: false,
    tone: "lime",
  },
  {
    id: "chicken-rice-bowl",
    name: "Grilled Chicken Rice Bowl",
    brand: "Fuel House",
    category: "restaurant",
    source: "restaurant",
    servingLabel: "1 bowl",
    calories: 520,
    macros: { protein: 38, carbs: 44, fats: 16 },
    verified: true,
    tone: "mint",
  },
  {
    id: "almonds",
    name: "Almonds (Raw)",
    category: "common",
    source: "generic",
    servingLabel: "35 g",
    calories: 203,
    macros: { protein: 7, carbs: 7, fats: 17 },
    verified: true,
    tone: "sky",
  },
  {
    id: "green-detox-smoothie",
    name: "Green Detox Smoothie",
    category: "drinks",
    source: "generic",
    servingLabel: "450 ml",
    calories: 188,
    macros: { protein: 8, carbs: 26, fats: 5 },
    verified: true,
    tone: "mint",
  },
  {
    id: "whey-isolate",
    name: "Whey Isolate",
    brand: "Peak Labs",
    category: "supplements",
    source: "branded",
    servingLabel: "1 scoop",
    calories: 130,
    macros: { protein: 27, carbs: 3, fats: 1 },
    verified: true,
    tone: "sky",
  },
  {
    id: "banana",
    name: "Banana",
    category: "common",
    source: "generic",
    servingLabel: "1 medium",
    calories: 105,
    macros: { protein: 1, carbs: 27, fats: 0 },
    verified: true,
    tone: "lime",
  },
  {
    id: "protein-shake",
    name: "Ready-to-Drink Protein Shake",
    brand: "CoreFuel",
    category: "packaged",
    source: "branded",
    servingLabel: "1 bottle",
    calories: 250,
    macros: { protein: 30, carbs: 16, fats: 7 },
    verified: true,
    tone: "mint",
  },
  {
    id: "salmon-sushi-set",
    name: "Salmon Sushi Set",
    brand: "Nori Club",
    category: "restaurant",
    source: "restaurant",
    servingLabel: "8 pieces",
    calories: 420,
    macros: { protein: 26, carbs: 48, fats: 12 },
    verified: false,
    tone: "sand",
  },
  {
    id: "electrolyte-water",
    name: "Electrolyte Water",
    brand: "Hydra+",
    category: "packaged",
    source: "branded",
    servingLabel: "500 ml",
    calories: 15,
    macros: { protein: 0, carbs: 4, fats: 0 },
    verified: true,
    tone: "sky",
  },
];

function createMealEntry(
  foodId: string,
  mealId: string,
  loggedAt: string,
  quantity = 1,
) {
  const food = foodCatalog.find((item) => item.id === foodId);

  if (!food) {
    throw new Error(`Food ${foodId} not found in catalog`);
  }

  return {
    ...food,
    entryId: createId("meal"),
    foodId,
    mealId,
    loggedAt,
    quantity,
  };
}

export const initialNutrition: NutritionDay = {
  budgetCalories: 2800,
  burnedCalories: 312,
  macroTargets: {
    protein: 180,
    carbs: 240,
    fats: 70,
  },
  targetStyle: "high-protein",
  foodCatalog,
  recentFoodIds: [
    "green-detox-smoothie",
    "black-coffee",
    "chicken-rice-bowl",
    "whey-isolate",
    "almonds",
  ],
  favoriteFoodIds: [
    "avocado-toast",
    "whey-isolate",
    "chicken-rice-bowl",
    "almonds",
  ],
  recentSearches: ["protein shake", "salmon sushi", "yogurt bowl"],
  water: {
    goalMl: 3000,
    consumedMl: 1750,
  },
  mealTemplates: [
    {
      id: "template-breakfast",
      name: "My Breakfast",
      mealId: "breakfast",
      items: [
        { foodId: "avocado-toast", quantity: 1 },
        { foodId: "black-coffee", quantity: 1 },
      ],
    },
    {
      id: "template-lunch",
      name: "Chicken Rice Reset",
      mealId: "lunch",
      items: [{ foodId: "chicken-rice-bowl", quantity: 1 }],
    },
    {
      id: "template-post-workout",
      name: "Post-Workout Reload",
      mealId: "snacks",
      items: [
        { foodId: "protein-shake", quantity: 1 },
        { foodId: "banana", quantity: 1 },
      ],
    },
  ],
  yesterdayMeals: [
    {
      id: "yesterday-breakfast",
      name: "Yesterday Breakfast",
      mealId: "breakfast",
      items: [
        { foodId: "greek-yogurt-bowl", quantity: 1 },
        { foodId: "black-coffee", quantity: 1 },
      ],
    },
    {
      id: "yesterday-lunch",
      name: "Yesterday Lunch",
      mealId: "lunch",
      items: [{ foodId: "salmon-sushi-set", quantity: 1 }],
    },
    {
      id: "yesterday-dinner",
      name: "Yesterday Dinner",
      mealId: "dinner",
      items: [{ foodId: "chicken-rice-bowl", quantity: 1 }],
    },
    {
      id: "yesterday-snacks",
      name: "Yesterday Snacks",
      mealId: "snacks",
      items: [{ foodId: "almonds", quantity: 1 }],
    },
  ],
  history: [
    {
      id: "mon",
      label: "Mon",
      calories: 2540,
      macros: { protein: 171, carbs: 222, fats: 66 },
      waterMl: 2600,
      withinTarget: true,
    },
    {
      id: "tue",
      label: "Tue",
      calories: 2710,
      macros: { protein: 183, carbs: 231, fats: 71 },
      waterMl: 2900,
      withinTarget: true,
    },
    {
      id: "wed",
      label: "Wed",
      calories: 2860,
      macros: { protein: 164, carbs: 248, fats: 77 },
      waterMl: 2100,
      withinTarget: false,
    },
    {
      id: "thu",
      label: "Thu",
      calories: 2625,
      macros: { protein: 178, carbs: 226, fats: 69 },
      waterMl: 3000,
      withinTarget: true,
    },
    {
      id: "fri",
      label: "Fri",
      calories: 2485,
      macros: { protein: 187, carbs: 210, fats: 61 },
      waterMl: 2850,
      withinTarget: true,
    },
    {
      id: "sat",
      label: "Sat",
      calories: 2790,
      macros: { protein: 175, carbs: 240, fats: 73 },
      waterMl: 2500,
      withinTarget: true,
    },
    {
      id: "sun",
      label: "Sun",
      calories: 2920,
      macros: { protein: 168, carbs: 257, fats: 79 },
      waterMl: 2300,
      withinTarget: false,
    },
  ],
  meals: [
    {
      id: "breakfast",
      title: "Breakfast",
      targetCalories: 550,
      entries: [
        createMealEntry("avocado-toast", "breakfast", "08:10 AM"),
        createMealEntry("black-coffee", "breakfast", "08:12 AM"),
      ],
    },
    {
      id: "lunch",
      title: "Lunch",
      targetCalories: 720,
      entries: [
        createMealEntry("chicken-rice-bowl", "lunch", "12:40 PM"),
        createMealEntry("kombucha-salad", "lunch", "01:05 PM"),
      ],
    },
    {
      id: "dinner",
      title: "Dinner",
      targetCalories: 820,
      entries: [],
    },
    {
      id: "snacks",
      title: "Snacks",
      targetCalories: 320,
      entries: [
        createMealEntry("almonds", "snacks", "03:10 PM"),
        createMealEntry("whey-isolate", "snacks", "03:25 PM"),
      ],
    },
  ],
};

export const initialActivities: ActivityItem[] = [
  {
    id: "activity-1",
    title: "Fuel block logged",
    subtitle: "Breakfast • 425 kcal",
    caloriesDelta: 425,
    tone: "positive",
    time: "8:30 AM",
  },
  {
    id: "activity-2",
    title: "Acceleration primer",
    subtitle: "Training • 24 min",
    caloriesDelta: -210,
    tone: "negative",
    time: "7:15 AM",
  },
  {
    id: "activity-3",
    title: "Hydration",
    subtitle: "1.75 / 3.0 L",
    caloriesDelta: 0,
    tone: "neutral",
    time: "6:50 AM",
  },
];

export const initialWorkout: WorkoutSession = {
  title: "Upper Power + Court Transfer",
  startsAt: "Monday, Apr 20 • 02:45 PM",
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
      focus: "Max strength",
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
      name: "Med Ball Rotational Throw",
      group: "Rotational power",
      focus: "Court transfer",
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
  {
    id: "med-ball-throw",
    name: "Med Ball Rotational Throw",
    group: "Core",
    focus: "Power",
    repScheme: "4 Sets • 6 Throws / Side",
    tag: "all",
  },
];

export const initialRoutine: RoutineTemplate = {
  id: "athlete-performance-phase",
  title: "Strength + Court Transfer",
  phase: "Performance block",
  author: "Alex Rivers",
  updatedAt: "Updated 2h ago",
  published: true,
  library: exerciseLibrary,
  days: [
    {
      id: createId("day"),
      title: "Day 1: Upper Power",
      exercises: [exerciseLibrary[4], exerciseLibrary[5]],
    },
  ],
};

export const initialAnalytics: AnalyticsSnapshot = {
  weightHistory: [79, 80, 80, 82, 81, 85, 84],
  nutritionGoalPercent: 84,
  prs: [
    {
      id: "deadlift",
      lift: "Trap Bar Deadlift",
      value: 315,
      unit: "lb",
      deltaLabel: "New peak force output",
    },
    {
      id: "sprint",
      lift: "10 m Sprint",
      value: 1.84,
      unit: "s",
      deltaLabel: "-0.04 s in 3 weeks",
    },
    {
      id: "bench",
      lift: "Bench Press",
      value: 185,
      unit: "lb",
      deltaLabel: "Bench velocity trending up",
    },
  ],
  recoveryInsight:
    "Your last three high-output days were supported by stronger hydration and earlier sleep. Keep the current routine before raising weekly volume.",
  milestoneDate: "May 24",
};

export const targetStyleDescriptions: Record<
  NutritionDay["targetStyle"],
  { title: string; description: string; macroTargets: Record<MacroKey, number> }
> = {
  balanced: {
    title: "Balanced",
    description: "Stable energy, even macro distribution, and better weekly compliance.",
    macroTargets: { protein: 165, carbs: 240, fats: 75 },
  },
  "high-protein": {
    title: "High Protein",
    description: "Extra protein support for strength progress, recovery, and satiety.",
    macroTargets: { protein: 190, carbs: 230, fats: 70 },
  },
  "low-carb": {
    title: "Low Carb",
    description: "Lower carbohydrate ceiling with higher protein and fats.",
    macroTargets: { protein: 180, carbs: 160, fats: 95 },
  },
  "low-fat": {
    title: "Low Fat",
    description: "More room for carbs while keeping overall calories controlled.",
    macroTargets: { protein: 175, carbs: 265, fats: 55 },
  },
};
