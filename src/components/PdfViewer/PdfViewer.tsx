import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useMemo, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "../PdfViewer/PdfViewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

type Props = {
  file: File;
  pageNumber: number;
  onDocumentLoad: (numPages: number) => void;
};

export const PdfViewer = ({ file, pageNumber, onDocumentLoad }: Props) => {
  const [pageWidth, setPageWidth] = useState(640);
  const fileUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const safeWidth = Math.min(screenWidth * 1, 640);
    setPageWidth(safeWidth);

    const resizeHandler = () => {
      const newSafeWidth = Math.min(window.innerWidth * 1, 640);
      setPageWidth(newSafeWidth);
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll(".pdfWrapper a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }, [pageNumber]);

  return (
    <div className={styles.pdfWrapper}>
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => onDocumentLoad(numPages)}
      >
        <Page pageNumber={pageNumber} width={pageWidth} />
      </Document>
    </div>
  );
};
