import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["dist/**", "node_modules/**", "release/**"],
    globalSetup: ["tests/setup/isolate-home.ts"],
  },
});
