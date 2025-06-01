{
  /*import { Document, Page } from "react-pdf";
import styles from "./BookmarkPreviewModal.module.css";

type Props = {
  file: File;
  page: number;
  onClose: () => void;
};

export const BookmarkPreviewModal = ({ file, page, onClose }: Props) => {
  return (
    <div className={styles.modal} onMouseLeave={onClose}>
      <div className={styles.preview}>
        <Document file={file}>
          <Page
            pageNumber={page}
            width={600}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
        <div className={styles.pageLabel}>Page {page}</div>
      </div>
    </div>
  );
};*/
}

import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import styles from "./BookmarkPreviewModal.module.css";

type Props = {
  file: File;
  page: number;
  onClose: () => void;
};

export const BookmarkPreviewModal = ({ file, page, onClose }: Props) => {
  const [modalWidth, setModalWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      const maxWidth = window.innerWidth;
      setModalWidth(Math.floor(maxWidth * 0.5));
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className={styles.modal} onMouseLeave={onClose}>
      <div className={styles.preview}>
        <Document file={file}>
          <Page
            pageNumber={page}
            width={modalWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
        <div className={styles.pageLabel}>Page {page}</div>
      </div>
    </div>
  );
};
