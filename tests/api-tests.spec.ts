import { expect, test } from "../lib/fixures";
import { ReadStream } from "fs";
import { APIRequestLogger } from "../lib/logger";

test.describe("First Suite", async () => {
  test("should get 200 OK", async ({ request }) => {
    const res = await request.get("/get");
    expect(res.status()).toBe(200);
  });

  test("should post 200 OK", async ({ request }) => {
    const res = await request.post("/post", {
      data: {
        something: "anything",
      },
    });
    expect(res.status()).toBe(200);
  });

  test("should put 200 OK", async ({ request }) => {
    const res = await request.delete("/delete");
    expect(res.status()).toBe(200);
  });
});
