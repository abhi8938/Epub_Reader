import React, { FunctionComponent } from "react";

import { IoTrash } from "react-icons/io5";
import styles from "./BookmarkResultStyles.module.css";

type props = {
  bg: string;
  color: string;
  text: string;
  pageno: string;
  deleteBookmark: () => void;
  handleClick: () => void;
};

const BookmarkResult: FunctionComponent<props> = ({
  bg,
  color,
  text,
  pageno,
  deleteBookmark,
  handleClick,
}) => {
  return (
    <div
      className={styles.parent}
      style={{ backgroundColor: `${bg}20`, borderColor: color }}
      onClick={(e) => handleClick()}
    >
      <p className={styles.content} style={{ color }}>
        {text}
      </p>
      <p className={styles.page} style={{ color }}>
        {pageno}
      </p>
      <IoTrash
        style={{ marginRight: "10px", color, fontSize: 18, cursor: "pointer" }}
        onClick={deleteBookmark}
      />
    </div>
  );
};

export default BookmarkResult;
