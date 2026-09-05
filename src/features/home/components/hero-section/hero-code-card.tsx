import type { HeroTechGroup } from "./hero-section.types";

const MAX_STACK_GROUPS = 4;
const MAX_ITEMS_PER_GROUP = 2;

type CodeTokenKind = "keyword" | "class" | "attr" | "string" | "punct";

type CodeToken = {
  text: string;
  kind: CodeTokenKind;
};

type HeroCodeCardProps = {
  name: string;
  role: string;
  location: string;
  techGroups: HeroTechGroup[];
};

const tokenClassName: Record<CodeTokenKind, string> = {
  keyword: "code-keyword",
  class: "code-class",
  attr: "code-attr",
  string: "code-string",
  punct: "code-punct",
};

function token(kind: CodeTokenKind) {
  return (text: string): CodeToken => ({ text, kind });
}

const keyword = token("keyword");
const className = token("class");
const attr = token("attr");
const str = token("string");
const punct = token("punct");

/** "Hanzla Sohaib" → "HanzlaSohaib", so the class name tracks the real name. */
function toPascalCase(value: string): string {
  const words = value
    .replace(/[^A-Za-z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const pascal = words
    .map((word) => `${(word[0] ?? "").toUpperCase()}${word.slice(1)}`)
    .join("");

  return pascal || "Portfolio";
}

/** "Backend & APIs" → "backend" — a dict key short enough not to wrap. */
function toStackKey(label: string): string {
  const firstWord = label.trim().split(/\s+/)[0] ?? label;
  return firstWord.replace(/[^A-Za-z0-9]/g, "").toLowerCase() || "stack";
}

/** The role reads as two titles separated by a bullet; render it as a list. */
function splitRole(role: string): string[] {
  return role
    .split(/[•|]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildStringList(values: string[], indent: string): CodeToken[][] {
  return values.map((value) => [
    punct(indent),
    str(`"${value}"`),
    punct(","),
  ]);
}

function buildCodeLines({
  name,
  role,
  location,
  techGroups,
}: HeroCodeCardProps): CodeToken[][] {
  const roles = splitRole(role);
  const groups = techGroups
    .filter((group) => group.items.length > 0)
    .slice(0, MAX_STACK_GROUPS);

  const lines: CodeToken[][] = [
    [keyword("class "), className(toPascalCase(name)), punct(":")],
    [punct("    "), keyword("def "), className("__init__"), punct("(self):")],
  ];

  if (roles.length > 0) {
    lines.push([
      punct("        "),
      attr("self"),
      punct("."),
      attr("roles"),
      punct(" = ["),
    ]);
    lines.push(...buildStringList(roles, "            "));
    lines.push([punct("        ]")]);
  }

  if (location) {
    lines.push([
      punct("        "),
      attr("self"),
      punct("."),
      attr("based_in"),
      punct(" = "),
      str(`"${location}"`),
    ]);
  }

  if (groups.length > 0) {
    lines.push([]);
    lines.push([
      punct("        "),
      attr("self"),
      punct("."),
      attr("stack"),
      punct(" = {"),
    ]);

    for (const group of groups) {
      const items = group.items.slice(0, MAX_ITEMS_PER_GROUP);

      lines.push([
        punct("            "),
        str(`"${toStackKey(group.label)}"`),
        punct(": ["),
        ...items.flatMap((item, index) => [
          str(`"${item}"`),
          punct(index < items.length - 1 ? ", " : ""),
        ]),
        punct("],"),
      ]);
    }

    lines.push([punct("        }")]);
  }

  return lines;
}

/**
 * Hero right column: an `about-me.py` window standing in for a portrait.
 *
 * Every value is real profile / skills data — nothing about the stack is
 * invented here. Exposed to assistive tech as a single labelled image
 * because reading Python punctuation aloud helps nobody, and the same
 * facts are available as text in About and Skills.
 */
export function HeroCodeCard(props: HeroCodeCardProps) {
  const lines = buildCodeLines(props);
  const stackSummary = props.techGroups
    .flatMap((group) => group.items)
    .slice(0, 6)
    .join(", ");

  return (
    <div
      role="img"
      aria-label={`Code snippet: ${props.name}, ${props.role}, based in ${props.location}${
        stackSummary ? `, working with ${stackSummary}` : ""
      }.`}
      className="w-full overflow-hidden rounded-lg border border-border bg-surface shadow-soft"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-border-neutral px-4 py-3">
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-pill bg-text-tertiary/50" />
          <span className="size-2.5 rounded-pill bg-text-tertiary/50" />
          <span className="size-2.5 rounded-pill bg-text-tertiary/50" />
        </span>
        <span className="font-mono text-caption text-text-tertiary">
          ~/about-me.py
        </span>
      </div>

      <pre className="overflow-x-auto px-4 py-4 font-mono text-caption">
        <code className="grid">
          {lines.map((tokens, lineIndex) => (
            <span
              key={lineIndex}
              className="grid grid-cols-[2ch_1fr] gap-4"
            >
              <span className="code-punct select-none text-right">
                {lineIndex + 1}
              </span>
              <span className="whitespace-pre">
                {tokens.map((codeToken, tokenIndex) => (
                  <span
                    key={tokenIndex}
                    className={tokenClassName[codeToken.kind]}
                  >
                    {codeToken.text}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
