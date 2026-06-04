"use client";
import { IPdfDocument } from "@/types";
import Vapi from "@vapi-ai/web";
import { useRef, useState, useEffect } from "react";
import { CallStatus, Messages, VapiMessage } from "@/types";
import { voiceOptions } from "@/lib/constants";
import { toast } from "sonner";

const VAPI_API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY!;
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_KEY!;

let vapi: InstanceType<typeof Vapi>;

const getVapi = () => {
  if (!vapi) {
    if (!VAPI_API_KEY) {
      throw new Error("VAPI_API_KEY is not set.");
    }
    vapi = new Vapi(VAPI_API_KEY);
  }
  return vapi;
};

export const useVapi = (pdf: IPdfDocument) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [status, setStatus] = useState<CallStatus>("idle");
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState("");
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  const isStoppingRef = useRef(false);

  useEffect(() => {
    const handleMessage = (msg: VapiMessage) => {
      if (msg.type !== "transcript") return;

      if (msg.transcriptType === "final") {
        if (msg.role === "user") setCurrentUserMessage("");
        if (msg.role === "assistant") setCurrentAssistantMessage("");

        setMessages((prev) => {
          const isDupe = prev.some(
            (m) => m.role === msg.role && m.text === msg.transcript,
          );

          return isDupe
            ? prev
            : [...prev, { role: msg.role, text: msg.transcript }];
        });
      }

      if (msg.role === "assistant" && msg.transcriptType === "partial") {
        setCurrentAssistantMessage(msg.transcript);
      }
      if (msg.role === "user" && msg.transcriptType === "partial") {
        setCurrentUserMessage(msg.transcript);
      }
    };

    const handleCallStart = () => {
      isStoppingRef.current = false;
      setStatus("starting");
    };

    const handleCallEnd = () => {
      setStatus("idle");
      toast("Chat ended. Come back anytime!");
    };

    const handleSpeechStart = () => {
      if (!isStoppingRef.current) {
        setStatus("speaking");
      }
    };

    const handleSpeechEnd = () => {
      if (!isStoppingRef.current) {
        setStatus("listening");
      }
    };

    getVapi().on("call-start", handleCallStart);
    getVapi().on("call-end", handleCallEnd);
    getVapi().on("speech-start", handleSpeechStart);
    getVapi().on("speech-end", handleSpeechEnd);
    getVapi().on("message", handleMessage);

    return () => {
      getVapi().off("call-start", handleCallStart);
      getVapi().off("call-end", handleCallEnd);
      getVapi().off("speech-start", handleSpeechStart);
      getVapi().off("speech-end", handleSpeechEnd);
      getVapi().off("message", handleMessage);
    };
  }, []);

  const selectedVoice =
    voiceOptions[pdf.persona ?? "elliot"] ?? voiceOptions["elliot"];

  // START VOICE CALL
  const start = async () => {
    setStatus("connecting");
    try {
      getVapi().start(ASSISTANT_ID, {
        variableValues: {
          pdfId: pdf._id,
        },
        voice: {
          provider: "vapi",
          voiceId: selectedVoice.id as any,
        },
        firstMessage: `Hi! I'm your reading buddy. What would you like to discuss about ${pdf.title} by ${pdf.author}`,
      });
    } catch (e) {
      console.error(`Failed to start call: ${e}`);
    }
  };

  // STOP CALL
  const stop = async () => {
    isStoppingRef.current = true;
    getVapi().stop();
  };

  return {
    start,
    stop,
    currentAssistantMessage,
    currentUserMessage,
    messages,
    status,
  };
};
