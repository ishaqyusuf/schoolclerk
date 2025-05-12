"use client";

import React from "react";
import { useDataSkeleton } from "@/hooks/use-data-skeleton";
import { Placeholders } from "@/utils/constants";

import { cn } from "@school-clerk/ui/cn";

interface Props {
  children?;
  className?: string;
  placeholder?;
  pok?: keyof typeof Placeholders;
  as?: any;
}
export function DataSkeleton({
  children = null,
  className = "",
  placeholder = "",
  as = "div",
  pok,
}: Props) {
  const ctx = useDataSkeleton();
  if (!placeholder && pok) placeholder = Placeholders[pok];
  if (ctx?.loading) {
    return as === React.Fragment ? (
      <React.Fragment>
        <span className="animate-pulse rounded-md bg-muted opacity-0">
          {placeholder}
        </span>
      </React.Fragment>
    ) : (
      React.createElement(
        as,
        {
          className: cn("animate-pulse rounded-md bg-muted", className),
        },
        <span className="opacity-0">{placeholder}</span>,
      )
    );
  }

  return as === React.Fragment ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    React.createElement(
      as,
      { className: !ctx?.loading ? "" : cn(className) },
      children,
    )
  );
}
