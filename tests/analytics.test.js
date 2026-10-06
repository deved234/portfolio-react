import test from "node:test";
import assert from "node:assert/strict";
import { createAnalytics, classifyLink, readCampaign } from "../src/lib/analytics.js";

function fixture(enabled = true) {
  const scripts = [];
  const win = { location: new URL("https://portfolio-react-theta-hazel-94.vercel.app/?email=private@example.com#work") };
  const doc = { title: "Home", referrer: "https://example.com/?private=secret", cookie: "_ga=123; preference=list", createElement: () => ({}), head: { appendChild: (script) => scripts.push(script) } };
  const tracker = createAnalytics(win, doc, "G-8CF6F9426E", enabled);
  const events = () => (win.dataLayer || []).map((args) => [...args]).filter((args) => args[0] === "event");
  return { win, doc, scripts, tracker, events };
}
test("no tag or events load before consent, including local/preview environments", () => {
  const f = fixture();
  f.tracker.page(); f.tracker.event("cv_download");
  assert.equal(f.scripts.length, 0); assert.equal(f.events().length, 0);
  const disabled = fixture(false); disabled.tracker.start();
  assert.equal(disabled.scripts.length, 0); assert.equal(disabled.events().length, 0);
});
test("acceptance initializes one tag and one page view without advertising or duplicate auto views", () => {
  const f = fixture(); f.tracker.start(); f.tracker.start(); f.tracker.page();
  assert.equal(f.scripts.length, 1); assert.equal(f.events().length, 1);
  const config = f.win.dataLayer.map((args) => [...args]).find((args) => args[0] === "config")[2];
  assert.equal(config.send_page_view, false); assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
  assert.equal(f.events()[0][2].page_location, f.win.location.origin + "/");
  assert.equal(f.events()[0][2].page_referrer, "https://example.com/");
});
test("SPA navigation counts each real transition, updates title/referrer and ignores hashes", () => {
  const f = fixture(); f.tracker.start();
  f.win.location = new URL(f.win.location.origin + "/about#skills"); f.doc.title = "About"; f.tracker.page();
  f.win.location.hash = "training"; f.tracker.page();
  f.win.location = new URL(f.win.location.origin + "/"); f.doc.title = "Home"; f.tracker.page();
  assert.equal(f.events().length, 3);
  assert.equal(f.events()[1][2].page_title, "About");
  assert.equal(f.events()[1][2].page_referrer, f.win.location.origin + "/");
  assert.equal(f.events()[2][2].page_referrer, f.win.location.origin + "/about");
});
test("rejecting stops events; accepting again resumes without adding a second tag", () => {
  const f = fixture(); f.tracker.start(); f.tracker.stop(); f.tracker.event("generate_lead"); f.tracker.page();
  assert.equal(f.events().length, 1); assert.equal(f.win["ga-disable-G-8CF6F9426E"], true);
  f.tracker.start(); f.tracker.event("generate_lead", { method: "contact_form" });
  assert.equal(f.scripts.length, 1); assert.equal(f.events().length, 3);
});
test("public interactions are classified without personal contact data or arbitrary URLs", () => {
  const origin = "https://portfolio-react-theta-hazel-94.vercel.app";
  assert.deepEqual(classifyLink("mailto:secret@example.com", "/", origin), ["contact_click", { method: "email" }]);
  assert.deepEqual(classifyLink("tel:+2012345", "/", origin), ["contact_click", { method: "phone" }]);
  assert.deepEqual(classifyLink("https://wa.me/12345", "/", origin), ["contact_click", { method: "whatsapp" }]);
  assert.deepEqual(classifyLink("/documents/David-Atef-CV.pdf", "/", origin), ["cv_download", { file_name: "David-Atef-CV.pdf" }]);
  assert.deepEqual(classifyLink("https://github.com/deved234/repo", "/projects/shopzone", origin), ["project_link_click", { project_slug: "shopzone", link_type: "source" }]);
  assert.deepEqual(classifyLink("https://example.com/?secret=yes", "/projects/shopzone", origin), ["project_link_click", { project_slug: "shopzone", link_type: "live" }]);
  assert.equal(classifyLink("/about", "/", origin), null);
  assert.equal(classifyLink("javascript:alert(1)", "/", origin), null);
});

test("UTM labels map to native GA4 campaign fields without forwarding private query values", () => {
  const url = "https://example.com/?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio&utm_content=profile&utm_term=frontend%20developer&utm_id=portfolio-v1&email=private@example.com&token=secret#private";
  assert.deepEqual(readCampaign(url), {
    campaign_source: "linkedin", campaign_medium: "social", campaign_name: "portfolio",
    campaign_content: "profile", campaign_term: "frontend developer", campaign_id: "portfolio-v1",
  });
  assert.deepEqual(readCampaign("https://example.com/?utm_source=private@example.com&utm_content=https%3A%2F%2Fsecret.com&utm_term=201234567890&utm_medium=social"), { campaign_medium: "social" });
  assert.deepEqual(readCampaign("https://example.com/?utm_campaign=" + "a".repeat(101)), {});
  assert.deepEqual(readCampaign("invalid"), {});
});

test("entry campaign survives navigation before consent without contaminating page URLs", () => {
  const scripts = [];
  const win = { location: new URL("https://example.com/?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio&utm_content=profile&email=private@example.com") };
  const doc = { title: "About", referrer: "https://www.linkedin.com/?secret=value", cookie: "", createElement: () => ({}), head: { appendChild: (script) => scripts.push(script) } };
  const tracker = createAnalytics(win, doc, "G-8CF6F9426E", true);
  win.location = new URL("https://example.com/about?utm_source=internal-link");
  tracker.start();
  const commands = win.dataLayer.map(args => [...args]);
  const config = commands.find(args => args[0] === "config")[2];
  assert.equal(config.campaign_source, "linkedin");
  assert.equal(config.campaign_content, "profile");
  assert.equal(config.page_location, "https://example.com/about");
  assert.equal(config.page_referrer, "https://www.linkedin.com/");
  win.location = new URL("https://example.com/contact"); tracker.page();
  assert.equal(commands.filter(args => args[0] === "config").length, 1);
  assert.equal(JSON.stringify(win.dataLayer).includes("private@example.com"), false);
  assert.equal(JSON.stringify(win.dataLayer).includes("internal-link"), false);
  assert.equal(scripts.length, 1);
});
