import React, { FunctionComponent, useState } from "react";
import styles from "./AnnotationModalStyles.module.css";
import { IoChevronBack } from "react-icons/io5";
import Sidebar from "react-sidebar";
import NotesResult from "../reader/NotesResult/NotesResult";
import BookmarkResult from "../reader/BookmarkResult/BookmarkResult";
import { Data } from "../reader/Data";

type props = {
  open: boolean;
  close: () => void;
};

const AnnotationModal: FunctionComponent<props> = ({ open, close }) => {
  const [selected, setSelected] = useState<"Notes" | "Bookmarks">("Bookmarks");
  const { annotations } = Data();
  const Bookmarks = annotations.filter((x: any) => x.type === "Bookmark");
  const Notes = annotations.filter((x: any) => x.type === "Notes");
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
                    : {}
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
                    : {}
                }
                className={styles.topBarButton}
                onClick={() => setSelected("Notes")}
              >
                Notes
              </button>
            </div>
          </div>
          <div className={styles.content}>
            {selected === "Notes" &&
              Notes.map((item: any, index: number) => (
                <NotesResult key={index} text={item.text} color={item.color} />
              ))}
            {selected === "Bookmarks" &&
              Bookmarks.map((item: any, index: number) => (
                <BookmarkResult
                  key={index}
                  text={item.text}
                  pageno={item.page}
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
