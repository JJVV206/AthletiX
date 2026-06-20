import {
  Apple,
  Dumbbell,
  Gauge,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export function DevicePreview() {
  return (
    <div className="relative mx-auto max-w-[420px]">
      <div className="halo -left-20 -top-10" />
      <div className="halo -bottom-10 -right-16" />
      <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-slate-950 p-4 shadow-float">
        <div className="absolute inset-x-5 top-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
          <span>Performance center</span>
          <span>Today</span>
        </div>
        <div className="performance-grid rounded-[30px] bg-gradient-to-b from-slate-950 to-slate-900 px-5 pb-5 pt-12">
          <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
            <Card className="rounded-[26px] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Fuel balance
                </span>
                <Apple className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-5 text-4xl font-extrabold tracking-tight">1,140</p>
              <p className="mt-2 text-sm text-muted-foreground">kcal available</p>
              <div className="mt-5 h-2 rounded-full bg-muted">
                <div className="h-full w-3/4 rounded-full bg-primary" />
              </div>
            </Card>
            <div className="space-y-4">
              <Card className="rounded-[26px] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Readiness
                  </span>
                  <Gauge className="h-4 w-4 text-lime" />
                </div>
                <p className="mt-5 text-3xl font-extrabold tracking-tight">91</p>
                <p className="text-sm text-muted-foreground">Performance score</p>
              </Card>
              <Card className="rounded-[26px] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Sport mode
                  </span>
                  <Trophy className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-4 text-2xl font-extrabold tracking-tight">Padel + Strength</p>
                <p className="text-sm text-primary">Modules unlocked</p>
              </Card>
            </div>
          </div>
          <Card className="mt-4 rounded-[28px] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI performance cue
                </p>
                <h3 className="mt-4 text-2xl font-bold">Upper power + court transfer</h3>
                <p className="mt-1 text-sm text-muted-foreground">Start at 5:30 PM • 54 min</p>
              </div>
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Dumbbell className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-6 items-end gap-2">
              {[32, 44, 40, 60, 58, 76].map((height, index) => (
                <div
                  key={height}
                  className={`rounded-t-xl ${
                    index === 4 ? "bg-primary" : "bg-primary/20"
                  }`}
                  style={{ height }}
                />
              ))}
            </div>
          </Card>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Card className="rounded-[24px] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Focus block
                </span>
                <Target className="h-4 w-4 text-sky" />
              </div>
              <p className="mt-3 text-lg font-bold">Protein pace</p>
              <p className="mt-1 text-sm text-muted-foreground">136 / 180 g</p>
            </Card>
            <Card className="rounded-[24px] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Match prep
                </span>
                <Trophy className="h-4 w-4 text-lime" />
              </div>
              <p className="mt-3 text-lg font-bold">Acceleration set</p>
              <p className="mt-1 text-sm text-muted-foreground">Tomorrow • 6 reps</p>
            </Card>
          </div>
        </div>
      </div>
      <Card className="absolute -bottom-8 left-0 rounded-[24px] px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-lime text-sm font-bold text-primary">
            92
          </div>
          <div>
            <p className="font-semibold">Performance Score</p>
            <p className="text-sm text-primary">+4.2% from last review</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
