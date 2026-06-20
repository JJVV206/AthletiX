export type OnboardingGoal =
  | "body-composition"
  | "build-strength"
  | "game-performance"
  | "consistency";

export type SportDiscipline =
  | "strength"
  | "tennis"
  | "padel"
  | "soccer"
  | "basketball";

export type TrainingLevel = "foundation" | "intermediate" | "competitive";

export type PerformanceFocus =
  | "strength"
  | "conditioning"
  | "skill"
  | "recovery";

export type SupportMode = "self-manage" | "ai-plus" | "pro-coaching";

export type MembershipTier = "free" | "plus" | "pro";

export type MacroKey = "protein" | "carbs" | "fats";

export type MacroProgress = {
  key: MacroKey;
  label: string;
  current: number;
  target: number;
  tone: "primary" | "lime" | "sky";
};

export type ActivityItem = {
  id: string;
  title: string;
  subtitle: string;
  caloriesDelta: number;
  tone: "positive" | "negative" | "neutral";
  time: string;
};

export type UserProfile = {
  name: string;
  email: string;
  title: string;
  performanceScore: number;
  currentWeightKg: number;
  targetWeightKg: number;
  bodyFatPercent: number;
  hydrationGoalLiters: number;
  focus: OnboardingGoal;
  sports: SportDiscipline[];
  trainingLevel: TrainingLevel;
  performanceFocus: PerformanceFocus;
  supportMode: SupportMode;
  membership: MembershipTier;
  weeklyTrainingDays: number;
};

export type OnboardingSelection = {
  goal: OnboardingGoal;
  sports: SportDiscipline[];
  trainingLevel: TrainingLevel;
  performanceFocus: PerformanceFocus;
  supportMode: SupportMode;
  targetWeightKg: number;
  weeklyTrainingDays: number;
};

export type FoodTone = "mint" | "lime" | "sky" | "sand";

export type FoodCategory =
  | "common"
  | "packaged"
  | "restaurant"
  | "homemade"
  | "supplements"
  | "drinks";

export type FoodSource = "generic" | "branded" | "restaurant" | "custom";

export type NutritionTargetStyle =
  | "balanced"
  | "high-protein"
  | "low-carb"
  | "low-fat";

export type FoodDatabaseEntry = {
  id: string;
  name: string;
  brand?: string;
  category: FoodCategory;
  source: FoodSource;
  servingLabel: string;
  calories: number;
  macros: Record<MacroKey, number>;
  verified: boolean;
  tone: FoodTone;
};

export type CustomFoodInput = {
  name: string;
  brand?: string;
  servingLabel: string;
  calories: number;
  macros: Record<MacroKey, number>;
  category?: FoodCategory;
};

export type NutritionTargetUpdate = {
  budgetCalories: number;
  macroTargets: Record<MacroKey, number>;
  targetStyle: NutritionTargetStyle;
};

export type MealEntry = FoodDatabaseEntry & {
  entryId: string;
  mealId: string;
  foodId: string;
  loggedAt: string;
  quantity: number;
};

export type MealSection = {
  id: string;
  title: string;
  targetCalories: number;
  entries: MealEntry[];
};

export type MealTemplate = {
  id: string;
  name: string;
  mealId: string;
  items: Array<{
    foodId: string;
    quantity: number;
  }>;
};

export type HydrationDay = {
  goalMl: number;
  consumedMl: number;
};

export type NutritionHistoryDay = {
  id: string;
  label: string;
  calories: number;
  macros: Record<MacroKey, number>;
  waterMl: number;
  withinTarget: boolean;
};

export type NutritionDay = {
  budgetCalories: number;
  burnedCalories: number;
  macroTargets: Record<MacroKey, number>;
  targetStyle: NutritionTargetStyle;
  meals: MealSection[];
  foodCatalog: FoodDatabaseEntry[];
  recentFoodIds: string[];
  favoriteFoodIds: string[];
  recentSearches: string[];
  water: HydrationDay;
  mealTemplates: MealTemplate[];
  yesterdayMeals: MealTemplate[];
  history: NutritionHistoryDay[];
};

export type DashboardSnapshot = {
  caloriesLeft: number;
  eatenCalories: number;
  burnedCalories: number;
  macros: MacroProgress[];
  recommendedWorkout: {
    title: string;
    durationMin: number;
    calories: number;
    difficulty: string;
  };
  activities: ActivityItem[];
};

export type ExerciseSet = {
  id: string;
  previous: string;
  weightKg: number;
  reps: number;
  completed: boolean;
};

export type WorkoutExercise = {
  id: string;
  name: string;
  group: string;
  focus: string;
  icon: string;
  locked?: boolean;
  sets: ExerciseSet[];
};

export type WorkoutSession = {
  title: string;
  startsAt: string;
  durationSeconds: number;
  volumeKg: number;
  restTimerSeconds: number;
  restTimerRunning: boolean;
  notes: string;
  exercises: WorkoutExercise[];
};

export type ExerciseLibraryItem = {
  id: string;
  name: string;
  group: string;
  focus: string;
  repScheme: string;
  tag: "all" | "chest" | "legs" | "back";
};

export type TrainingDay = {
  id: string;
  title: string;
  exercises: ExerciseLibraryItem[];
};

export type RoutineTemplate = {
  id: string;
  title: string;
  phase: string;
  author: string;
  updatedAt: string;
  published: boolean;
  days: TrainingDay[];
  library: ExerciseLibraryItem[];
};

export type AnalyticsSnapshot = {
  weightHistory: number[];
  nutritionGoalPercent: number;
  prs: Array<{
    id: string;
    lift: string;
    value: number;
    unit: string;
    deltaLabel: string;
  }>;
  recoveryInsight: string;
  milestoneDate: string;
};

export type SessionState = {
  authenticated: boolean;
  onboardingComplete: boolean;
  goal: OnboardingGoal | null;
  user: UserProfile;
};
