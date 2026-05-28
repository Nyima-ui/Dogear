import PdfUploadForm from "@/components/PdfUploadForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const UploadPdfPage = () => {
  return (
    <div className="flex items-center flex-col relative">
      <Link
        href="/reader/uploads"
        className="fixed top-8 left-19.5 bg-white p-1 rounded-md hover:shadow-lg transition-shadow duration-100 ease-in border border-primary/50 hover:border-none max-md:top-13 max-md:left-8 "
      >
        <ArrowLeft className="text-foreground" strokeWidth={1.7} />
      </Link>
      <h1 className="text-[31px]">Add a New Book</h1>
      <p className="text-center mt-2">
        We&apos;ll turn your PDF into a smart, voice-guided reading companion
      </p>
      <PdfUploadForm />
    </div>
  );
};

export default UploadPdfPage;
