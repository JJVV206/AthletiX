import { ArrowUpRight, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { sportCards, sportLabels } from "@/data/mock-data";
import { useSession } from "@/context/session-context";

const sportDashboards = {
  strength: [
    "PR watchlist and force-output checkpoints",
    "Weekly training volume and muscle-group balance",
    "Block planning for strength and hypertrophy phases",
  ],
  tennis: [
    "Court-session tracking and technical work blocks",
    "Match-week readiness and recovery cues",
    "Conditioning and lower-body load management",
  ],
  padel: [
    "Match sessions, drill sessions, and tournament notes",
    "Rotational power and repeated-effort conditioning",
    "Workload visibility for high-frequency play",
  ],
  soccer: [
    "Sprint work, conditioning, and match-load monitoring",
    "Session notes and readiness markers",
    "Training-week structure around game day",
  ],
  basketball: [
    "Skill sessions, conditioning, and jump prep tracking",
    "Practice-to-game rhythm and session planning",
    "Performance dashboards for explosive output",
  ],
};

export function SportsPage() {
  const {
    session: { user },
  } = useSession();

  return (
    <PageShell className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-2">
        {user.sports.map((sport) => (
          <Card key={sport} data-reveal className="rounded-[32px] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                  Active module
                </p>
                <h2 className="mt-2 text-3xl font-bold">{sportLabels[sport]}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Designed to make the product feel relevant to your discipline, not
                  like a generic fitness dashboard.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/12 p-3 text-primary">
                <Trophy className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {sportDashboards[sport].map((module) => (
                <div
                  key={module}
                  className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-muted-foreground"
                >
                  {module}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </section>

      <Card data-reveal className="rounded-[32px] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Supported disciplines
            </p>
            <h2 className="mt-2 text-2xl font-bold">Multi-sport product foundation</h2>
          </div>
          <Button variant="ghost">
            Product roadmap
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {sportCards.map((sport) => (
            <div
              key={sport.value}
              className="rounded-[24px] border border-white/10 bg-white/5 p-5"
            >
              <p className="font-semibold">{sport.title}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {sport.description}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
