import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageShell } from "@/components/page-shell";
import { useSession } from "@/context/session-context";

type FormState = {
  name: string;
  email: string;
  password: string;
};

const initialForm: FormState = { name: "", email: "", password: "" };

const featureCards = [
  "Nutrition tracking that feels like fuel management, not calorie guilt",
  "Training organization with progression and session structure",
  "Sport-aware modules built around the demands of your discipline",
  "Premium guidance through AI and specialist support layers",
];

export function AuthPage() {
  const navigate = useNavigate();
  const { signIn, session } = useSession();
  const [tab, setTab] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");

  const subtitle = useMemo(
    () =>
      tab === "signup"
        ? "Create your performance account and set up a system built around your sport."
        : "Welcome back. Resume your fueling, training, and progress workflow.",
    [tab],
  );
  const title = tab === "signup" ? "Create your account" : "Welcome back";

  function validate(activeTab: string) {
    if (activeTab === "signup" && form.name.trim().length < 2) {
      return "Please enter your full name.";
    }

    if (!form.email.includes("@")) {
      return "Please enter a valid email address.";
    }

    if (form.password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    return "";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextError = validate(tab);

    if (nextError) {
      setError(nextError);
      return;
    }

    signIn({
      name: tab === "signup" ? form.name : undefined,
      email: form.email,
    });

    navigate(session.onboardingComplete ? "/app" : "/onboarding/goals");
  }

  return (
    <PageShell>
      <div className="container py-8">
        <div className="grid min-h-[calc(100vh-4rem)] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div data-reveal className="hidden lg:block">
            <Logo />
            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Premium sports-tech platform
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-6xl font-bold tracking-tight">
              Enter your athlete operating system.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              AthletiX is designed for everyday users who want access to the same type of
              structure, visibility, and support serious athletes rely on.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {featureCards.map((item) => (
                <Card key={item} className="rounded-[28px] p-5">
                  <p className="font-semibold leading-7">{item}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card data-reveal className="mx-auto w-full max-w-xl rounded-[36px] p-6 sm:p-8">
            <div className="text-center lg:text-left">
              <Logo className="justify-center lg:justify-start" />
              <p className="mt-6 text-4xl font-bold tracking-tight">{title}</p>
              <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
            </div>

            <Tabs value={tab} onValueChange={setTab} className="mt-8">
              <TabsList>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
              </TabsList>

              {["signup", "login"].map((value) => (
                <TabsContent key={value} value={value}>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button variant="secondary" type="button">
                        Google
                      </Button>
                      <Button variant="secondary" type="button">
                        Apple
                      </Button>
                    </div>

                    {value === "signup" && (
                      <Input
                        aria-label="Full Name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(event) =>
                          setForm((previous) => ({
                            ...previous,
                            name: event.target.value,
                          }))
                        }
                      />
                    )}

                    <Input
                      aria-label="Email Address"
                      placeholder="Email Address"
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          email: event.target.value,
                        }))
                      }
                    />

                    <div className="relative">
                      <Input
                        aria-label="Password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(event) =>
                          setForm((previous) => ({
                            ...previous,
                            password: event.target.value,
                          }))
                        }
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword((previous) => !previous)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <label className="flex items-start gap-3 text-sm text-muted-foreground">
                      <input type="checkbox" className="mt-1 rounded" defaultChecked />
                      <span>
                        By signing up, I agree to the Terms of Service and Privacy Policy.
                      </span>
                    </label>

                    {error ? (
                      <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                        {error}
                      </p>
                    ) : null}

                    <Button className="w-full" size="lg" type="submit">
                      {value === "signup" ? "Create Account" : "Enter Platform"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
              <a href="#">Memberships</a>
              <a href="#">Support</a>
              <a href="#">Contact</a>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
