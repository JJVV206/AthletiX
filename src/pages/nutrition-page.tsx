import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Barcode,
  Camera,
  ChevronDown,
  ChevronUp,
  Copy,
  Droplets,
  History,
  Plus,
  Save,
  Search,
  Star,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageShell } from "@/components/page-shell";
import { useAppState } from "@/context/app-state-context";
import {
  buildDailyNutritionSummary,
  buildWeeklyNutritionSummary,
  getCaloriesRemaining,
  getFavoriteFoods,
  getMealEntryTotals,
  getMealTotals,
  getNutritionTotals,
  getRecentFoods,
  getRemainingMacros,
  getWaterProgress,
  matchesFoodQuery,
} from "@/lib/nutrition";
import { cn } from "@/lib/utils";
import { FoodCategory, FoodDatabaseEntry, NutritionTargetStyle } from "@/types/models";

type NutritionTab = "today" | "targets" | "history";
type ComposerSurface = "search" | "photo" | "scan" | "meal";
type ComposerLibraryTab = "database" | "favorites" | "created";

const moduleTabs: Array<{ value: NutritionTab; label: string }> = [
  { value: "today", label: "Today" },
  { value: "targets", label: "Targets" },
  { value: "history", label: "History" },
];

const categoryLabels: Record<FoodCategory | "all", string> = {
  all: "All",
  common: "Common",
  packaged: "Packaged",
  restaurant: "Restaurant",
  homemade: "Homemade",
  supplements: "Supplements",
  drinks: "Drinks",
};

const toneClasses = {
  mint: "bg-primary/12 text-primary",
  lime: "bg-lime/15 text-lime",
  sky: "bg-sky/15 text-sky",
  sand: "bg-white/5 text-muted-foreground",
};

const targetStyleOptions: Array<{
  value: NutritionTargetStyle;
  label: string;
  description: string;
}> = [
  {
    value: "balanced",
    label: "Balanced",
    description: "Stable daily energy and easier adherence.",
  },
  {
    value: "high-protein",
    label: "High Protein",
    description: "Better support for recovery, strength, and lean-mass goals.",
  },
  {
    value: "low-carb",
    label: "Low Carb",
    description: "Lower carbohydrate ceiling with more emphasis on protein and fats.",
  },
  {
    value: "low-fat",
    label: "Low Fat",
    description: "More room for carbohydrates while fats stay tighter.",
  },
];

const waterQuickAdds = [250, 500, 1000];

function formatLiters(valueMl: number) {
  return `${(valueMl / 1000).toFixed(2)} L`;
}

function HistoryBar({
  label,
  value,
  max,
  active,
}: {
  label: string;
  value: number;
  max: number;
  active?: boolean;
}) {
  return (
    <div className="space-y-3 text-center">
      <div
        className={cn("mx-auto w-full rounded-t-2xl bg-primary/18", active && "bg-lime")}
        style={{ height: `${Math.max((value / max) * 180, 28)}px` }}
      />
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function FoodDatabaseRow({
  food,
  isFavorite,
  selectedMealTitle,
  onAdd,
  onToggleFavorite,
}: {
  food: FoodDatabaseEntry;
  isFavorite: boolean;
  selectedMealTitle: string;
  onAdd: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <div className="grid gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:items-center">
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-[18px] text-lg font-bold uppercase",
          toneClasses[food.tone],
        )}
      >
        {food.name.charAt(0)}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="line-clamp-2 font-semibold">{food.name}</p>
          {food.verified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2 py-1 text-[11px] font-semibold text-primary">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified
            </span>
          ) : null}
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {[food.brand, categoryLabels[food.category], food.servingLabel].filter(Boolean).join(" • ")}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:items-end">
        <div className="text-left sm:text-right">
          <p className="text-sm text-muted-foreground">{food.servingLabel}</p>
          <p className="mt-1 text-lg font-semibold">{food.calories} kcal</p>
        </div>

        <div className="flex items-center gap-2 sm:justify-end">
          <button
            type="button"
            aria-label={
              isFavorite
                ? `Remove ${food.name} from favorites`
                : `Save ${food.name} as favorite`
            }
            className={cn(
              "rounded-full p-2 transition",
              isFavorite ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground",
            )}
            onClick={onToggleFavorite}
          >
            <Star className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </button>
          <Button size="sm" onClick={onAdd} title={`Add ${food.name} to ${selectedMealTitle}`}>
            <Plus className="mr-2 h-4 w-4" />
            Add Food
          </Button>
        </div>
      </div>
    </div>
  );
}

