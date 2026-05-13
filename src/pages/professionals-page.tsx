import { ArrowUpRight, HeartPulse, ShieldCheck, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { useSession } from "@/context/session-context";

const professionals = [
  {
    name: "Strength Performance Coach",
    specialty: "Gym / strength athletes",
    summary: "Programming reviews, movement strategy, and progression planning.",
  },
  {
    name: "Sport Nutrition Specialist",
    specialty: "Body-composition and fueling support",
    summary: "Fuel timing, macro structure, and competition-week adjustments.",
  },
  {
    name: "Racquet Sport Specialist",
    specialty: "Tennis and padel performance",
    summary: "Court-load planning, match preparation, and rotational power support.",
  },
  {
    name: "Field and Court Performance Specialist",
    specialty: "Soccer and basketball",
    summary: "Conditioning, sprint support, and game-week planning.",
  },
];

export function ProfessionalsPage() {
  const {
    session: { user },
  } = useSession();

  return (
    <PageShell className="space-y-6">
      <Card data-reveal className="rounded-[34px] bg-gradient-to-r from-slate-950 to-primary/10 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Professionals
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">
          Specialist support when the user wants the next level.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          This future-facing section makes the Pro tier feel concrete: access to
          sport-specific professionals who understand what the user is trying to build.
        </p>
      </Card>

      <Card data-reveal className="rounded-[32px] p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Current access
            </p>
            <h2 className="mt-2 text-2xl font-bold capitalize">{user.membership}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              {user.membership === "pro"
                ? "Professional access is active. Users in Pro see relevant specialists based on their sports."
                : "Professional access is positioned as the elite support layer for ambitious users who want more than AI guidance."}
            </p>
          </div>
          <Button variant={user.membership === "pro" ? "outline" : "default"}>
            {user.membership === "pro" ? "Book a consult" : "Upgrade to Pro"}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        {professionals.map((professional) => (
          <Card key={professional.name} data-reveal className="rounded-[32px] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                  {professional.specialty}
                </p>
                <h2 className="mt-2 text-2xl font-bold">{professional.name}</h2>
              </div>
              <div className="rounded-2xl bg-primary/12 p-3 text-primary">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {professional.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {["Performance review", "Messaging", "Session notes"].map((tag) => (
                <div
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {tag}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Pro positioning",
            value: "Aspirational, premium, and sport-specific",
            icon: ShieldCheck,
          },
          {
            label: "User feeling",
            value: "Capable, supported, and taken seriously",
            icon: HeartPulse,
          },
          {
            label: "Business signal",
            value: "Clear path from Free to Plus to Pro",
            icon: Users,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label} data-reveal className="rounded-[28px] p-6">
              <Icon className="h-5 w-5 text-primary" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-3 text-lg font-semibold leading-7">{item.value}</p>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
