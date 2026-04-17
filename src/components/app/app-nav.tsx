import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  Apple,
  Dumbbell,
  Home,
  LayoutTemplate,
  UserCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/app", icon: Home },
  { label: "Nutrition", href: "/app/nutrition", icon: Apple },
  { label: "Workouts", href: "/app/workouts", icon: Dumbbell },
  { label: "Routines", href: "/app/routines", icon: LayoutTemplate },
  { label: "Analytics", href: "/app/analytics", icon: Activity },
  { label: "Profile", href: "/app/profile", icon: UserCircle2 },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden w-72 flex-col rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-soft backdrop-blur xl:flex">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/70">
          Vitalia Hub
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold">Unified wellness.</h2>
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
                  ? "bg-secondary text-primary shadow-soft"
                  : "text-muted-foreground hover:bg-white hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-[28px] bg-primary p-5 text-primary-foreground">
        <p className="text-xs uppercase tracking-[0.22em] text-primary-foreground/70">
          Recovery Tip
        </p>
        <p className="mt-3 text-sm leading-6">
          Stay with the current sleep window for three more nights before increasing
          volume.
        </p>
      </div>
    </aside>
  );
}

export function BottomNav() {
  const location = useLocation();
  const mobileItems = navItems.slice(0, 5);

  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 rounded-[28px] border border-white/80 bg-white/85 px-2 py-2 shadow-float backdrop-blur xl:hidden">
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
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold",
                active ? "bg-secondary text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
