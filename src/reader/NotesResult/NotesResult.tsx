import React, { FunctionComponent } from "react";
import styles from "./NotesResultStyles.module.css";

import { IoTrash } from "react-icons/io5";

type props = {
  text: string;
  color: string;
};

const NotesResult: FunctionComponent<props> = ({ text, color }) => {
  return (
    <div className={styles.parent}>
      <div className={styles.header}>
        <div style={{ backgroundColor: color }} className={styles.color} />
        <IoTrash style={{ marginRight: "10px", fontSize: 18 }} />
      </div>
      <p className={styles.content}>{text}</p>
      <button className={styles.addNote}>Add Your Notes</button>
    </div>
  );
};

export default NotesResult;
