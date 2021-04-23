import React, { FunctionComponent, useState } from "react";
import styles from "./AnnotationModalStyles.module.css";
import { IoChevronBack } from "react-icons/io5";
import Sidebar from "react-sidebar";
import NotesResult from "../reader/NotesResult/NotesResult";
import BookmarkResult from "../reader/BookmarkResult/BookmarkResult";

type props = {
  open: boolean;
  close: () => void;
  annotations: any;
  onNotesCLick: (cfi: string) => void;
  deteleHighlight: (cfi: string) => void;
  deteleBookmark: (cfi: string) => void;
};

const AnnotationModal: FunctionComponent<props> = ({
  open,
  close,
  annotations,
  onNotesCLick,
  deteleHighlight,
  deteleBookmark,
}) => {
  const [selected, setSelected] = useState<"Notes" | "Bookmarks">("Bookmarks");
  const highlights = annotations?.filter(
    (item: any, index: number) => item.type === "HIGHLIGHT"
  );
  const bookmarks = annotations?.filter(
    (item: any, index: number) => item.type === "BOOKMARK"
  );
  return (
    <Sidebar
      sidebar={
        <div className={styles.parent}>
          <div className={styles.header}>
            <IoChevronBack className={styles.backIcon} onClick={close} />
            <div className={styles.topBar}>
              <button
                style={
                  selected === "Bookmarks"
                    ? { color: "#F3983E", fontWeight: 800 }
                    : { fontWeight: 700 }
                }
                className={styles.topBarButton}
                onClick={() => setSelected("Bookmarks")}
              >
                Bookmarks
              </button>
              <button
                style={
                  selected === "Notes"
                    ? { color: "#F3983E", fontWeight: 800 }
                    : { fontWeight: 700 }
                }
                className={styles.topBarButton}
                onClick={() => setSelected("Notes")}
              >
                Notes
              </button>
            </div>
          </div>
          <div className={styles.content}>
            {highlights &&
              selected === "Notes" &&
              highlights.map((item: any, index: number) => (
                <NotesResult
                  key={index}
                  text={item.text}
                  color={item.color}
                  onPress={() => onNotesCLick(item.epubCfi)}
                  onDelete={() => deteleHighlight(item.epubCfi)}
                />
              ))}
            {bookmarks &&
              selected === "Bookmarks" &&
              bookmarks.map((item: any, index: number) => (
                <BookmarkResult
                  key={index}
                  text={item.text}
                  pageno={"10"}
                  deleteBookmark={() => deteleBookmark(item.epubCfi)}
                />
              ))}
          </div>
        </div>
      }
      open={open}
      pullRight={true}
      overlayClassName={styles.overlay}
      styles={{
        sidebar: {
          background: "white",
          width: "100%",
          maxWidth: "500px",
          zIndex: "3",
        },
      }}
    >
      <></>
    </Sidebar>
  );
};

export default AnnotationModal;
