"use client";
import { IPdfDocument } from "@/types";
import Image from "next/image";
import { Mic, Phone } from "lucide-react";
import { useVapi } from "@/hooks/useVapi";
import { useEffect, useRef } from "react";

interface ChatProps {
  pdf: IPdfDocument;
}

const UserPrompt = ({ message }: { message?: string }) => {
  return (
    <div className="mt-5 pl-35 max-sm:pl-8">
      <p className="ml-auto p-2 rounded-md bg-primary-500">{message}</p>
    </div>
  );
};

const AgentMessage = ({ message }: { message?: string }) => {
  return (
    <div className="mt-5">
      <p className="max-w-120 mr-auto p-2 rounded-md bg-primary-400">
        {message}
      </p>
    </div>
  );
};

interface ChatHeaderProps {
  pdf: IPdfDocument;
  status: string;
}

const ChatHeader = ({ pdf, status }: ChatHeaderProps) => {
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
          <div className="py-0.5 pl-1.25 pr-2 flex items-center bg-background rounded-md gap-1.5">
            <span className="size-2 bg-[#88EFAB] inline-block rounded-full" />
            <span>{status}</span>
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
  const {
    start,
    stop,
    currentAssistantMessage,
    currentUserMessage,
    messages,
    status,
  } = useVapi(pdf);

  const bottomRef = useRef<HTMLLIElement>(null);
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const isUserScrolledUp = useRef(false);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const distanceFromButton = el.scrollHeight - el.scrollTop - el.clientHeight;
    isUserScrolledUp.current = distanceFromButton > 100;
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "connecting":
        return { label: "Connecting..." };
      case "starting":
        return { label: "Starting..." };
      case "listening":
        return { label: "Listening..." };
      case "thinking":
        return { label: "Thinking..." };
      case "speaking":
        return { label: "Speaking..." };
      default:
        return { label: "Ready" };
    }
  };

  const statusDisplay = getStatusDisplay();

  useEffect(() => {
    if (!isUserScrolledUp.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, currentAssistantMessage, currentUserMessage]);

  return (
    <div className="mx-auto max-w-165 rounded-md overflow-hidden flex flex-col justify-between h-full relative">
      <ChatHeader pdf={pdf} status={statusDisplay.label} />
      <ul
        className="h-full overflow-y-auto chart-scroll pb-30"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {messages.map((msg, index) =>
          msg.role === "user" ? (
            <li key={index}>
              <UserPrompt message={msg.text} />
            </li>
          ) : (
            <li key={index}>
              <AgentMessage message={msg.text} />
            </li>
          ),
        )}

        {currentUserMessage && (
          <li>
            <UserPrompt message={currentUserMessage} />
          </li>
        )}
        {currentAssistantMessage && (
          <li>
            <AgentMessage message={currentAssistantMessage} />
          </li>
        )}

        <li ref={bottomRef} />
      </ul>

      <form className="border border-primary/30 rounded-md bg-primary-300 mt-10 px-2 py-3 flex items-center justify-between absolute bottom-0 w-full">
        <p className="text-foreground/60">Ask anything about: {pdf.title}</p>
        <div className="space-x-3">
          <button
            className="cursor-pointer p-1.5 bg-primary rounded-full hover:scale-105 transition-transform duration-100"
            type="button"
            aria-label="Start recording"
            onClick={start}
          >
            <Mic className="text-foreground" size={24} strokeWidth={1.7} />
          </button>
          <button
            className="cursor-pointer rounded-full transition-all duration-200 border border-foreground/10 bg-red-300 hover:bg-red-400 active:border-black p-1.5 group"
            type="button"
            aria-label="End session"
            onClick={stop}
          >
            <Phone
              className="text-foreground rotate-135 transition-all duration-200 group-hover:text-background"
              size={24}
              strokeWidth={1.7}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
