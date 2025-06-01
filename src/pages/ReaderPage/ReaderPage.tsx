import { useEffect, useState } from "react";
import { PdfViewer } from "../../components/PdfViewer/PdfViewer";
import { useTabContext } from "../../context/TabContext";
import { BookmarkPreviewModal } from "../../components/BookmarkPreviewModal/BookmarkPreviewModal";
import { FloatingMessage } from "../../components/FloatingMessage/FloatingMessage";
import styles from "../ReaderPage/ReaderPage.module.css";

export const ReaderPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [hoveredBookmark, setHoveredBookmark] = useState<number | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [pageInput, setPageInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { addTab } = useTabContext();
  const pageOffset = 0;

  const isBookmarked = bookmarks.includes(currentPage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setBookmarks([]);
      setCurrentPage(1);
      setFileInputKey((prev) => prev + 1);

      const id = `${selected.name}_${selected.size}`;
      addTab({ id, title: selected.name, file: selected });

      const STORAGE_PAGE = `reader-progress:${id}`;
      const STORAGE_BOOKMARKS = `reader-bookmarks:${id}`;

      const savedPage = parseInt(localStorage.getItem(STORAGE_PAGE) || "", 10);
      if (!isNaN(savedPage)) setCurrentPage(savedPage);

      const savedBookmarks = localStorage.getItem(STORAGE_BOOKMARKS);
      if (savedBookmarks) {
        try {
          setBookmarks(JSON.parse(savedBookmarks));
        } catch (err) {
          console.warn("❗ Помилка читання закладок:", err);
        }
      }

      localStorage.setItem("reader-last-book", id);
    }
  };

  const addBookmark = (page: number) => {
    if (!bookmarks.includes(page)) {
      const updated = [...bookmarks, page].sort((a, b) => a - b);
      setBookmarks(updated);
      if (file) {
        const id = `${file.name}_${file.size}`;
        localStorage.setItem(`reader-bookmarks:${id}`, JSON.stringify(updated));
      }
    }
  };

  const removeBookmark = (page: number) => {
    const updated = bookmarks.filter((p) => p !== page);
    setBookmarks(updated);
    if (file) {
      const id = `${file.name}_${file.size}`;
      localStorage.setItem(`reader-bookmarks:${id}`, JSON.stringify(updated));
    }
  };

  useEffect(() => {
    if (file) {
      const id = `${file.name}_${file.size}`;
      localStorage.setItem(`reader-progress:${id}`, currentPage.toString());
    }
  }, [currentPage, file]);

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => setErrorMessage(""), 4000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  return (
    <div className={styles.viewerPage}>
      {/*<div className={styles.header}>
        <div className={styles.downloadBlock}>
          <label style={{ cursor: "pointer" }}>
            <input
              key={fileInputKey}
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
          <h1 className={styles.headerHeropage}>
            {file ? "Open New File" : "PDF Viewer for Everyone"}
          </h1>
       
        </div>
      </div>*/}
      {!file && (
        <div className={styles.header}>
          <div className={styles.downloadBlock}>
            <label style={{ cursor: "pointer" }}>
              <input
                key={fileInputKey}
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
            <h1 className={styles.headerHeropage}>PDF Viewer for Everyone</h1>
          </div>
        </div>
      )}

      {file && (
        <div>
          <button className={styles.closeBtn} onClick={() => setFile(null)}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.3334 16C26.7907 16 28.156 16.3893 29.3334 17.0707V8C29.3334 7.64638 29.1929 7.30724 28.9428 7.05719C28.6928 6.80714 28.3536 6.66667 28 6.66667H16.552L13.8854 4H4.00002C3.6464 4 3.30726 4.14048 3.05721 4.39052C2.80716 4.64057 2.66669 4.97971 2.66669 5.33333V26.6667C2.66669 27.0203 2.80716 27.3594 3.05721 27.6095C3.30726 27.8595 3.6464 28 4.00002 28H18.404C17.7018 26.7838 17.3322 25.4041 17.3322 23.9997C17.3323 22.5953 17.702 21.2157 18.4043 19.9995C19.1066 18.7833 20.1166 17.7734 21.333 17.0714C22.5493 16.3693 23.929 15.9998 25.3334 16ZM27.2187 24L30.048 26.828L28.1614 28.7133L25.3347 25.8867L22.5054 28.7133L20.62 26.828L23.4467 24L20.62 21.172L22.5054 19.2853L25.3334 22.1147L28.1614 19.2853L30.048 21.172L27.2187 24Z"
                fill="#e53935"
              />
            </svg>
          </button>

          <div className={styles.marksAndFile}>
            <div className={styles.bookmarksWrapper}>
              {bookmarks.length > 0 && (
                <div className={styles.bookmarksFirstBlock}>
                  {bookmarks.map((page) => {
                    const isActive = currentPage === page + pageOffset;
                    return (
                      <div
                        key={page}
                        className={`${styles.actionBookmarks} ${
                          isActive ? styles.activeBookmark : ""
                        }`}
                        onMouseEnter={() => setHoveredBookmark(page)}
                        onMouseLeave={() => setHoveredBookmark(null)}
                      >
                        <button
                          className={styles.bookmarkBtn}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeBookmark(page)}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <PdfViewer
              key={file.name + file.lastModified}
              file={file}
              pageNumber={currentPage}
              onDocumentLoad={setNumPages}
            />

            {hoveredBookmark !== null && (
              <BookmarkPreviewModal
                page={hoveredBookmark}
                file={file}
                onClose={() => setHoveredBookmark(null)}
              />
            )}
          </div>
        </div>
      )}

      {file && (
        <footer className={styles.pagesAndMark}>
          <div className={styles.arrows}>
            <button
              className={styles.navBtn}
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            >
              ←
            </button>

            <span className={styles.pageLabel}>
              Page{" "}
              <input
                type="number"
                value={pageInput || currentPage.toString()}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const num = parseInt(pageInput, 10);
                    if (isNaN(num) || num < 1 || (numPages && num > numPages)) {
                      setErrorMessage(
                        "This page does not exist. Please enter a valid page number."
                      );
                    } else {
                      setErrorMessage("");
                      setCurrentPage(num);
                    }
                  }
                }}
                onBlur={() => setPageInput("")}
                className={styles.pageInlineInput}
                min={1}
                max={numPages}
              />{" "}
              of {numPages}
            </span>

            {errorMessage && <FloatingMessage text={errorMessage} />}

            <button
              className={styles.navBtn}
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, numPages || 1))
              }
            >
              →
            </button>
          </div>

          <button
            className={styles.iconsBottom}
            onClick={() =>
              isBookmarked
                ? removeBookmark(currentPage)
                : addBookmark(currentPage)
            }
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
        </footer>
      )}
      <div className={styles.bottomBlock}></div>
    </div>
  );
};
