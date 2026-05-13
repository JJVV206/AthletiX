import {
  Apple,
  ArrowRight,
  Brain,
  CheckCircle2,
  Dumbbell,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import { DevicePreview } from "@/components/public/device-preview";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sportCards } from "@/data/mock-data";

const pillars = [
  {
    title: "Fuel management",
    description:
      "Track calories, macros, hydration, and food patterns with the speed serious athletes expect.",
    icon: Apple,
  },
  {
    title: "Training system",
    description:
      "Organize routines, log sessions, and track progression with structure that feels closer to a pro logbook than a casual gym app.",
    icon: Dumbbell,
  },
  {
    title: "Sport-aware modules",
    description:
      "Unlock widgets, dashboards, and workflows that adapt to strength, tennis, padel, soccer, and basketball.",
    icon: Trophy,
  },
  {
    title: "Premium guidance",
    description:
      "Layer in AI recommendations with Plus or direct access to sport-specific professionals with Pro.",
    icon: Brain,
  },
];

const stack = [
  {
    eyebrow: "Nutrition",
    title: "Track your fuel like it affects performance, because it does.",
    description:
      "Calorie targets, macro pacing, meal history, hydration, and quick logging built for users who want precision without friction.",
  },
  {
    eyebrow: "Training",
    title: "Run your week with the discipline of a performance team.",
    description:
      "Plan training blocks, log sets and reps, capture notes, and keep progression visible across sessions and cycles.",
  },
  {
    eyebrow: "Guidance",
    title: "Add intelligence when you need it, not noise when you do not.",
    description:
      "AI recommendations surface useful next moves, while Pro opens direct access to specialists who understand your sport.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Core tracking tools for disciplined self-management.",
    featured: false,
    perks: [
      "Nutrition dashboard and food logging",
      "Training organization and workout tracking",
      "One sport profile with progress history",
    ],
  },
  {
    name: "Plus",
    price: "$19",
    description: "Premium guidance for users who want sharper decision-making.",
    featured: true,
    perks: [
      "AI recommendations and weekly insights",
      "Adaptive performance prompts",
      "Advanced trend reviews and smart recovery cues",
    ],
  },
  {
    name: "Pro",
    price: "$59",
    description: "The elite layer with direct access to professionals.",
    featured: false,
    perks: [
      "Everything in Plus",
      "Sport-specific professionals and consults",
      "Higher-touch support for serious athletes",
    ],
  },
];

export function LandingPage() {
  return (
    <PageShell className="overflow-hidden">
      <div className="container py-6 md:py-8">
        <header
          data-reveal
          className="glass-panel flex items-center justify-between px-5 py-4"
        >
          <Logo />
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <a href="#memberships">Memberships</a>
            </Button>
            <Button asChild>
              <Link to="/auth">Start Free</Link>
            </Button>
          </div>
        </header>

        <section className="relative grid gap-10 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <Badge data-reveal className="w-fit bg-primary/12 text-primary">
              Premium sports-performance platform
            </Badge>
            <div data-reveal>
              <h1 className="max-w-3xl font-display text-5xl font-bold tracking-tight text-foreground md:text-7xl">
                Train like an athlete.
                <span className="block text-primary">Track like a pro.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                AthletiX brings nutrition, training organization, sport-specific tools,
                premium guidance, and professional support into one premium
                performance system.
              </p>
            </div>
            <div data-reveal className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link to="/auth">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#platform">Explore the platform</a>
              </Button>
            </div>
            <div data-reveal className="grid gap-4 sm:grid-cols-3">
              {[
                ["Fuel", "Macros, hydration, fast logging"],
                ["Training", "Programs, sessions, progression"],
                ["Sport", "Modular dashboards by discipline"],
              ].map(([title, description]) => (
                <Card key={title} className="rounded-[26px] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                    {title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
          <div data-reveal className="relative lg:pl-8">
            <DevicePreview />
          </div>
        </section>

        <section id="platform" className="space-y-10 py-20">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              One athlete system
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
              Professional tools for your sport, made accessible to everyone
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Serious enough for ambitious athletes, intuitive enough for daily use,
              polished enough for early users and investors to believe immediately.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} data-reveal className="min-h-[260px] rounded-[30px] p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-10 text-2xl font-bold tracking-tight">{pillar.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {pillar.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div data-reveal className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Product stack
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Fuel, training, sport, guidance
            </h2>
            <p className="text-lg text-muted-foreground">
              The product is modular by design so the user sees one platform, but feels
              the right tools for their discipline.
            </p>
          </div>
          <div className="space-y-6">
            {stack.map((item, index) => (
              <Card key={item.eyebrow} data-reveal className="rounded-[32px] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                  {item.eyebrow}
                </p>
                <div
                  className={`mt-6 rounded-[28px] p-6 ${
                    index === 0
                      ? "bg-gradient-to-r from-primary/12 to-sky/10"
                      : index === 1
                        ? "bg-gradient-to-r from-slate-900 to-primary/10"
                        : "bg-gradient-to-r from-lime/10 to-primary/10"
                  }`}
                >
                  <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {[
                      "Premium dashboards",
                      "Fast logging",
                      "Athlete-grade structure",
                    ].map((value) => (
                      <div
                        key={value}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div data-reveal className="flex flex-col gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Supported sports
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              One platform. Multiple disciplines.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {sportCards.map((sport) => (
              <Card key={sport.value} data-reveal className="rounded-[28px] p-6">
                <p className="text-lg font-bold">{sport.title}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {sport.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section id="memberships" className="py-20">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Memberships
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
              Free, Plus, and Pro
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start with the fundamentals. Add intelligence when you want sharper
              guidance. Step into Pro when you want specialist support.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                data-reveal
                className={`rounded-[34px] p-8 ${
                  plan.featured ? "border-primary/40 bg-primary/10" : ""
                }`}
              >
                {plan.featured ? (
                  <Badge className="mb-6 w-fit bg-primary text-primary-foreground">Most Popular</Badge>
                ) : null}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {plan.name}
                    </p>
                    <p className="mt-3 text-5xl font-extrabold tracking-tight">
                      {plan.price}
                      <span className="ml-2 text-base font-medium text-muted-foreground">
                        /mo
                      </span>
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-8 space-y-4">
                  {plan.perks.map((perk) => (
                    <div key={perk} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm leading-6 text-muted-foreground">{perk}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-8 w-full" variant={plan.featured ? "default" : "outline"}>
                  {plan.name === "Free" ? "Start Free" : `Choose ${plan.name}`}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="pb-10 pt-8">
          <Card
            data-reveal
            className="rounded-[40px] bg-gradient-to-r from-slate-950 via-slate-900 to-primary/15 p-8 md:p-12"
          >
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                  Ready to build the premium version of your sport?
                </p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold md:text-5xl">
                  Fuel, train, and improve in one platform.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                  The new AthletiX direction is clear: a serious sports-tech product for
                  ambitious everyday athletes.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: "Premium startup feel",
                    icon: Sparkles,
                  },
                  {
                    label: "Sport-specific intelligence",
                    icon: Target,
                  },
                  {
                    label: "AI in Plus",
                    icon: ShieldCheck,
                  },
                  {
                    label: "Professionals in Pro",
                    icon: Users,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-[26px] border border-white/10 bg-white/5 p-5"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <p className="mt-4 font-semibold">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </section>
      </div>
    </PageShell>
  );
}
