import PdfUploadForm from "@/components/PdfUploadForm";

const UploadPdfPage = () => {
  return (
    <div className="flex items-center flex-col">
      <h1 className="text-[31px]">Add a New Book</h1>
      <p className="text-center mt-2">
        We&apos;ll turn your PDF into a smart, voice-guided reading companion
      </p>
      <PdfUploadForm />
    </div>
  );
};

export default UploadPdfPage;
