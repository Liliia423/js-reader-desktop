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
    <div style={{ padding: "1rem" }}>
      {/* Стилізована кнопка */}
      <label htmlFor="pdfUpload" style={{ cursor: "pointer" }}>
        <button style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
          📂 Open new file
        </button>
      </label>

      {/* Невидиме поле вибору файлу */}
      <input
        id="pdfUpload"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Назва відкритого файлу */}
      {file && (
        <div style={{ marginTop: "1rem", fontStyle: "italic", color: "#555" }}>
          📄 Відкрито: <strong>{file.name}</strong>
        </div>
      )}

      {/* PDF-переглядач */}
      {file && <PdfViewer file={file} />}
    </div>
  );
};
