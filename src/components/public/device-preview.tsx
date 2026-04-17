import { Activity, Flame, Footprints, Gauge, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export function DevicePreview() {
  return (
    <div className="relative mx-auto max-w-[420px]">
      <div className="halo -left-20 -top-10" />
      <div className="halo -bottom-10 -right-16" />
      <div className="relative overflow-hidden rounded-[38px] border border-white/80 bg-white p-4 shadow-float">
        <div className="absolute inset-x-5 top-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
          <span>Vitality hub</span>
          <span>Today</span>
        </div>
        <div className="rounded-[30px] bg-aurora px-5 pb-5 pt-12">
          <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
            <Card className="rounded-[26px] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Daily steps
                </span>
                <Footprints className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-5 text-4xl font-extrabold tracking-tight">12,482</p>
              <div className="mt-5 h-2 rounded-full bg-muted">
                <div className="h-full w-2/3 rounded-full bg-primary" />
              </div>
            </Card>
            <div className="space-y-4">
              <Card className="rounded-[26px] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Caloric balance
                  </span>
                  <Flame className="h-4 w-4 text-lime" />
                </div>
                <p className="mt-5 text-3xl font-extrabold tracking-tight">1,840</p>
                <p className="text-sm text-muted-foreground">7.2 kcal/min avg</p>
              </Card>
              <Card className="rounded-[26px] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Score
                  </span>
                  <Gauge className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-4 text-3xl font-extrabold tracking-tight">92</p>
                <p className="text-sm text-primary">+4.2% this week</p>
              </Card>
            </div>
          </div>
          <Card className="mt-4 rounded-[28px] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Recommended
                </p>
                <h3 className="mt-4 text-2xl font-bold">HIIT Morning Session</h3>
                <p className="mt-1 text-sm text-muted-foreground">Completed • 45 mins</p>
              </div>
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Activity className="h-6 w-6" />
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
        </div>
      </div>
      <Card className="absolute -bottom-8 left-0 rounded-[24px] px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-lime text-sm font-bold text-primary">
            92
          </div>
          <div>
            <p className="font-semibold">Vitality Score</p>
            <p className="text-sm text-primary">+4.2% from last week</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
