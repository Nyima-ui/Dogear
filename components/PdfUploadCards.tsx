import { IPdfDocument } from "@/types";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const PdfUploadCards = ({ pdf }: { pdf: IPdfDocument }) => {
  return (
    <li className="max-w-44.5">
      <Link href={`/reader/chat/${pdf.slug}`}>
        <div className="p-6 max-sm:p-4 rounded-lg bg-primary-400 hover:bg-primary-500 transition-colors duration-200 ease-in">
          {pdf.coverUrl ? (
            <Image
              width={130}
              height={195}
              src={pdf.coverUrl}
              alt={pdf.title}
              className="rounded-md object-cover"
            />
          ) : (
            <div className="w-32.5 h-48.75 bg-primary-400 rounded-md">
              <ImageIcon />
            </div>
          )}
        </div>
        <div className="pl-6 mt-2">
          <p className="max-w-44.5 truncate">{pdf.title}</p>
          <p className="text-sm text-foreground/70">{pdf.author}</p>
        </div>
      </Link>
    </li>
  );
};

export default PdfUploadCards;
