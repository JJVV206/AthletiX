import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/app/app-shell";
import { useSession } from "@/context/session-context";
import { AuthPage } from "@/pages/auth-page";
import { DashboardPage } from "@/pages/dashboard-page";
import { InsightsPage } from "@/pages/insights-page";
import { LandingPage } from "@/pages/landing-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { NutritionPage } from "@/pages/nutrition-page";
import { OnboardingGoalsPage } from "@/pages/onboarding-goals-page";
import { ProfessionalsPage } from "@/pages/professionals-page";
import { ProgressPage } from "@/pages/progress-page";
import { ProfilePage } from "@/pages/profile-page";
import { SportsPage } from "@/pages/sports-page";
import { TrainingPage } from "@/pages/training-page";

function ProtectedRoute() {
  const { session } = useSession();

  if (!session.authenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!session.onboardingComplete) {
    return <Navigate to="/onboarding/goals" replace />;
  }

  return <Outlet />;
}

function PublicOnlyRoute() {
  const { session } = useSession();

  if (!session.authenticated) {
    return <Outlet />;
  }

  return (
    <Navigate to={session.onboardingComplete ? "/app" : "/onboarding/goals"} replace />
  );
}

function OnboardingRoute() {
  const { session } = useSession();

  if (!session.authenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (session.onboardingComplete) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PublicOnlyRoute />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        <Route element={<OnboardingRoute />}>
          <Route path="/onboarding/goals" element={<OnboardingGoalsPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<AppShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="nutrition" element={<NutritionPage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="sports" element={<SportsPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="professionals" element={<ProfessionalsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="workouts" element={<Navigate to="/app/training" replace />} />
            <Route path="routines" element={<Navigate to="/app/training" replace />} />
            <Route path="analytics" element={<Navigate to="/app/progress" replace />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
