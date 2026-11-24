import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";
import { site } from "@/data/site";
// Best-effort per-instance rate limit: 5 messages / 10 min / IP.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}
const escapeHtml = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
  // Honeypot filled → silently pretend success.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  const input = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ message: Object.values(errors)[0], errors }, { status: 422 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many messages — please try again in a few minutes." },
      { status: 429 },
    );
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set — message logged instead:\n", input);
      return NextResponse.json({ ok: true, dev: true });
    }
    return NextResponse.json(
      { message: "The contact form isn't configured yet." },
      { status: 503 },
    );
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || site.email],
      reply_to: input.email,
      subject: `New portfolio message from ${input.name}`,
      text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(input.name)} &lt;${escapeHtml(input.email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>`,
    }),
  });
  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ message: "Couldn't send your message right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
