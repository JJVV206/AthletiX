import {
  Bell,
  ChevronRight,
  LogOut,
  Shield,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "@/components/page-shell";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppState } from "@/context/app-state-context";
import { useSession } from "@/context/session-context";

const settingsRows = [
  { title: "Profile info", icon: SlidersHorizontal },
  { title: "Goals & Targets", icon: ChevronRight },
  { title: "Notifications", icon: Bell },
  { title: "Privacy & Security", icon: Shield },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const { nutrition } = useAppState();
  const { session, signOut } = useSession();

  return (
    <PageShell className="space-y-6">
      <Card data-reveal className="rounded-[34px] p-8 text-center">
        <Avatar name={session.user.name} className="mx-auto h-20 w-20 text-lg" />
        <h1 className="mt-5 text-4xl font-bold tracking-tight">{session.user.name}</h1>
        <p className="mt-3 max-w-xl mx-auto text-base leading-7 text-muted-foreground">
          {session.user.title}
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            signOut();
            navigate("/auth");
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card data-reveal className="rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Account settings
          </p>
          <div className="mt-5 space-y-3">
            {settingsRows.map((row) => {
              const Icon = row.icon;
              return (
                <button
                  key={row.title}
                  type="button"
                  className="flex w-full items-center justify-between rounded-[22px] bg-muted/70 px-4 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{row.title}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </Card>

        <Card data-reveal className="rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Daily macro targets
          </p>
          <div className="mt-5 space-y-5">
            {[
              ["Protein", nutrition.macroTargets.protein, "#118f64"],
              ["Carbs", nutrition.macroTargets.carbs, "#b8f64d"],
              ["Fats", nutrition.macroTargets.fats, "#c7d7ff"],
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
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card data-reveal className="rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Personal information
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Full Name", session.user.name],
              ["Email", session.user.email],
              ["Focus", session.user.focus.replace("-", " ")],
              ["Hydration goal", `${session.user.hydrationLiters.toFixed(1)} L/day`],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-[24px] bg-muted/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-3 font-semibold capitalize">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card data-reveal className="rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Current vs target
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Body Weight", `${session.user.currentWeightKg} kg`, `${session.user.targetWeightKg} kg target`],
              ["Body Fat", `${session.user.bodyFatPercent}%`, "14% target"],
            ].map(([label, current, target]) => (
              <div key={String(label)} className="rounded-[24px] bg-muted/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-4 text-4xl font-bold tracking-tight">{current}</p>
                <p className="mt-2 text-sm text-primary">{target}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="secondary" size="sm">
              Metric
            </Button>
            <Button variant="ghost" size="sm">
              Imperial
            </Button>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
