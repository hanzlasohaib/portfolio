import type { FeaturedProject } from "../../constants/projects-data";

export type ProjectPreviewModalProps = {
  open: boolean;
  project: FeaturedProject | null;
  onClose: () => void;
};
