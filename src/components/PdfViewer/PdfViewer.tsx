{
  /*import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useMemo, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

type Props = {
  file?: File;
};

export const PdfViewer = ({ file }: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const fileUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  const bookId = useMemo(() => {
    return file ? `${file.name}_${file.size}` : "";
  }, [file]);

  const STORAGE_PAGE = `reader-progress:${bookId}`;
  const STORAGE_BOOKMARKS = `reader-bookmarks:${bookId}`;

  useEffect(() => {
    if (!file || !file.name || !file.size) return;

    const keys = Object.keys(localStorage).filter((key) =>
      key.includes(`reader-progress:${file.name}_`)
    );
    const exactMatch = `reader-progress:${bookId}`;

    if (keys.length > 0 && !keys.includes(exactMatch)) {
      keys.forEach((k) => localStorage.removeItem(k));
      localStorage.removeItem(`reader-bookmarks:${file.name}`);
    }

    const saved = localStorage.getItem(STORAGE_PAGE);
    if (saved) {
      const savedPage = parseInt(saved, 10);
      if (!isNaN(savedPage)) setPageNumber(savedPage);
    }

    const savedBookmarks = localStorage.getItem(STORAGE_BOOKMARKS);
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.warn("Помилка читання закладок:", error);
      }
    }

    localStorage.setItem("reader-last-book", bookId);
  }, [file, bookId, STORAGE_PAGE, STORAGE_BOOKMARKS]);

  useEffect(() => {
    if (bookId) {
      localStorage.setItem(STORAGE_PAGE, pageNumber.toString());
    }
  }, [pageNumber, bookId, STORAGE_PAGE]);

  const addBookmark = () => {
    if (!bookmarks.includes(pageNumber)) {
      const updated = [...bookmarks, pageNumber].sort((a, b) => a - b);
      setBookmarks(updated);
      localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(updated));
    }
  };

  const removeBookmark = (pageToRemove: number) => {
    const updated = bookmarks.filter((p) => p !== pageToRemove);
    setBookmarks(updated);
    localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(updated));
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (!file) {
    return (
      <div style={{ padding: "2rem", color: "darkred" }}>
        ⚠️ Файл не передано або не вибрано
      </div>
    );
  }

  return (
    <div>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}>
          ←
        </button>
        <span style={{ margin: "0 10px" }}>
          Сторінка {pageNumber} з {numPages}
        </span>
        <button
          onClick={() => setPageNumber((p) => Math.min(p + 1, numPages || 1))}
        >
          →
        </button>
        <button onClick={addBookmark} style={{ marginLeft: "20px" }}>
          ➕ В закладки
        </button>
      </div>

      {bookmarks.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <strong>Закладки:</strong>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "5px",
            }}
          >
            {bookmarks.map((page) => (
              <div
                key={page}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <button onClick={() => setPageNumber(page)}>{page}</button>
                <button
                  onClick={() => removeBookmark(page)}
                  style={{ color: "red" }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
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

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

type Props = {
  file: File;
};

export const PdfViewer = ({ file }: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const bookId = `${file.name}_${file.size}`;
  const STORAGE_PAGE = `reader-progress:${bookId}`;
  const STORAGE_BOOKMARKS = `reader-bookmarks:${bookId}`;

  const fileUrl = useMemo(() => URL.createObjectURL(file), [file]);

  // ⬇️ Завантажити прогрес і закладки при новому файлі
  useEffect(() => {
    setPageNumber(1);
    setBookmarks([]);

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

  return (
    <div>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}>
          ←
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {pageNumber} of {numPages}
        </span>
        <button
          onClick={() => setPageNumber((p) => Math.min(p + 1, numPages || 1))}
        >
          →
        </button>
        <button onClick={addBookmark} style={{ marginLeft: "20px" }}>
          ➕ Add current page to bookmarks
        </button>
      </div>

      {bookmarks.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <strong>Bookmarks</strong>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "5px",
            }}
          >
            {bookmarks.map((page) => (
              <div
                key={page}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <button onClick={() => setPageNumber(page)}>{page}</button>
                <button
                  onClick={() => removeBookmark(page)}
                  style={{ color: "red" }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
