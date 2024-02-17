import { expect, test } from "../lib/fixures";

test.describe("First Suite", async () => {
  test("get should return 200", async ({ request }) => {
    const res = await request.get("/get");
    expect(res.status()).toBe(200);
  });

  test("post should return 200", async ({ request }) => {
    const res = await request.post("/post", {
      data: {
        something: "anything",
      },
    });
    expect(res.status()).toBe(200);
  });

  test("delete should return 200", async ({ request }) => {
    const res = await request.delete("/delete");
    expect(res.status()).toBe(200);
  });

  test("fetch should return 200", async ({ request }) => {
    const res = await request.fetch("/delete", {
      method: "delete",
    });
    expect(res.status()).toBe(200);
  });
});
