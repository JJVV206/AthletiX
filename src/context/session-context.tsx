import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { demoSession, initialUserProfile } from "@/data/mock-data";
import { OnboardingGoal, SessionState } from "@/types/models";

const STORAGE_KEY = "vitalia-session-v1";

type SessionContextValue = {
  session: SessionState;
  signIn: (payload: { name?: string; email: string }) => void;
  signOut: () => void;
  completeOnboarding: (goal: OnboardingGoal) => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

function loadSession() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return demoSession;

  try {
    return JSON.parse(stored) as SessionState;
  } catch {
    return demoSession;
  }
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<SessionState>(() => loadSession());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      signIn: ({ name, email }) =>
        setSession((previous) => ({
          ...previous,
          authenticated: true,
          user: {
            ...previous.user,
            name: name?.trim() || initialUserProfile.name,
            email,
          },
        })),
      signOut: () => setSession(demoSession),
      completeOnboarding: (goal) =>
        setSession((previous) => ({
          ...previous,
          onboardingComplete: true,
          goal,
          user: {
            ...previous.user,
            focus: goal,
          },
        })),
    }),
    [session],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}
