import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Ensure every test starts with a clean DOM.
afterEach(() => {
  cleanup();
});
