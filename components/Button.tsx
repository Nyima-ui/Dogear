"use client";
import { cn } from "@/lib/utils";

const Button = ({ text, className }: { text: string; className?: string }) => {
  return (
    <button
      className={cn(
        `bg-primary px-4 py-2 rounded-md text-foreground text-sm font-medium cursor-pointer`,
        className,
      )}
    >
      {text}
    </button>
  );
};

export default Button;
