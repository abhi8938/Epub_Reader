import React, { FunctionComponent } from "react";
import styles from "./NotesResultStyles.module.css";

import { IoTrash } from "react-icons/io5";

type props = {
  text: string;
  color: string;
  onPress: () => void;
  onDelete: () => void;
};

const NotesResult: FunctionComponent<props> = ({
  text,
  color,
  onPress,
  onDelete,
}) => {
  return (
    <div className={styles.parent}>
      <div className={styles.header}>
        <div
          style={{ backgroundColor: color }}
          className={styles.color}
          onClick={onPress}
        />
        <IoTrash
          style={{ marginRight: "10px", fontSize: 18, cursor: "pointer" }}
          onClick={onDelete}
        />
      </div>
      <p className={styles.content} onClick={onPress}>
        {text}
      </p>
      <button className={styles.addNote}>Add Your Notes</button>
    </div>
  );
};

export default NotesResult;