function MealEntryList({
  mealId,
  entries,
  onRemove,
  onDecrease,
  onIncrease,
}: {
  mealId: string;
  entries: ReturnType<typeof useAppState>["nutrition"]["meals"][number]["entries"];
  onRemove: (mealId: string, entryId: string) => void;
  onDecrease: (mealId: string, entryId: string, quantity: number) => void;
  onIncrease: (mealId: string, entryId: string, quantity: number) => void;
}) {
  if (entries.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-muted-foreground">
        No food logged yet for this meal.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => {
        const totalsForEntry = getMealEntryTotals(entry);

        return (
          <div
            key={entry.entryId}
            className="rounded-[22px] border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{entry.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {entry.servingLabel} • {totalsForEntry.calories} kcal
                </p>
              </div>
              <button
                type="button"
                aria-label={`Remove ${entry.name}`}
                className="rounded-full bg-white/5 p-2 text-muted-foreground transition hover:text-foreground"
                onClick={() => onRemove(mealId, entry.entryId)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDecrease(mealId, entry.entryId, entry.quantity)}
              >
                -
              </Button>
              <div className="rounded-full bg-slate-950/60 px-4 py-2 text-sm font-semibold">
                {entry.quantity} serving{entry.quantity > 1 ? "s" : ""}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onIncrease(mealId, entry.entryId, entry.quantity)}
              >
                +
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function NutritionPage() {
  const {
    nutrition,
    addFoodToMeal,
    addWater,
    applyMealTemplate,
    copyYesterdayMeal,
    createCustomFood,
    quickAddCalories,
    recordNutritionSearch,
    removeMealEntry,
    saveMealTemplate,
    toggleFavoriteFood,
    updateMealEntryQuantity,
    updateNutritionTargets,
  } = useAppState();

  const [activeTab, setActiveTab] = useState<NutritionTab>("today");
  const [selectedMealId, setSelectedMealId] = useState(
    nutrition.meals[0]?.id ?? "breakfast",
  );
  const [composerMealId, setComposerMealId] = useState<string | null>(null);
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [composerSurface, setComposerSurface] = useState<ComposerSurface>("search");
  const [composerLibraryTab, setComposerLibraryTab] =
    useState<ComposerLibraryTab>("database");
  const [visibleFoodCount, setVisibleFoodCount] = useState(5);
  const [manualEntry, setManualEntry] = useState({
    name: "Restaurant meal",
    calories: "700",
  });
  const [customFood, setCustomFood] = useState({
    name: "",
    brand: "",
    servingLabel: "1 serving",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });
  const [mealTemplateName, setMealTemplateName] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const createMealCardRef = useRef<HTMLDivElement | null>(null);
  const recentMealsRef = useRef<HTMLDivElement | null>(null);
  const [targetsForm, setTargetsForm] = useState({
    budgetCalories: String(nutrition.budgetCalories),
    protein: String(nutrition.macroTargets.protein),
    carbs: String(nutrition.macroTargets.carbs),
    fats: String(nutrition.macroTargets.fats),
    targetStyle: nutrition.targetStyle,
  });

  useEffect(() => {
    setTargetsForm({
      budgetCalories: String(nutrition.budgetCalories),
      protein: String(nutrition.macroTargets.protein),
      carbs: String(nutrition.macroTargets.carbs),
      fats: String(nutrition.macroTargets.fats),
      targetStyle: nutrition.targetStyle,
    });
  }, [
    nutrition.budgetCalories,
    nutrition.macroTargets.carbs,
    nutrition.macroTargets.fats,
    nutrition.macroTargets.protein,
    nutrition.targetStyle,
  ]);

  const selectedMeal =
    nutrition.meals.find((meal) => meal.id === selectedMealId) ?? nutrition.meals[0];
  const dailySummary = buildDailyNutritionSummary(nutrition);
  const weeklySummary = buildWeeklyNutritionSummary(nutrition);
  const nutritionTotals = getNutritionTotals(nutrition);
  const remainingMacros = getRemainingMacros(nutrition);
  const caloriesRemaining = getCaloriesRemaining(nutrition);
  const favoriteFoods = useMemo(() => getFavoriteFoods(nutrition), [nutrition]);
  const recentFoods = useMemo(() => getRecentFoods(nutrition), [nutrition]);
  const waterProgress = getWaterProgress(nutrition);
  const createdFoods = useMemo(
    () => nutrition.foodCatalog.filter((food) => food.source === "custom"),
    [nutrition.foodCatalog],
  );
  const mealTemplates = useMemo(
    () => nutrition.mealTemplates.filter((template) => template.mealId === selectedMeal.id),
    [nutrition.mealTemplates, selectedMeal.id],
  );
  const yesterdayMeal = useMemo(
    () => nutrition.yesterdayMeals.find((meal) => meal.mealId === selectedMeal.id),
    [nutrition.yesterdayMeals, selectedMeal.id],
  );
  const filteredFoods = useMemo(
    () => nutrition.foodCatalog.filter((food) => matchesFoodQuery(food, searchQuery)),
    [nutrition.foodCatalog, searchQuery],
  );
  const historyMax = Math.max(...nutrition.history.map((day) => day.calories), 1);
  const composerPrompt =
    composerSurface === "photo"
      ? {
          title: "Photo logging is reserved for Plus",
          description: "The capture flow will live here. For now, search or quick add keeps the meal moving.",
        }
      : composerSurface === "scan"
        ? {
            title: "Barcode scan is staged",
            description: "Packaged-food scan will land here. Until then, search by product or brand name.",
          }
        : null;
  const selectedMealTotals = getMealTotals(selectedMeal);
  const libraryFoods = useMemo(() => {
    if (composerLibraryTab === "favorites") {
      return favoriteFoods.filter((food) => matchesFoodQuery(food, searchQuery));
    }

    if (composerLibraryTab === "created") {
      return createdFoods.filter((food) => matchesFoodQuery(food, searchQuery));
    }

    return searchQuery.trim() ? filteredFoods : recentFoods;
  }, [composerLibraryTab, createdFoods, favoriteFoods, filteredFoods, recentFoods, searchQuery]);
  const visibleLibraryFoods = libraryFoods.slice(0, visibleFoodCount);
  const canShowMoreFoods = libraryFoods.length > visibleFoodCount;
  const foodSectionTitle =
    composerLibraryTab === "favorites"
      ? searchQuery.trim()
        ? "Favorite matches"
        : "Favorites"
      : composerLibraryTab === "created"
        ? searchQuery.trim()
          ? "Created matches"
          : "Created foods"
        : searchQuery.trim()
          ? "Matching foods"
          : "Recently entered";

  const heroStatus = useMemo(() => {
    const deficits = [
      { label: "Protein", remaining: remainingMacros.protein },
      { label: "Carbs", remaining: remainingMacros.carbs },
      { label: "Fat", remaining: remainingMacros.fats },
    ].sort((a, b) => b.remaining - a.remaining);

    if (caloriesRemaining === 0 && deficits.every((item) => item.remaining <= 10)) {
      return "Targets closed for today";
    }

    if (deficits[0].remaining > 20) {
      return `${deficits[0].label} still low`;
    }

    if (dailySummary.mealsLogged < 3) {
      return "Still room to complete the day cleanly";
    }

    return "On track";
  }, [caloriesRemaining, dailySummary.mealsLogged, remainingMacros]);

  function openAddFoodPage(mealId: string) {
    setSelectedMealId(mealId);
    setComposerMealId(mealId);
    setSearchQuery("");
    setMealTemplateName("");
    setComposerSurface("search");
    setComposerLibraryTab("database");
    setVisibleFoodCount(5);
  }

  function closeAddFoodPage() {
    setComposerMealId(null);
    setSearchQuery("");
    setComposerSurface("search");
    setComposerLibraryTab("database");
  }

  function handleCreateCustomFood(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!customFood.name.trim() || !customFood.servingLabel.trim()) return;

    createCustomFood({
      name: customFood.name,
      brand: customFood.brand,
      servingLabel: customFood.servingLabel,
      calories: Number(customFood.calories || 0),
      macros: {
        protein: Number(customFood.protein || 0),
        carbs: Number(customFood.carbs || 0),
        fats: Number(customFood.fats || 0),
      },
    });

    setCustomFood({
      name: "",
      brand: "",
      servingLabel: "1 serving",
      calories: "",
      protein: "",
      carbs: "",
      fats: "",
    });
  }

  function handleQuickAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const calories = Number(manualEntry.calories || 0);
    if (!selectedMeal || !manualEntry.name.trim() || calories <= 0) return;

    quickAddCalories(selectedMeal.id, {
      name: manualEntry.name,
      calories,
    });

    setExpandedMealId(selectedMeal.id);
    setManualEntry({ name: "Restaurant meal", calories: "700" });
  }

  function handleCreateMealTemplate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedMeal || selectedMeal.entries.length === 0) return;

    saveMealTemplate(selectedMeal.id, mealTemplateName.trim() || `${selectedMeal.title} Meal`);
    setMealTemplateName("");
  }

  function handleTargetsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateNutritionTargets({
      budgetCalories: Number(targetsForm.budgetCalories || nutrition.budgetCalories),
      macroTargets: {
        protein: Number(targetsForm.protein || nutrition.macroTargets.protein),
        carbs: Number(targetsForm.carbs || nutrition.macroTargets.carbs),
        fats: Number(targetsForm.fats || nutrition.macroTargets.fats),
      },
      targetStyle: targetsForm.targetStyle,
    });
  }

  useEffect(() => {
    if (!composerMealId) return;

    if (composerSurface === "search") {
      searchInputRef.current?.focus();
      return;
    }

    if (composerSurface === "meal") {
      createMealCardRef.current?.scrollIntoView?.({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [composerMealId, composerSurface]);

  useEffect(() => {
    setVisibleFoodCount(5);
  }, [composerLibraryTab, composerMealId, searchQuery]);

  return (
    <PageShell className="space-y-6">
      <section data-reveal className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Fuel center
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Daily fueling
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          See what matters first: calories left, macros left, meals logged, and water.
          Everything else lives one layer deeper.
        </p>
      </section>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as NutritionTab)}>
        <TabsList>
          {moduleTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {composerMealId ? (
            <>
              <div data-reveal className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" onClick={closeAddFoodPage}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to meals
                  </Button>
                </div>
                <div className="rounded-full bg-primary/12 px-4 py-2 text-sm font-semibold text-primary">
                  Adding to {selectedMeal.title}
                </div>
              </div>

              <section data-reveal className="space-y-6">
                <Card className="overflow-hidden rounded-[36px]">
                  <div className="border-b border-white/10 p-6 sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                          {selectedMeal.title}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold">Add foods to this meal</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                          Search first, use favorites when you want speed, and keep recent meals close for repeat logging.
                        </p>
                      </div>

                      <div className="rounded-[26px] border border-white/10 bg-white/5 px-5 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                          Current meal
                        </p>
                        <p className="mt-2 text-2xl font-bold">{selectedMealTotals.calories} kcal</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {selectedMeal.entries.length} logged item{selectedMeal.entries.length === 1 ? "" : "s"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_72px]">
                      <div className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          aria-label="Search foods"
                          className="h-14 rounded-[22px] border-white/10 bg-white/5 pl-11"
                          ref={searchInputRef}
                          placeholder="Search foods"
                          value={searchQuery}
                          onChange={(event) => {
                            setSearchQuery(event.target.value);
                            recordNutritionSearch(event.target.value);
                          }}
                        />
                      </div>
                      <Button
                        variant="outline"
                        type="button"
                        className="h-14 rounded-[22px] px-0"
                        aria-label="Open scan tools"
                        onClick={() => setComposerSurface("scan")}
                      >
                        <Barcode className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 border-b border-white/10 pb-1">
                      {[
                        { value: "database" as const, label: "Database", icon: Search },
                        { value: "favorites" as const, label: "Favorites", icon: Star },
                        { value: "created" as const, label: "Created", icon: Save },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const active = composerLibraryTab === tab.value;

                        return (
                          <button
                            key={tab.value}
                            type="button"
                            onClick={() => setComposerLibraryTab(tab.value)}
                            className={cn(
                              "inline-flex items-center gap-2 border-b-2 px-1 pb-4 text-sm font-semibold transition",
                              active
                                ? "border-primary text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <Icon className={cn("h-4 w-4", active && tab.value === "favorites" && "fill-current")} />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-10 p-6 sm:p-8">
                    {composerPrompt ? (
                      <div className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4">
                        <p className="font-semibold text-foreground">{composerPrompt.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {composerPrompt.description}
                        </p>
                      </div>
                    ) : null}

                    <section className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                            Current {selectedMeal.title.toLowerCase()}
                          </p>
                          <h3 className="mt-2 text-2xl font-bold">Logged foods</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedMealTotals.calories} kcal
                        </p>
                      </div>
                      <MealEntryList
                        mealId={selectedMeal.id}
                        entries={selectedMeal.entries}
                        onRemove={removeMealEntry}
                        onDecrease={(mealId, entryId, quantity) =>
                          updateMealEntryQuantity(mealId, entryId, Math.max(quantity - 1, 1))
                        }
                        onIncrease={(mealId, entryId, quantity) =>
                          updateMealEntryQuantity(mealId, entryId, quantity + 1)
                        }
                      />
                    </section>

                    <section className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                            {composerLibraryTab === "database"
                              ? "Food list"
                              : composerLibraryTab === "favorites"
                                ? "Saved shortcuts"
                                : "Custom entries"}
                          </p>
                          <h3 className="mt-2 text-2xl font-bold">{foodSectionTitle}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {libraryFoods.length} result{libraryFoods.length === 1 ? "" : "s"}
                        </p>
                      </div>

                      {visibleLibraryFoods.length > 0 ? (
                        <div className="space-y-3">
                          {visibleLibraryFoods.map((food) => (
                            <FoodDatabaseRow
                              key={food.id}
                              food={food}
                              isFavorite={nutrition.favoriteFoodIds.includes(food.id)}
                              selectedMealTitle={selectedMeal.title}
                              onAdd={() =>
                                addFoodToMeal(selectedMeal.id, food.id, {
                                  quantity: 1,
                                  searchQuery,
                                })
                              }
                              onToggleFavorite={() => toggleFavoriteFood(food.id)}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-[24px] border border-dashed border-white/10 bg-white/5 px-5 py-8 text-sm text-muted-foreground">
                          {composerLibraryTab === "favorites"
                            ? "Favorite foods will show up here once you save them."
                            : composerLibraryTab === "created"
                              ? "Custom foods will show up here after you create them."
                              : "No foods match this search yet."}
                        </div>
                      )}

                      {canShowMoreFoods ? (
                        <Button
                          type="button"
                          variant="ghost"
                          className="px-0 text-muted-foreground"
                          onClick={() => setVisibleFoodCount((previous) => previous + 5)}
                        >
                          Show more
                        </Button>
                      ) : null}
                    </section>

                    <section ref={recentMealsRef} className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                            Reuse meals
                          </p>
                          <h3 className="mt-2 text-2xl font-bold">Recent meals</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Faster repeat logging
                        </p>
                      </div>

                      <div className="space-y-3">
                        {yesterdayMeal ? (
                          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <p className="font-semibold">Yesterday&apos;s {selectedMeal.title}</p>
                              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                Copy the same meal into today.
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyYesterdayMeal(selectedMeal.id)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Copy yesterday
                            </Button>
                          </div>
                        ) : null}

                        {mealTemplates.length > 0 ? (
                          mealTemplates.map((template) => (
                            <div
                              key={template.id}
                              className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div className="min-w-0">
                                <p className="font-semibold">{template.name}</p>
                                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                  {template.items.length} saved item{template.items.length === 1 ? "" : "s"}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => applyMealTemplate(selectedMeal.id, template.id)}
                              >
                                Apply
                              </Button>
                            </div>
                          ))
                        ) : !yesterdayMeal ? (
                          <div className="rounded-[24px] border border-dashed border-white/10 bg-white/5 px-5 py-8 text-sm text-muted-foreground">
                            Save meals as templates to reuse them here.
                          </div>
                        ) : null}
                      </div>
                    </section>

                    <section className="grid gap-6 xl:grid-cols-2">
                      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                          Quick add
                        </p>
                        <form className="mt-5 space-y-4" onSubmit={handleQuickAdd}>
                          <Input
                            aria-label="Quick add name"
                            value={manualEntry.name}
                            onChange={(event) =>
                              setManualEntry((previous) => ({
                                ...previous,
                                name: event.target.value,
                              }))
                            }
                          />
                          <Input
                            aria-label="Quick add calories"
                            type="number"
                            value={manualEntry.calories}
                            onChange={(event) =>
                              setManualEntry((previous) => ({
                                ...previous,
                                calories: event.target.value,
                              }))
                            }
                          />
                          <Button className="w-full" type="submit">
                            Add manual calories
                          </Button>
                        </form>
                      </div>

                      <div
                        ref={createMealCardRef}
                        className={cn(
                          "rounded-[28px] border border-white/10 bg-white/[0.04] p-6",
                          composerSurface === "meal" && "border-lime/35 bg-lime/10",
                        )}
                      >
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                          Create meal
                        </p>
                        <form className="mt-5 space-y-4" onSubmit={handleCreateMealTemplate}>
                          <Input
                            aria-label="Meal Template Name"
                            placeholder="Meal name"
                            value={mealTemplateName}
                            onChange={(event) => setMealTemplateName(event.target.value)}
                          />
                          <Button
                            className="w-full"
                            type="submit"
                            disabled={selectedMeal.entries.length === 0}
                          >
                            Save current meal
                          </Button>
                        </form>
                      </div>
                    </section>

                    {composerLibraryTab === "created" ? (
                      <section className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                            Build your own entry
                          </p>
                          <h3 className="mt-2 text-2xl font-bold">Create food</h3>
                        </div>

                        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                          <form className="space-y-4" onSubmit={handleCreateCustomFood}>
                            <Input
                              aria-label="Custom Food Name"
                              placeholder="Custom Food Name"
                              value={customFood.name}
                              onChange={(event) =>
                                setCustomFood((previous) => ({
                                  ...previous,
                                  name: event.target.value,
                                }))
                              }
                            />
                            <Input
                              aria-label="Brand"
                              placeholder="Brand"
                              value={customFood.brand}
                              onChange={(event) =>
                                setCustomFood((previous) => ({
                                  ...previous,
                                  brand: event.target.value,
                                }))
                              }
                            />
                            <Input
                              aria-label="Serving Label"
                              placeholder="Serving Label"
                              value={customFood.servingLabel}
                              onChange={(event) =>
                                setCustomFood((previous) => ({
                                  ...previous,
                                  servingLabel: event.target.value,
                                }))
                              }
                            />
                            <div className="grid gap-3 sm:grid-cols-2">
                              <Input
                                aria-label="Custom Food Calories"
                                placeholder="Calories"
                                type="number"
                                value={customFood.calories}
                                onChange={(event) =>
                                  setCustomFood((previous) => ({
                                    ...previous,
                                    calories: event.target.value,
                                  }))
                                }
                              />
                              <Input
                                aria-label="Custom Food Protein"
                                placeholder="Protein"
                                type="number"
                                value={customFood.protein}
                                onChange={(event) =>
                                  setCustomFood((previous) => ({
                                    ...previous,
                                    protein: event.target.value,
                                  }))
                                }
                              />
                              <Input
                                aria-label="Custom Food Carbs"
                                placeholder="Carbs"
                                type="number"
                                value={customFood.carbs}
                                onChange={(event) =>
                                  setCustomFood((previous) => ({
                                    ...previous,
                                    carbs: event.target.value,
                                  }))
                                }
                              />
                              <Input
                                aria-label="Custom Food Fats"
                                placeholder="Fats"
                                type="number"
                                value={customFood.fats}
                                onChange={(event) =>
                                  setCustomFood((previous) => ({
                                    ...previous,
                                    fats: event.target.value,
                                  }))
                                }
                              />
                            </div>
                            <Button className="w-full" type="submit">
                              Save custom food
                            </Button>
                          </form>
                        </div>
                      </section>
                    ) : null}
                  </div>
                </Card>

                <div data-reveal className="sticky bottom-4 z-20">
                  <div className="mx-auto max-w-4xl rounded-[30px] border border-white/10 bg-slate-950/88 p-3 shadow-float backdrop-blur">
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        {
                          label: "Search",
                          icon: Search,
                          active: composerSurface === "search",
                          onClick: () => {
                            setComposerSurface("search");
                            setComposerLibraryTab("database");
                          },
                        },
                        {
                          label: "Recent",
                          icon: History,
                          active: false,
                          onClick: () =>
                            recentMealsRef.current?.scrollIntoView?.({
                              behavior: "smooth",
                              block: "start",
                            }),
                        },
                        {
                          label: "Create",
                          icon: Save,
                          active: composerSurface === "meal",
                          onClick: () => setComposerSurface("meal"),
                        },
                        {
                          label: "Scan",
                          icon: Barcode,
                          active: composerSurface === "scan",
                          onClick: () => setComposerSurface("scan"),
                        },
                        {
                          label: "Photo",
                          icon: Camera,
                          active: composerSurface === "photo",
                          onClick: () => setComposerSurface("photo"),
                        },
                      ].map((action) => {
                        const Icon = action.icon;

                        return (
                          <button
                            key={action.label}
                            type="button"
                            aria-pressed={action.active}
                            onClick={action.onClick}
                            className={cn(
                              "flex min-w-0 flex-col items-center gap-2 rounded-[22px] px-2 py-3 text-xs font-semibold transition",
                              action.active
                                ? "bg-primary text-primary-foreground shadow-glow"
                                : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            {action.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <Card data-reveal className="rounded-[34px] p-8">
                <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr] xl:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Today
                    </p>
                    <p className="mt-4 text-7xl font-extrabold tracking-tight text-primary">
                      {caloriesRemaining}
                    </p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      kcal left
                    </p>
                    <p className="mt-6 text-base text-foreground">{heroStatus}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        label: "Protein",
                        remaining: remainingMacros.protein,
                        current: nutritionTotals.macros.protein,
                        target: nutrition.macroTargets.protein,
                        indicatorClassName: "bg-primary",
                      },
                      {
                        label: "Carbs",
                        remaining: remainingMacros.carbs,
                        current: nutritionTotals.macros.carbs,
                        target: nutrition.macroTargets.carbs,
                        indicatorClassName: "bg-lime",
                      },
                      {
                        label: "Fat",
                        remaining: remainingMacros.fats,
                        current: nutritionTotals.macros.fats,
                        target: nutrition.macroTargets.fats,
                        indicatorClassName: "bg-sky",
                      },
                    ].map((macro) => (
                      <div key={macro.label} className="rounded-[24px] bg-white/5 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          {macro.label}
                        </p>
                        <p className="mt-3 text-3xl font-bold">{macro.remaining}g</p>
                        <p className="mt-1 text-sm text-muted-foreground">left today</p>
                        <Progress
                          value={(macro.current / macro.target) * 100}
                          className="mt-4"
                          indicatorClassName={macro.indicatorClassName}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <section data-reveal className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Meals
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">Today&apos;s logging</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {dailySummary.mealsLogged}/4 meals logged
                  </p>
                </div>

                {nutrition.meals.map((meal) => {
                  const totals = getMealTotals(meal);
                  const preview = meal.entries
                    .slice(0, 2)
                    .map((entry) => entry.name)
                    .join(" • ");
                  const isExpanded = expandedMealId === meal.id;
                  const templatesForMeal = nutrition.mealTemplates.filter(
                    (template) => template.mealId === meal.id,
                  );

                  return (
                    <Card key={meal.id} className="rounded-[28px] p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold">{meal.title}</h3>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                              {totals.calories} kcal
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {meal.entries.length > 0 ? preview : "No foods logged yet"}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Button size="sm" onClick={() => openAddFoodPage(meal.id)}>
                            + Add to {meal.title}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            aria-expanded={isExpanded}
                            onClick={() =>
                              setExpandedMealId((previous) =>
                                previous === meal.id ? null : meal.id,
                              )
                            }
                          >
                            {isExpanded ? (
                              <>
                                Hide
                                <ChevronUp className="ml-2 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                Details
                                <ChevronDown className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {isExpanded ? (
                        <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => saveMealTemplate(meal.id)}
                              disabled={meal.entries.length === 0}
                            >
                              <Save className="mr-2 h-4 w-4" />
                              Save template
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyYesterdayMeal(meal.id)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Copy yesterday
                            </Button>
                          </div>

                          <MealEntryList
                            mealId={meal.id}
                            entries={meal.entries}
                            onRemove={removeMealEntry}
                            onDecrease={(mealId, entryId, quantity) =>
                              updateMealEntryQuantity(mealId, entryId, Math.max(quantity - 1, 1))
                            }
                            onIncrease={(mealId, entryId, quantity) =>
                              updateMealEntryQuantity(mealId, entryId, quantity + 1)
                            }
                          />

                          {templatesForMeal.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {templatesForMeal.map((template) => (
                                <Button
                                  key={template.id}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => applyMealTemplate(meal.id, template.id)}
                                >
                                  {template.name}
                                </Button>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </Card>
                  );
                })}
              </section>

              <Card data-reveal className="rounded-[28px] p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Water
                    </p>
                    <h2 className="mt-2 text-3xl font-bold">
                      {formatLiters(nutrition.water.consumedMl)}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      of {formatLiters(nutrition.water.goalMl)} goal
                    </p>
                  </div>

                  <div className="min-w-0 flex-1">
                    <Progress
                      value={waterProgress}
                      className="h-3"
                      indicatorClassName="bg-sky"
                    />
                    <div className="mt-4 flex flex-wrap gap-3">
                      {waterQuickAdds.map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => addWater(amount)}
                        >
                          +{amount >= 1000 ? "1 L" : `${amount} ml`}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-white/5 p-4">
                    <Droplets className="h-5 w-5 text-sky" />
                    <p className="mt-3 text-sm text-muted-foreground">
                      Hydration is simple, but it matters.
                    </p>
                  </div>
                </div>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="targets" className="space-y-6">
          <Card data-reveal className="rounded-[32px] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Nutrition targets
            </p>
            <h2 className="mt-3 text-2xl font-bold">Adjust the framework</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
              Targets stay off the main screen so the daily view can stay calm and easy
              to scan.
            </p>
            <form className="mt-8 space-y-6" onSubmit={handleTargetsSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="budget-calories"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Daily calories
                  </label>
                  <Input
                    id="budget-calories"
                    type="number"
                    value={targetsForm.budgetCalories}
                    onChange={(event) =>
                      setTargetsForm((previous) => ({
                        ...previous,
                        budgetCalories: event.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="target-style"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Target style
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {targetStyleOptions.map((option) => (
                      <button
                        key={option.value}
                        id="target-style"
                        type="button"
                        onClick={() =>
                          setTargetsForm((previous) => ({
                            ...previous,
                            targetStyle: option.value,
                          }))
                        }
                        className={cn(
                          "rounded-[20px] border px-4 py-4 text-left",
                          targetsForm.targetStyle === option.value
                            ? "border-primary bg-primary/12"
                            : "border-white/10 bg-white/5",
                        )}
                      >
                        <p className="font-semibold">{option.label}</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {option.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Protein", "protein"],
                  ["Carbs", "carbs"],
                  ["Fats", "fats"],
                ].map(([label, key]) => (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="mb-2 block text-sm font-semibold text-foreground"
                    >
                      {label}
                    </label>
                    <Input
                      id={key}
                      type="number"
                      value={targetsForm[key as "protein" | "carbs" | "fats"]}
                      onChange={(event) =>
                        setTargetsForm((previous) => ({
                          ...previous,
                          [key]: event.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>

              <Button type="submit">Save targets</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <Card data-reveal className="rounded-[32px] p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Weekly history
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">Review consistency later</h2>
                </div>
                <div className="rounded-2xl bg-primary/12 px-3 py-2 text-sm font-semibold text-primary">
                  {weeklySummary.adherenceRate}% adherence
                </div>
              </div>
              <div className="mt-8 grid grid-cols-7 items-end gap-3">
                {nutrition.history.map((day, index) => (
                  <HistoryBar
                    key={day.id}
                    label={day.label}
                    value={day.calories}
                    max={historyMax}
                    active={index === nutrition.history.length - 2}
                  />
                ))}
              </div>
            </Card>

            <Card data-reveal className="rounded-[32px] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Summary
              </p>
              <div className="mt-6 space-y-4">
                {[
                  ["Average calories", `${weeklySummary.averageCalories} kcal`],
                  ["Average protein", `${weeklySummary.averageProtein} g`],
                  ["Days within target", `${weeklySummary.daysWithinTarget}/7`],
                  ["Best streak", `${weeklySummary.bestStreak} days`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[24px] bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-3 text-2xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
