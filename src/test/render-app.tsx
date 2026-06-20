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

  localStorage.setItem("vitalai-session-v2", JSON.stringify(session));
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
