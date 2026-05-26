import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { AppSidebar, BottomNav } from "@/components/app/app-nav";
import { useSession } from "@/context/session-context";
import { cn } from "@/lib/utils";

export type AppShellOutletContext = {
  setBottomNavVisible: (visible: boolean) => void;
};

export function AppShell() {
  const {
    session: { user },
  } = useSession();
  const [isBottomNavVisible, setBottomNavVisible] = useState(true);

  return (
    <>
      <div
        className={cn(
          "container relative pt-4 xl:pt-8",
          isBottomNavVisible ? "pb-28 xl:pb-12" : "pb-8 xl:pb-12",
        )}
      >
        <div className="absolute left-0 top-24 hidden h-64 w-64 rounded-full bg-halo xl:block" />
        <div className="flex items-start gap-6">
          <AppSidebar />
          <div className="min-w-0 flex-1">
            <div className="pointer-events-none sticky top-4 z-20 flex h-0 justify-end overflow-visible">
              <div className="pointer-events-auto">
                <Avatar
                  name={user.name}
                  className="h-12 w-12 border-white/12 bg-slate-950/82 shadow-soft backdrop-blur"
                />
              </div>
            </div>
            <main className="pt-2">
              <Outlet context={{ setBottomNavVisible } satisfies AppShellOutletContext} />
            </main>
          </div>
        </div>
      </div>
      {isBottomNavVisible ? <BottomNav /> : null}
    </>
  );
}
