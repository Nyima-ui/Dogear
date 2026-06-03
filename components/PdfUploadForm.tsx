"use client";
import React, { useEffect, useRef, useState } from "react";
import { LucideCloudUpload, LucideImagePlus } from "lucide-react";
import { cn, parsePdf, animateProgress } from "@/lib/utils";
import Button from "./Button";
import { toast } from "sonner";
import { voiceOptions } from "@/lib/constants";
import { upload } from "@vercel/blob/client";
import { IPdf } from "@/types";
import { createPdf, updateTotalSegments } from "../lib/actions/pdf.action";
import { createPdfSegments } from "@/lib/actions/segments.action";
import LoadingModal from "./LoadingModal";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const PdfUploadForm = () => {
  const [coverPreviewUrl, setCoverPreviewUrl] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [progress, setProgress] = useState(0);
  const [stageLabel, setStageLabel] = useState("");

  const router = useRouter();

  const { userId } = useAuth();

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreviewUrl(URL.createObjectURL(file));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfFile(file);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      if (!userId) {
        router.push("/");
        return;
      }

      setLoading(true);

      //Get form data
      const formData = new FormData(e.target);
      const title = formData.get("pdf-title") as string;
      const slug = title.replace(/\s+/g, "-").toLowerCase();
      const author = formData.get("pdf-author") as string;
      const pdfFile = formData.get("pdf-file") as File;
      const persona = formData.get("assistant") as string;

      //Parse pdf
      setStageLabel("Parsing PDF...");
      setProgress(5);
      const { coverBlob, content } = await parsePdf(pdfFile, !coverFile);
      const finalCover = coverFile ?? coverBlob;
      if (!finalCover) throw new Error();
      setProgress(10);

      //Upload pdf file
      setStageLabel("Uploading PDF...");
      setProgress(15);
      const uploadedPdfBlob = await upload(`${slug}_pdf`, pdfFile, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: "application/pdf",
      });
      const pdfUrl = uploadedPdfBlob.url;
      setProgress(30);

      //Upload pdf cover
      setStageLabel("Uploading cover...");
      let coverUrl: string | null = null;
      if (finalCover) {
        const uploadedCoverBlob = await upload(
          `${slug}_cover.png`,
          finalCover,
          {
            access: "public",
            handleUploadUrl: "/api/upload",
            contentType: "image/png",
          },
        );
        coverUrl = uploadedCoverBlob.url;
      }
      setProgress(45);

      setStageLabel("Saving to database...");
      const pdfPayload: IPdf = {
        clerkId: userId,
        pdfUrl,
        coverUrl: coverUrl ?? undefined,
        title,
        slug,
        author,
        persona,
        totalSegments: 0,
      };

      const result = await createPdf(pdfPayload);
      if (!result.success)
        throw new Error(result.error ?? "Failed to save PDF");
      setProgress(55);

      setStageLabel("Creating embeddings...");
      const pdfId = result.data?._id;

      //for progress animation
      const embeddingTimer = animateProgress({
        from: 55,
        to: 88,
        durationMs: 15000,
        setter: setProgress,
      });
      const data = await createPdfSegments(pdfId, content);
      clearInterval(embeddingTimer);

      if (!data.success)
        throw new Error(data.error ?? "Failed to save PDF segments");
      setProgress(90);

      setStageLabel("Finalizing...");
      await updateTotalSegments(pdfId, data.totalSegments ?? 0);
      setProgress(100);
    } catch (e) {
      console.error("Error uploading pdf", e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      formRef.current?.reset();
      setPdfFile(null);
      setCoverFile(null);
      router.push("/reader/uploads");
    }
  };

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <form
      className="mt-13 w-full max-w-130 space-y-10"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {loading && (
        <LoadingModal
          title={pdfFile?.name}
          progress={progress}
          stageLabel={stageLabel}
        />
      )}
      <div className="space-y-6">
        {/* PDF  */}
        <div className="space-y-3">
          <p className="font-medium block">Your book (PDF)</p>
          <input
            type="file"
            name="pdf-file"
            id="pdf-file"
            accept="application/pdf, .pdf"
            className="hidden"
            required
            onChange={handlePdfChange}
          />
          <label
            htmlFor="pdf-file"
            className="cursor-pointer w-full border border-dashed border-black/20 rounded-md flex items-center justify-center flex-col min-h-36.75 bg-primary-350"
          >
            <LucideCloudUpload className="text-primary" strokeWidth={1.7} />
            <p className="text-foreground/60 text-sm mt-3 text-center">
              {pdfFile
                ? pdfFile.name
                : "Drag it here, or click to browse — up to 50 MB"}
            </p>
          </label>
        </div>
        {/* COVER URL  */}
        <div className="space-y-3">
          <p className="font-medium block">Cover image (optional)</p>
          <input
            type="file"
            name="cover-image"
            id="cover-image"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
          />
          <label
            htmlFor="cover-image"
            className={cn(
              `cursor-pointer w-full border border-dashed border-black/20 rounded-md flex items-center justify-center flex-col min-h-36.75 bg-primary-350 bg-center bg-cover bg-no-repeat`,
            )}
            style={{
              backgroundImage: coverPreviewUrl
                ? `url("${coverPreviewUrl}")`
                : "none",
            }}
          >
            <LucideImagePlus className="text-primary" strokeWidth={1.7} />
            <p
              className="text-foreground/60 text-sm mt-3 text-center"
              style={{
                color: coverPreviewUrl
                  ? "var(--background)"
                  : "var(--text-foreground/60)",
              }}
            >
              Skip this and we&apos;ll pull one straight from your PDF
            </p>
          </label>
        </div>
      </div>

      <div className="space-y-6">
        {/* TITLE  */}
        <div className="space-y-2">
          <label htmlFor="pdf-title" className="font-medium block">
            Book title
          </label>
          <input
            type="text"
            placeholder="e.g Atomic Habits"
            id="pdf-title"
            name="pdf-title"
            className="w-full border border-black/10 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        {/* AUTHOR  */}
        <div className="space-y-2">
          <label htmlFor="pdf-author" className="font-medium block">
            Written by
          </label>
          <input
            type="text"
            placeholder="e.g James Clear"
            id="pdf-author"
            name="pdf-author"
            className="w-full border border-black/10 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <legend className="font-medium block">Choose Assistant Voice</legend>
        <fieldset className="grid grid-cols-3 gap-3 max-sm:grid-cols-2">
          {Object.entries(voiceOptions).map(([key, value]) => (
            <label
              key={key}
              htmlFor={`voice-${key}`}
              className="p-2 rounded-md border border-black/10 cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <input
                  type="radio"
                  name="assistant"
                  value={key}
                  id={`voice-${key}`}
                  className="peer hidden"
                />
                <div className="size-3.5 rounded-full border-2 border-black/30 flex items-center justify-center peer-checked:border-primary">
                  <div className="size-1.75 rounded-full bg-primary opacity-0 [label:has(:checked)_&]:opacity-100" />
                </div>
                <p>{value.name}</p>
              </div>
              <p className="text-sm text-foreground/60 pl-5 leading-tight mt-1 select-none">
                {value.description}
              </p>
            </label>
          ))}
        </fieldset>
      </div>

      <Button
        text="Start Conversing"
        type="submit"
        className="w-full justify-center py-3 text-base mt-4 flex"
        loading={loading}
      />
    </form>
  );
};

export default PdfUploadForm;
