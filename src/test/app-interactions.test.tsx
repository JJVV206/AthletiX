import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp, seedSession } from "@/test/render-app";

describe("signed-in interactions", () => {
  it("quick logs a dinner meal from nutrition tracking", async () => {
    const user = userEvent.setup();
    seedSession();
    renderApp("/app/nutrition");

    await user.click(screen.getByRole("button", { name: /\+ add to dinner/i }));

    expect((await screen.findAllByText(/green detox smoothie/i)).length).toBeGreaterThan(1);
  });

  it("toggles workout set completion and adds a routine exercise", async () => {
    const user = userEvent.setup();
    seedSession();
    renderApp("/app/workouts");

    const toggleButtons = await screen.findAllByRole("button", {
      name: /toggle set/i,
    });
    expect(toggleButtons[1]).toHaveAttribute("aria-pressed", "false");

    await user.click(toggleButtons[1]);

    expect(toggleButtons[1]).toHaveAttribute("aria-pressed", "true");
  });

  it("adds an exercise to the routine builder library", async () => {
    const user = userEvent.setup();
    seedSession();
    renderApp("/app/routines");

    await user.click(screen.getAllByRole("button", { name: /add to day 1/i })[0]);

    expect(screen.getAllByText(/barbell squat/i).length).toBeGreaterThan(1);
  });
});
