import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Mỹ Nguyễn's portfolio shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Mỹ Nguyễn \| Marketing Portfolio<\/title>/i);
  assert.match(html, /Ideas that connect brands, people/);
  assert.match(html, /Lay(?:’|&#x2019;)s Max/);
  assert.match(html, /Let(?:’|&#x2019;|&#x27;)s connect/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("ships verified portfolio media and removes the starter preview", async () => {
  const media = [
    "my-nguyen.jpg",
    "lays-max.png",
    "chupa-chups.png",
    "sfit.png",
    "creative-mindset.jpg",
    "plato-checkin.jpg",
  ];

  await Promise.all(
    media.map((name) => access(new URL(`../public/media/${name}`, import.meta.url))),
  );
  await assert.rejects(access(new URL("app/_sites-preview/page.tsx", root)));
});
