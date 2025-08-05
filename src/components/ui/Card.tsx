import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card text-card-foreground shadow-md p-6 transition-all duration-300 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
