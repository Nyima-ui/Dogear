"use client";
import { cn } from "@/lib/utils";

const Button = ({
  text,
  className,
  ...props
}: {
  text: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        `bg-primary px-4 py-2 rounded-md text-foreground text-sm font-medium cursor-pointer`,
        className,
      )}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
