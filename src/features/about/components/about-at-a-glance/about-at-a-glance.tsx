import { Reveal } from "@/components/reveal";

type AboutAtAGlanceProps = {
  educationLabel: string;
  experience: string | null;
  projectCount: number;
  location: string;
};

/**
 * Recruiter snapshot as a description list (audit A-6).
 * Values stay derived: education/location from SiteProfile, experience
 * from the current Journey role, project count from published projects.
 */
export function AboutAtAGlance({
  educationLabel,
  experience,
  projectCount,
  location,
}: AboutAtAGlanceProps) {
  const items = [
    { label: "Education", value: educationLabel },
    ...(experience ? [{ label: "Experience", value: experience }] : []),
    {
      label: "Projects",
      value: `${projectCount} ${projectCount === 1 ? "Project" : "Projects"}`,
    },
    { label: "Location", value: location },
  ];

  return (
    <Reveal>
      <dl className="flex flex-col gap-4">
        {items.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="font-mono text-caption uppercase tracking-wider text-text-tertiary">
              {label}
            </dt>
            <dd className="text-small font-medium text-text-primary">{value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
