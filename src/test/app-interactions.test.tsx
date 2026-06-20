import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp, seedSession } from "@/test/render-app";

describe("signed-in interactions", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a food to dinner through the nutrition search flow", async () => {
    const user = userEvent.setup();
    seedSession();
    renderApp("/app/nutrition");

    await user.click(screen.getByRole("button", { name: /\+ add to dinner/i }));
    await user.type(screen.getByLabelText(/search foods/i), "green detox smoothie");
    await user.click(screen.getByRole("button", { name: /add food/i }));

    expect(
      await screen.findByRole("button", { name: /remove green detox smoothie/i }),
    ).toBeInTheDocument();
  });

  it("creates a custom food entry in the nutrition module", async () => {
    const user = userEvent.setup();
    seedSession();
    renderApp("/app/nutrition");

    await user.click(screen.getByRole("button", { name: /\+ add to lunch/i }));
    await user.click(screen.getByRole("button", { name: /^created$/i }));
    await user.type(screen.getByLabelText(/custom food name/i), "Homemade Burrito Bowl");
    await user.clear(screen.getByLabelText(/serving label/i));
    await user.type(screen.getByLabelText(/serving label/i), "1 bowl");
    await user.type(screen.getByLabelText(/custom food calories/i), "540");
    await user.type(screen.getByLabelText(/custom food protein/i), "35");
    await user.type(screen.getByLabelText(/custom food carbs/i), "48");
    await user.type(screen.getByLabelText(/custom food fats/i), "18");
    await user.click(screen.getByRole("button", { name: /save custom food/i }));

    expect((await screen.findAllByText(/homemade burrito bowl/i)).length).toBeGreaterThan(0);
  });

  it("tracks hydration progress from the nutrition dashboard", async () => {
    const user = userEvent.setup();
    seedSession();
    renderApp("/app/nutrition");

    expect(screen.getAllByText(/1.75 L/i).length).toBeGreaterThan(0);
    await user.click(screen.getByRole("button", { name: /\+500 ml/i }));

    expect((await screen.findAllByText(/2.25 L/i)).length).toBeGreaterThan(0);
  });

  it("navigates to dedicated nutrition section pages", async () => {
    const user = userEvent.setup();
    seedSession();
    renderApp("/app/nutrition");

    expect(screen.queryByRole("button", { name: /^today$/i })).not.toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: /^targets$/i }));

    expect(await screen.findByText(/adjust the framework/i)).toBeInTheDocument();
    expect(screen.queryByText(/today's logging/i)).not.toBeInTheDocument();
    expect(window.location.pathname).toBe("/app/nutrition/targets");
  });

  it("toggles workout set completion", async () => {
    const user = userEvent.setup();
    seedSession();
    renderApp("/app/training");

    const toggleButtons = await screen.findAllByRole("button", {
      name: /toggle set/i,
    });
    const incompleteToggle = toggleButtons.find(
      (button) => button.getAttribute("aria-pressed") === "false",
    );
    expect(incompleteToggle).toBeDefined();

    await user.click(incompleteToggle!);

    expect(incompleteToggle).toHaveAttribute("aria-pressed", "true");
  });

  it("shows the user's sports context inside the unified training page", async () => {
    seedSession();
    renderApp("/app/training");

    expect(await screen.findByText(/train inside your sports mix/i)).toBeInTheDocument();
    expect(screen.getByText(/^strength$/i)).toBeInTheDocument();
    expect(screen.getByText(/^padel$/i)).toBeInTheDocument();
  });

  it("adds an exercise to the routine builder library", async () => {
    const user = userEvent.setup();
    seedSession();
    renderApp("/app/training");

    await user.click(screen.getAllByRole("button", { name: /add to day 1 plan/i })[0]);

    expect(screen.getAllByText(/barbell squat/i).length).toBeGreaterThan(1);
  });
});
