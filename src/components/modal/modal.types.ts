import type { ReactNode } from "react";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  className?: string;
  children: ReactNode;
};
