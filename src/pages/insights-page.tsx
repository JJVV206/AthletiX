import { Brain, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { supportModeLabels } from "@/data/mock-data";
import { useSession } from "@/context/session-context";

const tierCards = [
  {
    name: "Free",
    description: "Core tracking for nutrition, training, and progress.",
    perks: ["Food logging", "Workout tracking", "Basic sport dashboard"],
  },
  {
    name: "Plus",
    description: "AI-powered guidance for sharper execution and weekly review.",
    perks: ["AI recommendations", "Recovery prompts", "Advanced trend insights"],
  },
  {
    name: "Pro",
    description: "Human expertise for users who want elite-level support.",
    perks: ["Sport-specific professionals", "Priority support", "Higher-touch planning"],
  },
];

export function InsightsPage() {
  const {
    session: { user },
  } = useSession();

  return (
    <PageShell className="space-y-6">
      <Card data-reveal className="rounded-[34px] bg-gradient-to-r from-slate-950 to-primary/10 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Guidance
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">
          Premium intelligence, not generic tips.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          The guidance layer is where AthletiX becomes more than tracking: AI in Plus,
          professional support in Pro, and a clear value ladder that makes paying feel
          natural.
        </p>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card data-reveal className="rounded-[32px] p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Active support
              </p>
              <h2 className="mt-2 text-2xl font-bold">{supportModeLabels[user.supportMode]}</h2>
            </div>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {[
              "Protein pacing is strongest when lunch includes a deliberate recovery meal.",
              "Your best output clusters after higher hydration and more consistent sleep timing.",
              "Weekly performance is trending upward because nutrition and training are aligned.",
            ].map((insight) => (
              <div
                key={insight}
                className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-muted-foreground"
              >
                {insight}
              </div>
            ))}
          </div>
        </Card>

        <Card data-reveal className="rounded-[32px] p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Why users upgrade
              </p>
              <h2 className="mt-2 text-2xl font-bold">More clarity, less guessing</h2>
            </div>
            <div className="rounded-2xl bg-primary/12 p-3 text-primary">
              <Brain className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Sparkles,
                label: "AI weekly reviews",
              },
              {
                icon: Brain,
                label: "Adaptive recommendations",
              },
              {
                icon: Users,
                label: "Human specialists",
              },
              {
                icon: ShieldCheck,
                label: "Premium accountability",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-[24px] bg-white/5 p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="mt-4 font-semibold">{item.label}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {tierCards.map((tier) => (
          <Card key={tier.name} data-reveal className="rounded-[32px] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {tier.name}
            </p>
            <p className="mt-4 text-xl font-semibold leading-8 text-muted-foreground">
              {tier.description}
            </p>
            <div className="mt-8 space-y-3">
              {tier.perks.map((perk) => (
                <div
                  key={perk}
                  className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted-foreground"
                >
                  {perk}
                </div>
              ))}
            </div>
            <Button className="mt-8 w-full" variant={tier.name === "Plus" ? "default" : "outline"}>
              {tier.name === "Free" ? "Included" : `Upgrade to ${tier.name}`}
            </Button>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
