import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "MatthewsLab — Video, Foto & Web Studio"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(34,211,238,0.25), transparent 45%), radial-gradient(circle at 75% 75%, rgba(168,85,247,0.25), transparent 45%)",
        }}
      >
        <div style={{ fontSize: 108, fontWeight: 700, color: "white", letterSpacing: -2, display: "flex" }}>
          Matthews
          <span style={{ color: "#22D3EE" }}>Lab</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: 4,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Video · Foto · Design · Web
        </div>
      </div>
    ),
    { ...size }
  )
}
