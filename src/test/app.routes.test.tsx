import { screen } from "@testing-library/react";
import { renderApp, seedSession } from "@/test/render-app";

describe("app routing", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the landing page on the public root route", () => {
    renderApp("/");

    expect(
      screen.getByRole("heading", { name: /train like an athlete/i }),
    ).toBeInTheDocument();
  });

  it("redirects unauthenticated users away from protected routes", async () => {
    renderApp("/app");

    expect(await screen.findByText(/create your account/i)).toBeInTheDocument();
  });

  it("renders protected pages for authenticated users", async () => {
    seedSession();
    renderApp("/app/progress");

    expect(
      await screen.findByRole("heading", {
        name: /a few useful signals/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/recent bests and movement/i)).toBeInTheDocument();
  });

  it("redirects legacy sports route into the unified training page", async () => {
    seedSession();
    renderApp("/app/sports");

    expect(await screen.findByText(/train inside your sports mix/i)).toBeInTheDocument();
    expect(window.location.pathname).toBe("/app/training");
  });
});
