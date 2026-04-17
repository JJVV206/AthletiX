import { RefObject, useEffect, useMemo, useState } from "react";
import anime from "animejs/lib/anime.es.js";

export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export function useRevealAnimation(
  ref: RefObject<HTMLElement>,
  selector = "[data-reveal]",
) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.querySelectorAll(selector);
    if (targets.length === 0) return;

    if (reducedMotion) {
      targets.forEach((target) => {
        (target as HTMLElement).style.opacity = "1";
        (target as HTMLElement).style.transform = "none";
      });
      return;
    }

    const animation = anime({
      targets,
      opacity: [0, 1],
      translateY: [18, 0],
      easing: "easeOutExpo",
      duration: 850,
      delay: anime.stagger(80),
    });

    return () => animation.pause();
  }, [ref, selector, reducedMotion]);
}

export function useAnimatedNumber(
  value: number,
  format: (next: number) => string = (next) => Math.round(next).toString(),
) {
  const reducedMotion = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState(() => format(value));

  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(format(value));
      return;
    }

    const driver = { value: 0 };
    const animation = anime({
      targets: driver,
      value,
      round: 1,
      duration: 1200,
      easing: "easeOutCubic",
      update: () => setDisplayValue(format(driver.value)),
    });

    return () => animation.pause();
  }, [format, reducedMotion, value]);

  return displayValue;
}

export function useLoopPulse(
  ref: RefObject<HTMLElement>,
  enabled = true,
  scale = 1.03,
) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled || reducedMotion) return;

    const animation = anime({
      targets: node,
      scale: [1, scale, 1],
      duration: 1800,
      easing: "easeInOutSine",
      loop: true,
    });

    return () => animation.pause();
  }, [enabled, reducedMotion, ref, scale]);
}

export function useSelectionBounce(trigger: unknown) {
  const reducedMotion = usePrefersReducedMotion();

  return useMemo(
    () => (node: HTMLElement | null) => {
      if (!node || reducedMotion || trigger === null) return;

      anime({
        targets: node,
        scale: [1, 1.03, 1],
        duration: 420,
        easing: "easeOutBack",
      });
    },
    [reducedMotion, trigger],
  );
}
