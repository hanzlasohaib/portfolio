/**
 * Public API of the `journey` feature (docs/architecture/feature-template.md).
 * Pages should import from here rather than reaching into `components/`.
 *
 * `JourneyCard`/`JourneyTimeline` are exported so the full `/journey`
 * page (docs/project-design/pages.md § Journey) can reuse them once
 * implemented in a later Phase 2 sprint — this sprint only implements
 * the Home page "Journey Timeline Preview" (`JourneySection`).
 */
export { JourneyCard } from "./components/journey-card";
export { JourneySection } from "./components/journey-section";
export { JourneyTimeline } from "./components/journey-timeline";
export type { JourneyEntry } from "./constants/journey-data";
