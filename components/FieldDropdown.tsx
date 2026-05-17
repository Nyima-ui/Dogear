import { ChevronDown } from "lucide-react";

interface FieldDropdownProps {
  label: string;
  display: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

const FieldDropdown = ({
  label,
  display,
  isOpen,
  onToggle,
  dropdownRef,
  children,
}: FieldDropdownProps) => {
  return (
    <div className="flex items-center">
      <span className="w-34 text-foreground/70">{label}</span>
      <div
        className="border-b border-black/20 py-2 flex justify-between grow cursor-pointer relative"
        onClick={onToggle}
      >
        {display}

        <ChevronDown
          size={20}
          className="text-foreground/30"
          strokeWidth={1.7}
        />

        {isOpen && (
          <div ref={dropdownRef} className="absolute top-1 left-0 z-50 w-full">
            <ul
              className="bg-background w-full border rounded-md border-black/10 p-1 shadow-lg shadow-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldDropdown;
