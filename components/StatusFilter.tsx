import Square from "@/public/svgs/Square";
import CheckedBox from "@/public/svgs/CheckedBox";
import { styleMapForStatus } from "@/lib/constants";
import { Status } from "@/types";

interface StatusFilterProps {
  activeStatuses: Set<Status>;
  onToggle: (status: Status) => void;
}

const StatusFilter = ({ activeStatuses, onToggle }: StatusFilterProps) => {
  return (
    <ul className="bg-background py-2 rounded-md shadow-md border border-black/10">
      {(["Reading", "Finished", "TBR"] as Status[]).map((status, i) => (
        <li key={i}>
          <button
            className="flex items-center gap-2 py-0.75 cursor-pointer hover:bg-primary-600 w-full px-2"
            onClick={() => onToggle(status)}
          >
            {activeStatuses.has(status) ? <CheckedBox /> : <Square />}
            <span className={styleMapForStatus[status]}>{status}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default StatusFilter;
