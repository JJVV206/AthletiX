import { ArrowRight, CheckCircle2, Play, Quote, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import { DevicePreview } from "@/components/public/device-preview";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Hyper-personalized nutrition",
    description:
      "Adaptive meal planning tuned to training intensity, recovery trends, and hunger signals.",
    tone: "bg-white",
    descriptionTone: "text-muted-foreground",
  },
  {
    title: "Biometric sync",
    description:
      "Real-time flow from your wearables into a single dashboard that actually prioritizes signal over noise.",
    tone: "bg-primary text-white",
    descriptionTone: "text-primary-foreground/80",
  },
  {
    title: "Elite programming",
    description:
      "Structured strength and hypertrophy sessions that react to the reality of your week.",
    tone: "bg-muted",
    descriptionTone: "text-muted-foreground",
  },
  {
    title: "Unified community",
    description:
      "Goal-based cohorts, coach touchpoints, and milestone rituals to keep momentum durable.",
    tone: "bg-white",
    descriptionTone: "text-muted-foreground",
  },
];

const workflow = [
  {
    step: "01",
    title: "Initial vitality assessment",
    description:
      "Vitalia maps your baseline through a guided five-minute intake covering training history, sleep, and metabolic intent.",
  },
  {
    step: "02",
    title: "Dynamic adaptive planning",
    description:
      "Nutrition, sessions, and recovery all rebalance automatically when your energy and consistency shift.",
  },
  {
    step: "03",
    title: "Performance checkpoints",
    description:
      "Weekly reviews surface the small changes that produce the next jump in vitality score, strength, and adherence.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Essential tools for getting started.",
    cta: "Start Free",
    featured: false,
    perks: ["Basic workout library", "Daily calorie tracking", "1 wearable integration"],
  },
  {
    name: "Elite",
    price: "$24",
    description: "The full adaptive wellness experience.",
    cta: "Go Elite",
    featured: true,
    perks: [
      "AI-adaptive nutrition",
      "Professional coaching plans",
      "Unlimited device sync",
      "Deep biometric analysis",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    description: "For serious athletes and hybrid performers.",
    cta: "Start Pro",
    featured: false,
    perks: ["Everything in Elite", "1-on-1 virtual consults", "Team management tools"],
  },
];

export function LandingPage() {
  return (
    <PageShell className="overflow-hidden">
      <div className="container py-6 md:py-8">
        <header
          data-reveal
          className="flex items-center justify-between rounded-[30px] border border-white/70 bg-white/80 px-5 py-4 shadow-soft backdrop-blur"
        >
          <Logo />
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/auth">Start Your Journey</Link>
          </Button>
        </header>

        <section className="relative grid gap-10 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <Badge data-reveal variant="lime" className="w-fit">
              New · AI Meal Generation
            </Badge>
            <div data-reveal>
              <h1 className="max-w-xl font-display text-5xl font-bold tracking-tight text-foreground md:text-7xl">
                Wellness, <span className="text-primary italic">intelligent</span> &
                unified
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                The digital sanctuary for athletes, professionals, and anyone who needs
                nutrition, programming, and recovery to finally work together.
              </p>
            </div>
            <div data-reveal className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link to="/auth">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            <div data-reveal className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {["AR", "JM", "DK"].map((initials) => (
                  <div
                    key={initials}
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-primary/15 text-sm font-bold text-primary"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="font-semibold text-primary">12,000+</span> members
              </p>
            </div>
          </div>
          <div data-reveal className="relative lg:pl-8">
            <DevicePreview />
          </div>
        </section>

        <section className="space-y-10 py-20">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Built for the digital athlete
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
              Precision without the clutter
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every surface is designed to turn health data into a calm, usable next
              move.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                data-reveal
                className={`min-h-[240px] rounded-[30px] p-7 ${feature.tone}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-primary shadow-soft">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-10 text-2xl font-bold tracking-tight">{feature.title}</h3>
                <p className={`mt-4 text-sm leading-7 ${feature.descriptionTone}`}>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-10 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div data-reveal className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              The workflow
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Simple, seamless, superior
            </h2>
            <p className="text-lg text-muted-foreground">
              A system that keeps intensity high while decision fatigue stays low.
            </p>
          </div>
          <div className="space-y-6">
            {workflow.map((item, index) => (
              <Card
                key={item.step}
                data-reveal
                className="grid gap-6 rounded-[32px] p-8 md:grid-cols-[100px_1fr]"
              >
                <div className="text-6xl font-extrabold tracking-tight text-muted/60">
                  {item.step}
                </div>
                <div>
                  <div
                    className={`mb-6 rounded-[28px] ${
                      index === 0
                        ? "bg-gradient-to-br from-primary/15 to-lime/20"
                        : index === 1
                          ? "bg-gradient-to-br from-sky/55 to-white"
                          : "bg-gradient-to-br from-lime/20 to-primary/10"
                    } p-6`}
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {[48, 82, 64].map((height) => (
                        <div
                          key={height}
                          className="rounded-t-2xl bg-primary/70"
                          style={{ height }}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Invest in your future self
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Plans that scale with your ambition, from habit-building to elite
              performance.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                data-reveal
                className={`rounded-[34px] p-8 ${
                  plan.featured ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                {plan.featured && (
                  <Badge variant="lime" className="mb-6 w-fit bg-lime/20 text-lime">
                    Most popular
                  </Badge>
                )}
                <h3 className="text-3xl font-bold">{plan.name}</h3>
                <p
                  className={`mt-3 text-sm ${
                    plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="mt-8 flex items-end gap-2">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className={plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"}>
                    /mo
                  </span>
                </div>
                <ul className="mt-8 space-y-4 text-sm">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.featured ? "secondary" : "outline"}
                  className="mt-10 w-full"
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section data-reveal className="py-20">
          <Card className="overflow-hidden rounded-[36px] p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <Quote className="h-10 w-10 text-primary" />
                <p className="mt-8 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
                  “Vitalia acts like the personal coach I never knew I could afford.”
                </p>
                <p className="mt-8 text-base font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Alex Rivers · Elite Member · 92 vitality score
                </p>
              </div>
              <div className="rounded-[32px] bg-gradient-to-br from-primary via-primary/90 to-lime p-8 text-primary-foreground">
                <p className="text-sm leading-7 text-primary-foreground/80">
                  The app does not just display metrics. It filters the noise, shows what
                  matters today, and makes consistency feel sophisticated rather than
                  exhausting.
                </p>
                <Button asChild variant="secondary" className="mt-8">
                  <Link to="/auth">Build My Plan</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <footer data-reveal className="border-t border-white/70 py-10 text-center text-sm text-muted-foreground">
          <Logo className="justify-center" />
          <div className="mt-6 flex items-center justify-center gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Support</a>
          </div>
          <p className="mt-6">© 2024 Vitalia. The Digital Sanctuary.</p>
        </footer>
      </div>
    </PageShell>
  );
}
