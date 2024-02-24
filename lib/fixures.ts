import { test as base } from "@playwright/test";
import { APIRequestLogger } from "./logger";

export const test = base.extend({
  request: async ({ request, baseURL }, use) => {
    await use(new APIRequestLogger(request, baseURL));
  },
});

export { expect } from "@playwright/test";
