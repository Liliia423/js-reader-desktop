{
  /*import { useEffect, useState } from "react";
import { PdfViewer } from "../../components/PdfViewer/PdfViewer";
import styles from "../ReaderPage/ReaderPage.module.css";

export const ReaderPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setBookmarks([]);
      setCurrentPage(1);

      const bookId = `${selected.name}_${selected.size}`;
      const STORAGE_PAGE = `reader-progress:${bookId}`;
      const STORAGE_BOOKMARKS = `reader-bookmarks:${bookId}`;

      const savedPage = localStorage.getItem(STORAGE_PAGE);
      if (savedPage) {
        const num = parseInt(savedPage, 10);
        if (!isNaN(num)) setCurrentPage(num);
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
    }
  };

  const addBookmark = (page: number) => {
    if (!bookmarks.includes(page)) {
      const updated = [...bookmarks, page].sort((a, b) => a - b);
      setBookmarks(updated);
      if (file) {
        const bookId = `${file.name}_${file.size}`;
        localStorage.setItem(
          `reader-bookmarks:${bookId}`,
          JSON.stringify(updated)
        );
      }
    }
  };

  const removeBookmark = (page: number) => {
    const updated = bookmarks.filter((p) => p !== page);
    setBookmarks(updated);
    if (file) {
      const bookId = `${file.name}_${file.size}`;
      localStorage.setItem(
        `reader-bookmarks:${bookId}`,
        JSON.stringify(updated)
      );
    }
  };

  useEffect(() => {
    if (file) {
      const bookId = `${file.name}_${file.size}`;
      localStorage.setItem(`reader-progress:${bookId}`, currentPage.toString());
    }
  }, [currentPage, file]);

  return (
    <div className={styles.viewerPage}>
      <div className={styles.downloadBlock}>
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

        <h1 className={styles.headerHeropage}>
          {file ? "Open New File" : "PDF Viewer for Everyone"}
        </h1>
      </div>

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
              <div className={styles.bookmarks}>Bookmarks:</div>
              {bookmarks.length > 0 && (
                <div className={styles.bookmarksFirstBlock}>
                  {bookmarks.map((page) => (
                    <div className={styles.actionBookmarks} key={page}>
                      <button
                        className={styles.bookmarkBtn}
                        onClick={() => setCurrentPage(page)}
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
            <PdfViewer
              file={file}
              addBookmark={addBookmark}
              bookmarks={bookmarks}
              setPageNumberExternal={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};*/
}
import { useEffect, useState } from "react";
import { PdfViewer } from "../../components/PdfViewer/PdfViewer";
import { useTabContext } from "../../context/TabContext";
import styles from "../ReaderPage/ReaderPage.module.css";

export const ReaderPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { addTab } = useTabContext(); // ✅ Ось тут має бути

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setBookmarks([]);
      setCurrentPage(1);

      const id = `${selected.name}_${selected.size}`;

      // Додаємо вкладку
      addTab({
        id,
        title: selected.name,
        file: selected,
      });

      const STORAGE_PAGE = `reader-progress:${id}`;
      const STORAGE_BOOKMARKS = `reader-bookmarks:${id}`;

      const savedPage = localStorage.getItem(STORAGE_PAGE);
      if (savedPage) {
        const num = parseInt(savedPage, 10);
        if (!isNaN(num)) setCurrentPage(num);
      }

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

  {
    /*const removeBookmark = (page: number) => {
    const updated = bookmarks.filter((p) => p !== page);
    setBookmarks(updated);
    if (file) {
      const id = `${file.name}_${file.size}`;
      localStorage.setItem(`reader-bookmarks:${id}`, JSON.stringify(updated));
    }
  };*/
  }

  const removeBookmark = (page: number) => {
    const updated = bookmarks.filter((p) => p !== page);
    setBookmarks(updated);
    if (file) {
      const bookId = `${file.name}_${file.size}`;
      localStorage.setItem(
        `reader-bookmarks:${bookId}`,
        JSON.stringify(updated)
      );
    }
  };

  useEffect(() => {
    if (file) {
      const id = `${file.name}_${file.size}`;
      localStorage.setItem(`reader-progress:${id}`, currentPage.toString());
    }
  }, [currentPage, file]);

  return (
    <div className={styles.viewerPage}>
      <div className={styles.downloadBlock}>
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

        <h1 className={styles.headerHeropage}>
          {file ? "Open New File" : "PDF Viewer for Everyone"}
        </h1>
      </div>

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
              <div className={styles.bookmarks}>Bookmarks:</div>
              {bookmarks.length > 0 && (
                <div className={styles.bookmarksFirstBlock}>
                  {bookmarks.map((page) => (
                    <div className={styles.actionBookmarks} key={page}>
                      <button
                        className={styles.bookmarkBtn}
                        onClick={() => setCurrentPage(page)}
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

            <PdfViewer
              file={file}
              pageNumber={currentPage} // ⬅️ ЦЕЙ ПРОП ВАЖЛИВИЙ
              addBookmark={addBookmark}
              removeBookmark={removeBookmark}
              bookmarks={bookmarks}
              setPageNumberExternal={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
