import { Outlet } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { AppFooter } from "@/components/app/app-footer";
import { AppSidebar, BottomNav } from "@/components/app/app-nav";
import { Logo } from "@/components/logo";
import { sportLabels } from "@/data/mock-data";
import { useSession } from "@/context/session-context";

export function AppShell() {
  const {
    session: { user },
  } = useSession();
  const sportsLine = user.sports.map((sport) => sportLabels[sport]).join(" • ");

  return (
    <>
      <div className="container relative pb-28 pt-4 xl:pb-12 xl:pt-8">
        <div className="absolute left-0 top-24 hidden h-64 w-64 rounded-full bg-halo xl:block" />
        <div className="flex items-start gap-6">
          <AppSidebar />
          <div className="min-w-0 flex-1">
            <header className="sticky top-4 z-20 flex items-center justify-between rounded-[28px] border border-white/10 bg-slate-950/75 px-5 py-4 shadow-soft backdrop-blur">
              <div className="flex items-center gap-4">
                <Logo />
                <div className="hidden lg:block">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Daily workspace
                  </p>
                  <p className="mt-1 text-sm text-foreground">{sportsLine}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Performance Score {user.performanceScore} • {sportsLine}
                  </p>
                </div>
                <Avatar name={user.name} />
              </div>
            </header>
            <main className="pt-6">
              <Outlet />
            </main>
            <AppFooter />
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
