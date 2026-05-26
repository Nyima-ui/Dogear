"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Button = ({
  text,
  className,
  loading,
  ...props
}: {
  text: string;
  className?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        `bg-primary px-4 py-2 rounded-md text-foreground text-sm font-medium cursor-pointer flex items-center gap-1 hover:bg-[#edc370] transition-colors duration-100 ease-in`,
        className,
      )}
      disabled={loading}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {text}
    </button>
  );
};

export default Button;
