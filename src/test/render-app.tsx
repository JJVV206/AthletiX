import { render } from "@testing-library/react";
import App from "@/App";
import { AppStateProvider } from "@/context/app-state-context";
import { SessionProvider } from "@/context/session-context";
import { demoSession } from "@/data/mock-data";
import { SessionState } from "@/types/models";

export function seedSession(partial?: Partial<SessionState>) {
  const session: SessionState = {
    ...demoSession,
    authenticated: true,
    onboardingComplete: true,
    ...partial,
    user: {
      ...demoSession.user,
      ...(partial?.user ?? {}),
    },
  };

  localStorage.setItem("vitalia-session-v1", JSON.stringify(session));
}

export function renderApp(route = "/") {
  window.history.pushState({}, "", route);

  return render(
    <SessionProvider>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </SessionProvider>,
  );
}
