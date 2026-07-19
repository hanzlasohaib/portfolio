import type { ComponentPropsWithoutRef } from "react";

import type { HeadingProps } from "@/components/heading";
import type { TextProps } from "@/components/text";

export type CardVariant = "default" | "elevated" | "outlined";

export type CardPadding = "none" | "sm" | "md" | "lg";

export type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  className?: string;
};

export type CardHeaderProps = ComponentPropsWithoutRef<"header"> & {
  className?: string;
};

export type CardTitleProps = HeadingProps;

export type CardDescriptionProps = TextProps;

export type CardContentProps = ComponentPropsWithoutRef<"div"> & {
  className?: string;
};

export type CardFooterProps = ComponentPropsWithoutRef<"footer"> & {
  className?: string;
};
