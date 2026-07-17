import type { ComponentPropsWithoutRef } from "react";

export type ContainerSize = "app" | "content";

export type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
};
