import { useEffect, useRef } from "react";

const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  isOpen: boolean,
  onClose: () => void,
  disabled?: boolean,
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (disabled) return;
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick, true);
    return () => document.removeEventListener("mousedown", handleClick, true);
  }, [isOpen, disabled, onClose]);

  return ref;
};

export default useOutsideClick;
