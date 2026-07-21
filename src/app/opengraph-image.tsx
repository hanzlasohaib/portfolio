import { ImageResponse } from "next/og";

export const alt = "Hanzla Sohaib — Full Stack Software Engineer • AI Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Generated Open Graph / Twitter card image
 * (docs/architecture/seo-strategy.md — rich previews).
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0b1220 0%, #152238 55%, #1a3a4a 100%)",
          color: "#f5f7fa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#7dd3c7",
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Hanzla Sohaib
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#c5ced9",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Full Stack Software Engineer • AI Engineer
        </div>
      </div>
    ),
    { ...size },
  );
}
