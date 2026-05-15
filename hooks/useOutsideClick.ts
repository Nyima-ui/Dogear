import { useEffect, useRef } from "react";

const useOutsideClick = (isOpen: boolean, onClose: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        console.log("event fired")
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick, true);
    return () => document.removeEventListener("mousedown", handleClick, true);
  }, [isOpen, onClose]);

  return ref;
};

export default useOutsideClick;
