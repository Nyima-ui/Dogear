import { Loader } from "lucide-react";

interface LoadingModalProps {
  title?: string;
  progress?: number;
  stageLabel?: string;
}

const LoadingModal = ({
  title,
  progress = 0,
  stageLabel,
}: LoadingModalProps) => {
  return (
    <div
      className="fixed inset-0 h-full bg-black/20 z-10 backdrop-blur-xs flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-modal-title"
    >
      <div className="bg-background w-[90%] max-w-125 py-6 px-10 rounded-md">
        <h2
          className="font-medium text-xl text-center max-sm:text-base"
          id="loading-modal-title"
        >
          Uploading your PDF
        </h2>
        <p className="text-center mt-2 leading-tight max-sm:text-sm">
          This may take a moment depending on the length of your book.
        </p>

        <div className="mt-9">
          <div className="flex justify-between items-center">
            <p className="text-sm text-foreground/70">{title}</p>
            <Loader className="text-foreground/70 animate-spin" size={16} />
          </div>

          <div className="h-1 mt-2 rounded-md bg-foreground/20 overflow-hidden transition-all duration-300 ease-out">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-sm text-foreground/70 mt-2">{stageLabel}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
