import { Document, Page } from "react-pdf";
import styles from "./BookmarkPreviewModal.module.css";

type Props = {
  file: File;
  page: number;
  onClose: () => void;
  onDelete: (page: number) => void;
};

export const BookmarkPreviewModal = ({
  file,
  page,
  onClose,
  onDelete,
}: Props) => {
  return (
    <div className={styles.modal} onMouseLeave={onClose}>
      <div className={styles.topBar}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
        <button className={styles.deleteBtn} onClick={() => onDelete(page)}>
          ✗
        </button>
      </div>
      <div className={styles.preview}>
        <Document file={file}>
          <Page pageNumber={page} width={200} renderTextLayer={false} />
        </Document>
        <div className={styles.pageLabel}>Page {page}</div>
      </div>
    </div>
  );
};
