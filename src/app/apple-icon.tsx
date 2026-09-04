import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

/**
 * Home-screen icon. Raster because Apple does not use SVG favicons.
 * Same HS monogram and dark-theme tokens as `app/icon.svg`.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#040414",
          color: "#3f8cff",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        HS
      </div>
    ),
    { ...size },
  );
}
