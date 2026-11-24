import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpengraphImage() {
  // The OG renderer cannot read WOFF2. Drop a TTF of Clash Display Semibold at
  // assets/ClashDisplay-Semibold.ttf to use it here; otherwise the default font is used.
  const clash = await readFile(join(process.cwd(), "assets/ClashDisplay-Semibold.ttf")).catch(
    () => null,
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0a0a0b",
        color: "#eeede7",
        fontFamily: clash ? "Clash" : "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -160,
          top: -160,
          width: 640,
          height: 640,
          borderRadius: 9999,
          background: "radial-gradient(circle, rgba(198,244,50,0.55), rgba(198,244,50,0) 65%)",
        }}
      />
      <div
        style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#9d9d95" }}
      >
        <div style={{ width: 16, height: 16, borderRadius: 9999, background: "#c6f432" }} />
        {site.availability}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 150, lineHeight: 0.9, letterSpacing: -6, display: "flex" }}>
          {site.name}
          <span style={{ color: "#c6f432" }}>.</span>
        </div>
        <div style={{ fontSize: 40, marginTop: 24, color: "#9d9d95" }}>{site.role}</div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9d9d95" }}
      >
        <span>{site.location}</span>
        <span>{site.url.replace(/^https?:\/\//, "")}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: clash ? [{ name: "Clash", data: clash, weight: 600, style: "normal" }] : undefined,
    },
  );
}
