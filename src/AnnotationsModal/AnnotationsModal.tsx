import React, { FunctionComponent, useEffect, useState } from "react";

import BookmarkResult from "../reader/BookmarkResult/BookmarkResult";
import { IoChevronBack } from "react-icons/io5";
import NotesResult from "../reader/NotesResult/NotesResult";
import Sidebar from "react-sidebar";
import styles from "./AnnotationModalStyles.module.css";

type props = {
  bg: string;
  color: string;
  open: boolean;
  close: () => void;
  annotations: any;
  onNotesCLick: (cfi: string) => void;
  deleteHighlight: (cfi: string) => void;
  deleteBookmark: (page: number) => void;
  handleNote: (cfi: string, note: string) => void;
  handleBookmark: (cfi: string) => void;
};

const AnnotationModal: FunctionComponent<props> = ({
  bg,
  color,
  open,
  close,
  annotations,
  onNotesCLick,
  deleteHighlight,
  deleteBookmark,
  handleNote,
  handleBookmark,
}) => {
  const [selected, setSelected] = useState<"Notes" | "Bookmarks">("Bookmarks");
  const [highlights, setHighlights] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    if (annotations) {
      let highlight = annotations?.filter(
        (item: any, index: number) => item.type === "HIGHLIGHT"
      );
      let bookmark = annotations?.filter(
        (item: any, index: number) => item.type === "BOOKMARK"
      );
      setHighlights(highlight);
      setBookmarks(bookmark);
    }
  }, [annotations]);

  return (
    <Sidebar
      touch={false}
      sidebar={
        <div className={styles.parent} style={{ backgroundColor: `${bg}50` }}>
          <div className={styles.header}>
            <IoChevronBack
              className={styles.backIcon}
              onClick={() => {
                setSelected("Bookmarks");
                close();
              }}
            />
            <div
              className={styles.topBar}
              style={{
                backgroundColor: bg.length === 0 ? "#f5f5f5" : `${bg}91`,
              }}
            >
              <button
                style={
                  selected === "Bookmarks"
                    ? { color: "#F3983E", fontWeight: 600 }
                    : { color, fontWeight: 600 }
                }
                className={styles.topBarButton}
                onClick={() => setSelected("Bookmarks")}
              >
                Bookmarks
              </button>
              <button
                style={
                  selected === "Notes"
                    ? { color: "#F3983E", fontWeight: 600 }
                    : { color, fontWeight: 600 }
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
                  bg={bg}
                  fontColor={color}
                  key={index}
                  text={item.text}
                  color={item.color}
                  onPress={() => {
                    setSelected("Bookmarks");
                    onNotesCLick(item.epubCfi);
                  }}
                  onDelete={() => deleteHighlight(item.epubCfi)}
                  note={item.note}
                  handleNote={(note: string) => handleNote(item.epubCfi, note)}
                />
              ))}
            {bookmarks &&
              selected === "Bookmarks" &&
              bookmarks.map((item: any, index: number) => (
                <BookmarkResult
                  bg={bg}
                  color={color}
                  handleClick={() => {
                    setSelected("Bookmarks");
                    handleBookmark(item.epubCfi);
                  }}
                  key={index}
                  text={item.text}
                  pageno={item.pageNumber}
                  deleteBookmark={() => deleteBookmark(item.pageNumber)}
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
    />
  );
};

export default AnnotationModal;
