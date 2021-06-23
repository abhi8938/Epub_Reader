import { IoPencilSharp, IoPersonCircleOutline, IoTrash } from "react-icons/io5";
import React, { FunctionComponent, useEffect, useState } from "react";

import styles from "./NotesResultStyles.module.css";

type props = {
  bg: string;
  fontColor: string;
  text: string;
  color: string;
  onPress: () => void;
  onDelete: () => void;
  note: string;
  handleNote: (note: string) => void;
};

const NotesResult: FunctionComponent<props> = ({
  bg,
  fontColor,
  text,
  color,
  onPress,
  onDelete,
  note,
  handleNote,
}) => {
  const [noteText, setNote] = useState(note && note.length !== 0 ? note : "");
  const [add, setAdd] = useState(false);

  const renderNoteButton = (title: string, onClick: (e: any) => void) => (
    <div className={styles.addNote} onClick={onClick}>
      <IoPencilSharp
        style={{
          marginRight: "5px",
          fontSize: 13,
          cursor: "pointer",
          // color: fontColor,
        }}
      />
      <p className={styles.buttonText}>{title}</p>
    </div>
  );

  const renderNoteInput = () => (
    <div className={styles.noteContainer}>
      <p className={styles.subHead} style={{ color: fontColor }}>
        {" "}
        Your Note:
      </p>
      <textarea
        onBlur={(e) => {
          if (noteText.length === 0) {
            handleNote("");
            setAdd(false);
          }
        }}
        style={{ color: fontColor }}
        value={noteText}
        placeholder={"Enter Your Notes here"}
        className={styles.noteInput}
        onChange={(eve) => setNote(eve.target.value)}
      />
      {renderNoteButton("Update Note", (e) => handleNote(noteText))}
    </div>
  );
  return (
    <div className={styles.parent}>
      <div className={styles.header}>
        <p
          className={styles.content}
          style={{
            backgroundColor: `${color}51`,
            borderWidth: "1.8px",
            borderColor: `${color}`,
            borderStyle: "solid",
            color: fontColor,
          }}
          onClick={onPress}
        >
          {text}
        </p>
        <IoTrash
          style={{
            marginRight: "10px",
            fontSize: 20,
            cursor: "pointer",
            color: fontColor,
          }}
          onClick={onDelete}
        />
      </div>
      {(note && note.length !== 0) || add === true
        ? renderNoteInput()
        : renderNoteButton("Add Note", (e) => {
            setAdd(true);
          })}
    </div>
  );
};

export default NotesResult;
