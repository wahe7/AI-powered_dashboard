import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  rounded?: string;
}

export function Skeleton({ className, width, height, rounded = "md" }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-muted/30",
        rounded && `rounded-${rounded}`,
        className
      )}
      style={{ width, height }}
    />
  );
}

export default Skeleton;
