import { IPdfDocument } from "@/types";
import Image from "next/image";
import { Mic } from "lucide-react";

interface ChatProps {
  pdf: IPdfDocument;
}

const dummyText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,";

const dummyText2 =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const UserPrompt = ({ message = dummyText }: { message?: string }) => {
  return (
    <div className="mt-5 pl-35 max-sm:pl-8">
      <p className="ml-auto p-2 rounded-md bg-primary-500">{message}</p>
    </div>
  );
};

const AgentMessage = ({ message = dummyText2 }: { message?: string }) => {
  return (
    <div className="mt-5">
      <p className="max-w-120 mr-auto p-2 rounded-md bg-primary-400">
        {message}
      </p>
    </div>
  );
};

const ChatHeader = ({ pdf }: { pdf: IPdfDocument }) => {
  return (
    <header className="bg-primary-800 flex text-foreground gap-6 p-2 drop-shadow-lg">
      <div>
        {pdf.coverUrl ? (
          <Image
            width={70}
            height={105}
            src={pdf.coverUrl}
            alt={pdf.title}
            className="rounded-sm"
          />
        ) : (
          <div className="w-17.5 h-26.25 rounded-sm"></div>
        )}
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-[25px] leading-none">{pdf.title}</h1>
          <p className="mt-1">By {pdf.author}</p>
        </div>

        <div className="flex items-center gap-2.5 text-sm">
          <div className="py-0.5 pl-1.25 pr-2 flex items-center bg-background rounded-md gap-0.5">
            <span className="size-2 bg-[#88EFAB] inline-block rounded-full" />
            <span>Listening</span>
          </div>
          <div className="py-0.5 px-1.5 bg-background rounded-md">
            <span>Voice:</span>
            <span className="pl-1">Rachel</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const Chat = ({ pdf }: ChatProps) => {
  return (
    <div className="mx-auto max-w-165 rounded-md overflow-hidden flex flex-col justify-between h-full relative">
      <ChatHeader pdf={pdf} />
      <ul className="h-full overflow-y-auto chart-scroll pb-30">
        <li>
          <UserPrompt />
        </li>
        <li>
          <AgentMessage />
        </li>
      </ul>

      <form className="border border-primary/30 rounded-md bg-primary-300 mt-10 px-2 py-3 flex items-center justify-between absolute bottom-0 w-full">
        <p className="text-foreground/60">Ask anything about: {pdf.title}</p>
        <button
          className="cursor-pointer p-1.5 bg-primary rounded-full hover:scale-105 transition-transform duration-100"
          type="button"
          aria-label="Start recording"
        >
          <Mic className="text-foreground" size={20} strokeWidth={1.7} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
