import PdfUploadCards from "@/components/PdfUploadCards";
import { fetchUserPdfs } from "@/lib/actions/pdf.action";
import { auth } from "@clerk/nextjs/server";
import { IPdfDocument } from "@/types";
import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

const UserPdfsPage = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/");

  const result = await fetchUserPdfs(userId);
  const pdfs: IPdfDocument[] = result.success ? result.data : [];

  return (
    <div>
      <h1 className="text-[31px] max-md:hidden">My books</h1>
      <ul
        aria-label="My books"
        className="mt-6 gap-x-6 max-sm:gap-x-4 gap-y-5 grid justify-items-center grid-cols-7 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2"
      >
        {pdfs.map((pdf) => (
          <PdfUploadCards key={pdf._id} pdf={pdf} />
        ))}

        <li className="h-58 hover:-translate-y-0.5 transition-all duration-200 ease-in hover:drop-shadow-md">
          <Link
            href="/reader/new"
            className="h-full flex items-center justify-center bg-primary-400 border border-dashed border-primary/50 rounded-md w-44"
          >
            <span className="flex gap-1 items-center">
              <Plus className="text-foreground/80" size={20} strokeWidth={2} />
              Add Book
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserPdfsPage;
