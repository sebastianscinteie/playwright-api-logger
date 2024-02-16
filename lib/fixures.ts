import { test as base } from "@playwright/test";
import { APIRequestLogger } from "./logger";

export const test = base.extend({
  request: async ({ request }, use) => {
    await use(new APIRequestLogger(request));
  },
});

export { expect } from "@playwright/test";
