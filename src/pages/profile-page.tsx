import { LogOut, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "@/components/page-shell";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppState } from "@/context/app-state-context";
import {
  performanceFocusLabels,
  sportLabels,
  supportModeLabels,
  trainingLevelLabels,
} from "@/data/mock-data";
import { useSession } from "@/context/session-context";

export function ProfilePage() {
  const navigate = useNavigate();
  const { nutrition } = useAppState();
  const { session, signOut } = useSession();

  return (
    <PageShell className="space-y-6">
      <Card data-reveal className="rounded-[34px] bg-gradient-to-r from-slate-950 to-primary/10 p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <Avatar name={session.user.name} className="h-20 w-20 text-lg" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Athlete profile
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight">{session.user.name}</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                {session.user.title}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              signOut();
              navigate("/auth");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card data-reveal className="rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Performance setup
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Plan", session.user.membership.toUpperCase()],
              ["Support", supportModeLabels[session.user.supportMode]],
              ["Training level", trainingLevelLabels[session.user.trainingLevel]],
              ["Focus", performanceFocusLabels[session.user.performanceFocus]],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[24px] bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-3 font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {session.user.sports.map((sport) => (
              <div
                key={sport}
                className="rounded-full border border-white/10 bg-primary/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
              >
                {sportLabels[sport]}
              </div>
            ))}
          </div>
        </Card>

        <Card data-reveal className="rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Nutrition targets
          </p>
          <div className="mt-5 space-y-5">
            {[
              ["Protein", nutrition.macroTargets.protein, "#00d1b2"],
              ["Carbs", nutrition.macroTargets.carbs, "#b8f64d"],
              ["Fats", nutrition.macroTargets.fats, "#44e0ff"],
            ].map(([label, value, color]) => (
              <div key={String(label)}>
                <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                  <span>{label}</span>
                  <span className="text-muted-foreground">{value} g</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "100%", background: String(color) }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[24px] bg-white/5 p-5 text-sm text-muted-foreground">
            Your nutrition targets can be refined in the Fuel Center based on phase,
            body goals, and weekly workload.
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card data-reveal className="rounded-[32px] p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Body targets
            </p>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <Trophy className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-5 text-4xl font-bold tracking-tight">
            {session.user.currentWeightKg} kg
          </p>
          <p className="mt-2 text-muted-foreground">
            Current weight • {session.user.targetWeightKg} kg target
          </p>
          <p className="mt-5 text-3xl font-bold">{session.user.bodyFatPercent}%</p>
          <p className="mt-2 text-muted-foreground">Current body-fat estimate</p>
        </Card>

        <Card data-reveal className="rounded-[32px] p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Weekly structure
            </p>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-5 text-4xl font-bold tracking-tight">
            {session.user.weeklyTrainingDays} days
          </p>
          <p className="mt-2 text-muted-foreground">Planned training frequency</p>
          <p className="mt-5 text-3xl font-bold">{session.user.hydrationGoalLiters.toFixed(1)} L</p>
          <p className="mt-2 text-muted-foreground">Daily hydration goal</p>
        </Card>

        <Card data-reveal className="rounded-[32px] p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Premium layer
            </p>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-5 text-4xl font-bold tracking-tight capitalize">
            {session.user.membership}
          </p>
          <p className="mt-2 text-muted-foreground">
            {session.user.membership === "pro"
              ? "Professional access is enabled across your performance stack."
              : session.user.membership === "plus"
                ? "AI recommendations are active across nutrition and training."
                : "Upgrade to Plus or Pro when you want additional guidance."}
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
