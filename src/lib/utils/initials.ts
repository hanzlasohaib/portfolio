/**
 * First + last initial of a person's name — "Hanzla Sohaib" → "HS".
 *
 * Shared by the public nav monogram (`NavbarBrand variant="monogram"`) and
 * the About portrait tile, which both stand in for an unavailable logo or
 * photograph.
 */
export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    const first = parts[0]?.[0] ?? "";
    const last = parts[parts.length - 1]?.[0] ?? "";
    return `${first}${last}`.toUpperCase();
  }

  return name.trim().slice(0, 2).toUpperCase() || "?";
}
