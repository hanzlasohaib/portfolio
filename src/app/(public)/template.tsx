/**
 * Public route template — remounts on navigation for a subtle enter
 * transition (docs/ui-ux/animations.md: fade only, no flashy effects).
 */
export default function PublicTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="animate-page-enter">{children}</div>;
}
