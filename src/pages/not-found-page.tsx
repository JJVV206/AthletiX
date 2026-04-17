import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function NotFoundPage() {
  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <Card className="max-w-xl rounded-[34px] p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">
          The page drifted off-course.
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Return to the dashboard or restart your journey from the landing page.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link to="/app">Go to App</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/">Landing Page</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
