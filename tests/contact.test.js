import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/contact.js";

const valid = {
  name: "Portfolio test",
  email: "test@example.com",
  company: "",
  service: "Frontend development",
  message: "A test message for validation.",
  website: "",
};
async function request(body = valid, options = {}) {
  let status = 200,
    payload;
  const headers = {};
  const res = {
    setHeader(k, v) {
      headers[k] = v;
    },
    status(code) {
      status = code;
      return this;
    },
    json(value) {
      payload = value;
    },
  };
  await handler(
    {
      method: "POST",
      headers: {
        host: "portfolio.example",
        origin: "https://portfolio.example",
      },
      body,
      ...options,
    },
    res,
  );
  return { status, payload, headers };
}
test("contact validation and provider responses", async (t) => {
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_FROM;
  delete process.env.CONTACT_ORIGIN;
  await t.test("rejects unsupported methods", async () =>
    assert.equal((await request(valid, { method: "GET" })).status, 405),
  );
  await t.test("rejects foreign origins", async () =>
    assert.equal(
      (
        await request(valid, {
          headers: {
            host: "portfolio.example",
            origin: "https://other.example",
          },
        })
      ).status,
      403,
    ),
  );
  await t.test("rejects invalid input before provider call", async () => {
    for (const body of [
      { ...valid, email: "invalid" },
      { ...valid, message: "short" },
      { ...valid, name: "x".repeat(101) },
      { ...valid, service: "unlisted" },
      { ...valid, website: "bot" },
      "bad JSON",
    ])
      assert.equal((await request(body)).status, 400);
  });
  await t.test("missing configuration never reports success", async () =>
    assert.equal((await request()).status, 503),
  );
  process.env.RESEND_API_KEY = "test-only";
  process.env.CONTACT_FROM = "test@example.com";
  const originalFetch = global.fetch;
  try {
    await t.test("provider refusal is an error", async () => {
      global.fetch = async () => ({ ok: false });
      assert.equal((await request()).status, 502);
    });
    await t.test(
      "provider acceptance confirms success and uses reply-to",
      async () => {
        global.fetch = async (_url, options) => {
          const body = JSON.parse(options.body);
          assert.equal(body.reply_to, valid.email);
          assert.match(body.text, /A test message/);
          return { ok: true, json: async () => ({ id: "test-accepted" }) };
        };
        assert.deepEqual((await request()).payload, { ok: true });
      },
    );
    await t.test("network errors are not reported as success", async () => {
      global.fetch = async () => {
        throw new Error("offline");
      };
      assert.equal((await request()).status, 502);
    });
    await t.test("repeated sending is throttled", async () =>
      assert.equal((await request()).status, 429),
    );
  } finally {
    global.fetch = originalFetch;
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM;
  }
});
