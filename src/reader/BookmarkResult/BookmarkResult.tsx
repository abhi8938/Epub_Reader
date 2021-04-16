import React, { FunctionComponent } from "react";
import styles from "./BookmarkResultStyles.module.css";

import { IoTrash } from "react-icons/io5";

type props = {
  text: string;
  pageno: string;
};

const BookmarkResult: FunctionComponent<props> = ({ text, pageno }) => {
  return (
    <div className={styles.parent}>
      <p className={styles.content}>{text}</p>
      <p className={styles.page}>{pageno}</p>
      <IoTrash style={{ marginRight: "10px", fontSize: 18 }} />
    </div>
  );
};

export default BookmarkResult;
