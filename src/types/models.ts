export type OnboardingGoal =
  | "lose-weight"
  | "gain-muscle"
  | "improve-habits"
  | "train-smarter";

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
  vitalityScore: number;
  currentWeightKg: number;
  targetWeightKg: number;
  bodyFatPercent: number;
  hydrationLiters: number;
  focus: OnboardingGoal;
};

export type MealPreset = {
  id: string;
  name: string;
  amount: string;
  calories: number;
  macros: Record<MacroKey, number>;
  tone: "mint" | "lime" | "sky" | "sand";
};

export type MealEntry = MealPreset & {
  entryId: string;
  mealId: string;
  loggedAt: string;
};

export type MealSection = {
  id: string;
  title: string;
  targetCalories: number;
  entries: MealEntry[];
};

export type NutritionDay = {
  budgetCalories: number;
  burnedCalories: number;
  macroTargets: Record<MacroKey, number>;
  meals: MealSection[];
  suggestedPresets: MealPreset[];
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
