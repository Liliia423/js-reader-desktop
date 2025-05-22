// src/pages/ReaderPage/ReaderPage.tsx
import { useState } from "react";
import { PdfViewer } from "../../components/PdfViewer/PdfViewer";

export const ReaderPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {file && <PdfViewer file={file} />}
    </div>
  );
};
