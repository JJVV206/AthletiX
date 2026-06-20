import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Apple,
  ChevronUp,
  Dumbbell,
  LayoutDashboard,
  LineChart,
  ShieldCheck,
  Sparkles,
  Users,
  UserCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supportModeLabels } from "@/data/mock-data";
import { useSession } from "@/context/session-context";

const navItems = [
  { label: "Dashboard", href: "/app", icon: LayoutDashboard },
  { label: "Nutrition", href: "/app/nutrition", icon: Apple },
  { label: "Training", href: "/app/training", icon: Dumbbell },
  { label: "Progress", href: "/app/progress", icon: LineChart },
  { label: "Insights", href: "/app/insights", icon: Sparkles },
  { label: "Professionals", href: "/app/professionals", icon: Users },
  { label: "Profile", href: "/app/profile", icon: UserCircle2 },
];

export function AppSidebar() {
  const location = useLocation();
  const {
    session: { user },
  } = useSession();

  return (
    <aside className="hidden w-72 flex-col rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(28,40,63,0.96)_0%,rgba(13,21,35,0.98)_100%)] p-6 shadow-soft backdrop-blur xl:flex">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/80">
          Performance OS
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold">Train like a pro.</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Fuel, training, sport modules, and expert support in one structured system.
        </p>
      </div>
      <nav className="mt-10 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            location.pathname === item.href ||
            (item.href !== "/app" && location.pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                active
                  ? "bg-primary/12 text-primary shadow-soft"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,24,38,0.92)_0%,rgba(9,15,26,0.96)_100%)] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary/80">
              Active support
            </p>
            <p className="mt-2 text-lg font-semibold">
              {supportModeLabels[user.supportMode]}
            </p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {user.membership === "pro"
            ? "Your specialist access is live for nutrition, strength, and sport-specific planning."
            : user.membership === "plus"
              ? "AI recommendations are active across fueling, load management, and weekly reviews."
              : "Upgrade when you want AI recommendations and sport-specific expert support."}
        </p>
      </div>
    </aside>
  );
}

export function BottomNav() {
  const location = useLocation();
  const mobileItems = navItems.slice(0, 5);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const shouldCollapse = window.scrollY > 96;
      setIsCollapsed(shouldCollapse);

      if (shouldCollapse) {
        setIsManuallyExpanded(false);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsManuallyExpanded(false);
  }, [location.pathname]);

  const activeItem =
    mobileItems.find(
      (item) =>
        location.pathname === item.href ||
        (item.href !== "/app" && location.pathname.startsWith(item.href)),
    ) ?? mobileItems[0];
  const isExpanded = !isCollapsed || isManuallyExpanded;
  const ActiveIcon = activeItem.icon;

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 xl:hidden">
      {isExpanded ? (
        <nav className="rounded-[28px] border border-white/10 bg-slate-950/90 px-2 py-2 shadow-float backdrop-blur transition-all duration-300">
          <div className="flex items-center justify-between gap-1">
            {mobileItems.map((item) => {
              const Icon = item.icon;
              const active =
                location.pathname === item.href ||
                (item.href !== "/app" && location.pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsManuallyExpanded(false)}
                  className={cn(
                    "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition-all duration-300",
                    active ? "bg-primary/12 text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      ) : (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsManuallyExpanded(true)}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/92 px-4 py-3 shadow-float backdrop-blur transition-all duration-300"
            aria-label={`Expand navigation. Current section: ${activeItem.label}`}
          >
            <div className="flex items-center gap-3 rounded-full bg-primary/12 px-3 py-2 text-primary">
              <ActiveIcon className="h-4 w-4" />
              <span className="text-sm font-semibold">{activeItem.label}</span>
            </div>
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
}
