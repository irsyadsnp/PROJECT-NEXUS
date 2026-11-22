import assert from "node:assert/strict";
import test from "node:test";
import { buildApp } from "./application.js";

test("health endpoint returns service liveness", async () => {
  const app = buildApp();
  const response = await app.inject({ method: "GET", url: "/api/v1/health" });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().status, "ok");
  assert.equal(response.json().service, "nexus-platform-api");
  await app.close();
});

test("readiness endpoint fails closed when database is not configured", async () => {
  const app = buildApp();
  const response = await app.inject({ method: "GET", url: "/api/v1/ready" });

  assert.equal(response.statusCode, 503);
  assert.equal(response.json().status, "not_ready");
  await app.close();
});
