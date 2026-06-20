import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/test/render-app";

describe("auth and onboarding", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("signs up and advances to onboarding", async () => {
    const user = userEvent.setup();
    renderApp("/auth");

    await user.type(screen.getByLabelText(/full name/i), "Alex Rivers");
    await user.type(screen.getByLabelText(/email address/i), "alex@vitalai.app");
    await user.type(screen.getByLabelText(/^password$/i), "VitalAI123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(
      await screen.findByRole("heading", {
        name: /choose your primary performance objective/i,
      }),
    ).toBeInTheDocument();

    const storedSession = JSON.parse(localStorage.getItem("vitalai-session-v2") ?? "{}");
    expect(storedSession.authenticated).toBe(true);
  });
});
