import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Chat from "@/components/Chat";
import { fetchPdfBySlug } from "@/lib/actions/pdf.action";

const ChatPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const result = await fetchPdfBySlug(slug);
  const pdf = result.success ? (result.data ?? {}) : {};
  return (
    <div className="h-[91.5vh] max-md:h-[88vh]">
      <Link
        href="/reader/uploads"
        className="fixed top-8 left-19.5 bg-white p-1 rounded-md hover:shadow-lg transition-shadow duration-100 ease-in border border-primary/50 hover:border-none max-md:top-13 max-md:left-5 z-10"
      >
        <ArrowLeft className="text-foreground" strokeWidth={1.7} />
      </Link>

      <Chat pdf={pdf} />
    </div>
  );
};

export default ChatPage;
