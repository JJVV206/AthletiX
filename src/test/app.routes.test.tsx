import { screen } from "@testing-library/react";
import { renderApp, seedSession } from "@/test/render-app";

describe("app routing", () => {
  it("renders the landing page on the public root route", () => {
    renderApp("/");

    expect(
      screen.getByRole("heading", { name: /wellness, intelligent & unified/i }),
    ).toBeInTheDocument();
  });

  it("redirects unauthenticated users away from protected routes", async () => {
    renderApp("/app");

    expect(await screen.findByText(/create an account/i)).toBeInTheDocument();
  });

  it("renders protected pages for authenticated users", async () => {
    seedSession();
    renderApp("/app/analytics");

    expect(await screen.findByText(/analytics hub/i)).toBeInTheDocument();
    expect(screen.getByText(/^strength progression$/i)).toBeInTheDocument();
  });
});
