import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll } from "vitest";

const storage = (() => {
  const store = new Map<string, string>();

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
  };
})();

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    writable: true,
    value: storage,
  });
  Object.defineProperty(globalThis, "localStorage", {
    writable: true,
    value: storage,
  });
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  window.history.pushState({}, "", "/");
});
