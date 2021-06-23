import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import { IoClose } from "react-icons/io5";
import styles from "./NotesModal.module.css";

type props = {
  handleShow: () => void;
  onSave: (text: string) => void;
  onDelete: () => void;
  text: string;
};
const NotesModal: FunctionComponent<props> = ({
  handleShow,
  onSave,
  text,
  onDelete,
}) => {
  const textRef: any = useRef(null);
  const [note, setNote] = useState(text);

  useEffect(() => {
    textRef.current && textRef.current.focus();
  }, [textRef.current]);

  useEffect(() => {
    return () => {
      textRef.current = null;
    };
  }, []);

  return (
    <div className={styles.noteDiv}>
      <div className={styles.noteHeader}>
        <p className={styles.noteHeading}>Notes</p>
        <IoClose className={styles.closeIcon} onClick={(e) => handleShow()} />
      </div>
      <textarea
        value={note}
        ref={textRef}
        placeholder={"Enter Your Notes here"}
        className={styles.noteInput}
        onChange={(eve) => setNote(eve.target.value)}
      />
      <div className={styles.noteButtonDiv}>
        <button
          className={styles.noteButton}
          onClick={() => {
            setNote("");
            onDelete();
            handleShow();
          }}
        >
          Delete
        </button>
        <button
          className={styles.noteButton}
          onClick={() => {
            onSave(note);
            setNote("");
            textRef.current.blur();
            setTimeout(() => {
              handleShow();
            }, 10);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesModal;
