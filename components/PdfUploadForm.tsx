"use client";
import { useState } from "react";
import { LucideCloudUpload, LucideImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";

const PdfUploadForm = () => {
  const [coverPreviewUrl, setCoverPreviewUrl] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <form className="mt-13 w-full max-w-130 space-y-10">
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
          />
          <label
            htmlFor="pdf-file"
            className="cursor-pointer w-full border border-dashed border-black/20 rounded-md flex items-center justify-center flex-col min-h-36.75 bg-primary-350"
          >
            <LucideCloudUpload className="text-primary" strokeWidth={1.7} />
            <p className="text-foreground/60 text-sm mt-3 text-center">
              Drag it here, or click to browse — up to 50 MB
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

      {/* TODO : once integrated Elevenlabs, write proper voice names and desc  */}
      <div className="space-y-4">
        <legend className="font-medium block">Choose Assistant Voice</legend>
        <fieldset className="grid grid-cols-3 gap-3 max-sm:grid-cols-2">
          {/* FIRST  */}
          <label
            htmlFor="voice-dave"
            className="p-2 rounded-md border border-black/10 cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <input
                type="radio"
                name="assistant"
                value={"dave"}
                id="voice-dave"
                className="peer hidden"
              />
              <div className="size-3.5 rounded-full border-2 border-black/30 flex items-center justify-center peer-checked:border-primary">
                <div className="size-1.75 rounded-full bg-primary opacity-0 [label:has(:checked)_&]:opacity-100" />
              </div>
              <p>Dave</p>
            </div>
            <p className="text-sm text-foreground/60 pl-5 leading-tight mt-1 select-none">
              Relaxed & easy to listen to
            </p>
          </label>
          {/* SECOND  */}
          <label
            htmlFor="voice-sarah"
            className="p-2 rounded-md border border-black/10 cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <input
                type="radio"
                name="assistant"
                value={"sarah"}
                id="voice-sarah"
                className="peer hidden"
              />
              <div className="size-3.5 rounded-full border-2 border-black/30 flex items-center justify-center peer-checked:border-primary">
                <div className="size-1.75 rounded-full bg-primary opacity-0 [label:has(:checked)_&]:opacity-100" />
              </div>
              <p>Sarah</p>
            </div>
            <p className="text-sm text-foreground/60 pl-5 leading-tight mt-1 select-none">
              Warm, clear & easy to follow
            </p>
          </label>
          {/* THIRD  */}
          <label
            htmlFor="voice-jhon"
            className="p-2 rounded-md border border-black/10 cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <input
                type="radio"
                name="assistant"
                value={"jhon"}
                id="voice-jhon"
                className="peer hidden"
              />
              <div className="size-3.5 rounded-full border-2 border-black/30 flex items-center justify-center peer-checked:border-primary">
                <div className="size-1.75 rounded-full bg-primary opacity-0 [label:has(:checked)_&]:opacity-100" />
              </div>
              <p>Jhon</p>
            </div>
            <p className="text-sm text-foreground/60 pl-5 leading-tight mt-1 select-none">
              Sharp, focused, no fluff
            </p>
          </label>
        </fieldset>
      </div>

      <Button
        text="Start Conversing"
        type="submit"
        className="w-full justify-center py-3 text-base mt-4 block"
      />
    </form>
  );
};

export default PdfUploadForm;
