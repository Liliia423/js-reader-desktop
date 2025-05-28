import { Document, Page } from "react-pdf";
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
};
