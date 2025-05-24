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

  const fileUrl = useMemo(() => URL.createObjectURL(file), [file]);

  // ⬇️ Завантажити прогрес і закладки при новому файлі
  useEffect(() => {
    setPageNumber(1);
    setBookmarks([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) setFile(selected);
    };

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
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={pageWidth} />
      </Document>

      <div style={{ marginTop: "10px" }}>
     
        <label style={{ cursor: "pointer" }}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <span style={{ fontSize: "2rem" }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.3583 3.59906H22.5924C22.1353 3.59906 21.7061 3.84225 21.4398 4.25225L20.7613 5.29687C20.4949 5.70687 20.0658 5.95006 19.6086 5.95006H6.33525C5.55213 5.95006 4.91725 6.65037 4.91725 7.51431V24.0487C4.91725 24.9126 5.55213 25.6129 6.33525 25.6129H26.7919C26.7512 25.7942 26.7306 25.9794 26.7305 26.1651C26.7305 27.5584 27.86 28.688 29.2534 28.688C30.5821 28.688 31.6701 27.6606 31.7683 26.3571C31.773 26.3255 31.7763 26.2933 31.7763 26.2604V5.16331C31.7763 4.29937 31.1414 3.59906 30.3583 3.59906Z"
                fill="#BC7520"
              />
              <path
                d="M10.4876 11.4468L11.3357 12.29C11.6686 12.6209 12.1372 12.8172 12.5944 12.8172H25.8678C26.6509 12.8172 27.3995 13.3824 27.5398 14.0797L30.2248 27.4254C30.3651 28.1227 29.8439 28.688 29.0608 28.688H5.03782C4.25469 28.688 3.50613 28.1227 3.36582 27.4254L1.10363 16.1811L0.42682 12.8172L0.29907 12.1822C0.158757 11.4849 0.679882 10.9196 1.46301 10.9196H9.22888C9.68607 10.9196 10.1548 11.1159 10.4876 11.4468Z"
                fill="#FFB636"
              />
            </svg>
          </span>
        </label>
        <button
          className={styles.iconsBottom}
          onClick={addBookmark}
          style={{ marginLeft: "20px" }}
        >
          <svg
            className={styles.iconBookmark}
            width="20"
            height="27"
            viewBox="0 0 20 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25 0.5H18.75C19.0815 0.5 19.3995 0.631696 19.6339 0.866116C19.8683 1.10054 20 1.41848 20 1.75V25.6787C20.0001 25.7905 19.9703 25.9003 19.9136 25.9966C19.8569 26.0929 19.7755 26.1722 19.6777 26.2264C19.5799 26.2805 19.4694 26.3074 19.3577 26.3043C19.246 26.3012 19.1371 26.2682 19.0425 26.2087L10 20.5375L0.9575 26.2075C0.86296 26.2669 0.754234 26.2999 0.642627 26.303C0.531021 26.3062 0.420608 26.2794 0.322869 26.2254C0.22513 26.1714 0.143634 26.0923 0.0868535 25.9961C0.0300735 25.9 8.30886e-05 25.7904 0 25.6787V1.75C0 1.41848 0.131696 1.10054 0.366117 0.866116C0.600537 0.631696 0.918479 0.5 1.25 0.5Z"
              fill="#767674"
            />
          </svg>
        </button>
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
  setFile: (f: File) => void;
};

export const PdfViewer = ({ file, setFile }: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [pageWidth, setPageWidth] = useState(800);

  const bookId = `${file.name}_${file.size}`;
  const STORAGE_PAGE = `reader-progress:${bookId}`;
  const STORAGE_BOOKMARKS = `reader-bookmarks:${bookId}`;

  const fileUrl = useMemo(() => URL.createObjectURL(file), [file]);

  // ✅ handleResize окремо
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const safeWidth = Math.min(screenWidth * 0.95, 800);
      setPageWidth(safeWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ завантаження прогресу та закладок
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

  // 💾 зберігати прогрес
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={pageWidth} />
      </Document>

      {/* Нижня панель */}
      <div style={{ marginTop: "10px" }}>
        {/* Кнопка завантаження нового файлу */}
        <label style={{ cursor: "pointer" }}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <span style={{ fontSize: "2rem" }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.3583 3.59906H22.5924C22.1353 3.59906 21.7061 3.84225 21.4398 4.25225L20.7613 5.29687C20.4949 5.70687 20.0658 5.95006 19.6086 5.95006H6.33525C5.55213 5.95006 4.91725 6.65037 4.91725 7.51431V24.0487C4.91725 24.9126 5.55213 25.6129 6.33525 25.6129H26.7919C26.7512 25.7942 26.7306 25.9794 26.7305 26.1651C26.7305 27.5584 27.86 28.688 29.2534 28.688C30.5821 28.688 31.6701 27.6606 31.7683 26.3571C31.773 26.3255 31.7763 26.2933 31.7763 26.2604V5.16331C31.7763 4.29937 31.1414 3.59906 30.3583 3.59906Z"
                fill="#BC7520"
              />
              <path
                d="M10.4876 11.4468L11.3357 12.29C11.6686 12.6209 12.1372 12.8172 12.5944 12.8172H25.8678C26.6509 12.8172 27.3995 13.3824 27.5398 14.0797L30.2248 27.4254C30.3651 28.1227 29.8439 28.688 29.0608 28.688H5.03782C4.25469 28.688 3.50613 28.1227 3.36582 27.4254L1.10363 16.1811L0.42682 12.8172L0.29907 12.1822C0.158757 11.4849 0.679882 10.9196 1.46301 10.9196H9.22888C9.68607 10.9196 10.1548 11.1159 10.4876 11.4468Z"
                fill="#FFB636"
              />
            </svg>
          </span>
        </label>

        {/* Додати закладку */}
        <button
          className={styles.iconsBottom}
          onClick={addBookmark}
          style={{ marginLeft: "20px" }}
        >
          <svg
            className={styles.iconBookmark}
            width="20"
            height="27"
            viewBox="0 0 20 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25 0.5H18.75C19.0815 0.5 19.3995 0.631696 19.6339 0.866116C19.8683 1.10054 20 1.41848 20 1.75V25.6787C20.0001 25.7905 19.9703 25.9003 19.9136 25.9966C19.8569 26.0929 19.7755 26.1722 19.6777 26.2264C19.5799 26.2805 19.4694 26.3074 19.3577 26.3043C19.246 26.3012 19.1371 26.2682 19.0425 26.2087L10 20.5375L0.9575 26.2075C0.86296 26.2669 0.754234 26.2999 0.642627 26.303C0.531021 26.3062 0.420608 26.2794 0.322869 26.2254C0.22513 26.1714 0.143634 26.0923 0.0868535 25.9961C0.0300735 25.9 8.30886e-05 25.7904 0 25.6787V1.75C0 1.41848 0.131696 1.10054 0.366117 0.866116C0.600537 0.631696 0.918479 0.5 1.25 0.5Z"
              fill="#767674"
            />
          </svg>
        </button>

        {/* Навігація сторінками */}
        <button onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}>
          {" "}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.03 9.41083C2.87377 9.56711 2.78601 9.77903 2.78601 10C2.78601 10.221 2.87377 10.4329 3.03 10.5892L7.74417 15.3033C7.82104 15.3829 7.91299 15.4464 8.01466 15.4901C8.11633 15.5338 8.22568 15.5567 8.33633 15.5577C8.44698 15.5587 8.55671 15.5376 8.65913 15.4957C8.76154 15.4538 8.85458 15.3919 8.93283 15.3137C9.01107 15.2354 9.07295 15.1424 9.11485 15.04C9.15675 14.9375 9.17784 14.8278 9.17688 14.7172C9.17591 14.6065 9.15292 14.4972 9.10925 14.3955C9.06558 14.2938 9.00209 14.2019 8.9225 14.125L5.63083 10.8333H16.6667C16.8877 10.8333 17.0996 10.7455 17.2559 10.5893C17.4122 10.433 17.5 10.221 17.5 10C17.5 9.77899 17.4122 9.56702 17.2559 9.41074C17.0996 9.25446 16.8877 9.16667 16.6667 9.16667H5.63083L8.9225 5.875C9.0743 5.71783 9.15829 5.50733 9.15639 5.28883C9.1545 5.07033 9.06685 4.86132 8.91235 4.70682C8.75784 4.55231 8.54883 4.46467 8.33033 4.46277C8.11184 4.46087 7.90133 4.54487 7.74417 4.69666L3.03 9.41083Z"
              fill="#1272EC"
            />

            <defs>
              width="20" height="20" fill="white" transform="matrix(0 -1 1 0 0
              20)"
            </defs>
          </svg>
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {pageNumber} of {numPages}
        </span>
        <button
          onClick={() => setPageNumber((p) => Math.min(p + 1, numPages || 1))}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.97 10.5892C17.1262 10.4329 17.214 10.221 17.214 10C17.214 9.77903 17.1262 9.56711 16.97 9.41083L12.2558 4.69667C12.179 4.61708 12.087 4.55359 11.9853 4.50992C11.8837 4.46624 11.7743 4.44325 11.6637 4.44229C11.553 4.44133 11.4433 4.46242 11.3409 4.50432C11.2385 4.54622 11.1454 4.60809 11.0672 4.68634C10.9889 4.76458 10.9271 4.85763 10.8851 4.96004C10.8432 5.06245 10.8222 5.17219 10.8231 5.28284C10.8241 5.39348 10.8471 5.50283 10.8907 5.6045C10.9344 5.70617 10.9979 5.79813 11.0775 5.875L14.3692 9.16667H3.33333C3.11232 9.16667 2.90036 9.25447 2.74408 9.41075C2.5878 9.56703 2.5 9.77899 2.5 10C2.5 10.221 2.5878 10.433 2.74408 10.5893C2.90036 10.7455 3.11232 10.8333 3.33333 10.8333H14.3692L11.0775 14.125C10.9257 14.2822 10.8417 14.4927 10.8436 14.7112C10.8455 14.9297 10.9331 15.1387 11.0877 15.2932C11.2422 15.4477 11.4512 15.5353 11.6697 15.5372C11.8882 15.5391 12.0987 15.4551 12.2558 15.3033L16.97 10.5892Z"
              fill="#1272EC"
            />

            <defs>
              width="20" height="20" fill="white" transform="matrix(0 1 -1 0 20
              0)"
            </defs>
          </svg>
        </button>
      </div>

      {/* Закладки */}
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
