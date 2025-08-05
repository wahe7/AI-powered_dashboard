"use client";
import React from "react";

export default function ReportingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <span className="text-4xl font-bold text-muted-foreground animate-breathing">
        Coming Soon
      </span>
      <style jsx>{`
        .animate-breathing {
          animation: breathing 2s ease-in-out infinite;
        }
        @keyframes breathing {
          0% {
            opacity: 0.6;
            transform: scale(0.96);
          }
          50% {
            opacity: 1;
            transform: scale(1.04);
          }
          100% {
            opacity: 0.6;
            transform: scale(0.96);
          }
        }
      `}</style>
    </div>
  );
}
