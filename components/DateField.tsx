import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";

interface DateFieldProps {
  label: string;
  value: Date | undefined;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (date: Date | undefined) => void;
  calendarRef: React.RefObject<HTMLDivElement | null>;
}

const DateField = ({
  label,
  value,
  isOpen,
  onToggle,
  onChange,
  calendarRef,
}: DateFieldProps) => {
  return (
    <div className="flex items-center">
      <span className="w-34 text-foreground/70">{label}</span>

      <div
        className={cn(
          `border-b border-black/20 py-2 flex justify-between cursor-pointer relative grow`,
          isOpen && "grow-0 w-59.5",
        )}
        onClick={onToggle}
      >
        <span
          className={cn(
            `text-sm`,
            value ? "text-foreground" : "text-foreground/30",
          )}
        >
          {value
            ? value.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Empty"}
        </span>
        {isOpen && (
          <div
            className="absolute bottom-0"
            ref={calendarRef}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar
              mode="single"
              className="w-59.5 bg-background text-foreground border border-black/10 rounded-md shadow-md text-sm"
              selected={value}
              onSelect={(date: Date | undefined) => {
                onChange(date);
              }}
              fixedWeeks
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateField;
