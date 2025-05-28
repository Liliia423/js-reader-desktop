{
  /*import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useMemo, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "../PdfViewer/PdfViewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

type Props = {
  file: File;
  setFile: (f: File) => void;
};

export const PdfViewer = ({ file }: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [pageWidth, setPageWidth] = useState(800);

  const bookId = `${file.name}_${file.size}`;
  const STORAGE_PAGE = `reader-progress:${bookId}`;
  const STORAGE_BOOKMARKS = `reader-bookmarks:${bookId}`;
  const [canvasWidth, setCanvasWidth] = useState(800);

  const fileUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      setCanvasWidth(canvas.width || 800);
    }
  }, [pageNumber]);

  // ⬇️ Завантажити прогрес і закладки при новому файлі
  useEffect(() => {
    setPageNumber(1);
    setBookmarks([]);

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const safeWidth = Math.min(screenWidth * 0.95, 800);
      setPageWidth(safeWidth);
    };

    handleResize(); // викликаємо один раз при монтуванні
    window.addEventListener("resize", handleResize);
    const savedPage = localStorage.getItem(STORAGE_PAGE);

    if (savedPage) {
      const num = parseInt(savedPage, 10);
      if (!isNaN(num)) setPageNumber(num);
    }

    const savedBookmarks = localStorage.getItem(STORAGE_BOOKMARKS);
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (err) {
        console.warn("❗ Помилка читання закладок:", err);
      }
    }

    localStorage.setItem("reader-last-book", bookId);
  }, [file, STORAGE_PAGE, STORAGE_BOOKMARKS, bookId]);

  // 💾 Зберігати сторінку при зміні
  useEffect(() => {
    localStorage.setItem(STORAGE_PAGE, pageNumber.toString());

    const links = document.querySelectorAll(".pdfWrapper a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }, [pageNumber, STORAGE_PAGE]);

  const addBookmark = () => {
    if (!bookmarks.includes(pageNumber)) {
      const updated = [...bookmarks, pageNumber].sort((a, b) => a - b);
      setBookmarks(updated);
      localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(updated));
    }
  };

  const removeBookmark = (page: number) => {
    const updated = bookmarks.filter((p) => p !== page);
    setBookmarks(updated);
    localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(updated));
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const isBookmarked = bookmarks.includes(pageNumber);

  return (
    <div>
      <div className={styles.firstBlock}>
        <div className={styles.pdfWrapper}>
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={pageWidth} />
          </Document>
        </div>
      </div>

      <div className={styles.pagesAndMark}>
        <div className={styles.arrows}>
          <button
            className={styles.navBtn}
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
          >
            ←
          </button>
          <span className={styles.pageLabel} style={{ margin: "0 10px" }}>
            Page {pageNumber} of {numPages}
          </span>
          <button
            className={styles.navBtn}
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages || 1))}
          >
            →
          </button>
        </div>
        <button className={styles.iconsBottom} onClick={addBookmark}>
          <svg
            className={`${styles.bookmarkIcon} ${
              isBookmarked ? styles.bookmarkIconActive : ""
            }`}
            width="20"
            height="27"
            viewBox="0 0 20 27"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.25 0.5H18.75C19.0815 0.5 19.3995 0.631696 19.6339 0.866116C19.8683 1.10054 20 1.41848 20 1.75V25.6787C20.0001 25.7905 19.9703 25.9003 19.9136 25.9966C19.8569 26.0929 19.7755 26.1722 19.6777 26.2264C19.5799 26.2805 19.4694 26.3074 19.3577 26.3043C19.246 26.3012 19.1371 26.2682 19.0425 26.2087L10 20.5375L0.9575 26.2075C0.86296 26.2669 0.754234 26.2999 0.642627 26.303C0.531021 26.3062 0.420608 26.2794 0.322869 26.2254C0.22513 26.1714 0.143634 26.0923 0.0868535 25.9961C0.0300735 25.9 8.30886e-05 25.7904 0 25.6787V1.75C0 1.41848 0.131696 1.10054 0.366117 0.866116C0.600537 0.631696 0.918479 0.5 1.25 0.5Z" />
          </svg>
        </button>
      </div>
      {bookmarks.length > 0 && (
        <div
          className={styles.bookmarksFirstBlock}
          style={{ maxWidth: `${canvasWidth}px` }}
        >
          {bookmarks.map((page) => (
            <div className={styles.actionBookmarks} key={page}>
              <button
                className={styles.bookmarkBtn}
                onClick={() => setPageNumber(page)}
              >
                {page}
              </button>
              <button
                className={styles.removeBtn}
                onClick={() => removeBookmark(page)}
                style={{ color: "red" }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};*/
}
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useMemo, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "../PdfViewer/PdfViewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

type Props = {
  file: File;
  addBookmark: (page: number) => void;
  bookmarks: number[];
  setPageNumberExternal: (page: number) => void;
};

export const PdfViewer = ({
  file,
  addBookmark,
  bookmarks,
  setPageNumberExternal,
}: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(800);

  const fileUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const width = canvas.width || 800;
      setPageWidth(width);
    }
  }, [pageNumber]);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const safeWidth = Math.min(screenWidth * 0.95, 800);
    setPageWidth(safeWidth);

    window.addEventListener("resize", () => {
      const newSafeWidth = Math.min(window.innerWidth * 0.95, 800);
      setPageWidth(newSafeWidth);
    });
  }, []);

  useEffect(() => {
    setPageNumberExternal(pageNumber);
  }, [pageNumber, setPageNumberExternal]);

  useEffect(() => {
    const links = document.querySelectorAll(".pdfWrapper a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }, [pageNumber]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const isBookmarked = bookmarks.includes(pageNumber);

  return (
    <div>
      <div className={styles.firstBlock}>
        <div className={styles.pdfWrapper}>
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={pageWidth} />
          </Document>
        </div>
      </div>

      <div className={styles.pagesAndMark}>
        <div className={styles.arrows}>
          <button
            className={styles.navBtn}
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
          >
            ←
          </button>
          <span className={styles.pageLabel} style={{ margin: "0 10px" }}>
            Page {pageNumber} of {numPages}
          </span>
          <button
            className={styles.navBtn}
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages || 1))}
          >
            →
          </button>
        </div>

        <button
          className={styles.iconsBottom}
          onClick={() => addBookmark(pageNumber)}
        >
          <svg
            className={`${styles.bookmarkIcon} ${
              isBookmarked ? styles.bookmarkIconActive : ""
            }`}
            width="20"
            height="27"
            viewBox="0 0 20 27"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.25 0.5H18.75C19.0815 0.5 19.3995 0.631696 19.6339 0.866116C19.8683 1.10054 20 1.41848 20 1.75V25.6787C20.0001 25.7905 19.9703 25.9003 19.9136 25.9966C19.8569 26.0929 19.7755 26.1722 19.6777 26.2264C19.5799 26.2805 19.4694 26.3074 19.3577 26.3043C19.246 26.3012 19.1371 26.2682 19.0425 26.2087L10 20.5375L0.9575 26.2075C0.86296 26.2669 0.754234 26.2999 0.642627 26.303C0.531021 26.3062 0.420608 26.2794 0.322869 26.2254C0.22513 26.1714 0.143634 26.0923 0.0868535 25.9961C0.0300735 25.9 8.30886e-05 25.7904 0 25.6787V1.75C0 1.41848 0.131696 1.10054 0.366117 0.866116C0.600537 0.631696 0.918479 0.5 1.25 0.5Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
