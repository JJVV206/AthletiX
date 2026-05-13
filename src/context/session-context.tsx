import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { demoSession, initialUserProfile } from "@/data/mock-data";
import {
  MembershipTier,
  OnboardingSelection,
  SessionState,
  SupportMode,
} from "@/types/models";

const STORAGE_KEY = "vitalai-session-v2";

type SessionContextValue = {
  session: SessionState;
  signIn: (payload: { name?: string; email: string }) => void;
  signOut: () => void;
  completeOnboarding: (selection: OnboardingSelection) => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

function loadSession() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return demoSession;

  try {
    const parsed = JSON.parse(stored) as Partial<SessionState>;
    return {
      ...demoSession,
      ...parsed,
      user: {
        ...demoSession.user,
        ...(parsed.user ?? {}),
      },
    } satisfies SessionState;
  } catch {
    return demoSession;
  }
}

function membershipFromSupportMode(supportMode: SupportMode): MembershipTier {
  if (supportMode === "pro-coaching") return "pro";
  if (supportMode === "ai-plus") return "plus";
  return "free";
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
      completeOnboarding: (selection) =>
        setSession((previous) => ({
          ...previous,
          onboardingComplete: true,
          goal: selection.goal,
          user: {
            ...previous.user,
            focus: selection.goal,
            sports: selection.sports,
            trainingLevel: selection.trainingLevel,
            performanceFocus: selection.performanceFocus,
            supportMode: selection.supportMode,
            membership: membershipFromSupportMode(selection.supportMode),
            targetWeightKg: selection.targetWeightKg,
            weeklyTrainingDays: selection.weeklyTrainingDays,
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
