import React, { FunctionComponent } from "react";
import styles from "./SearchResultStyles.module.css";

type props = {
  text: string;
  pageno: string;
};

const SearchResult: FunctionComponent<props> = ({ text, pageno }) => {
  return (
    <div className={styles.parent}>
      <p className={styles.content}>{text}</p>
      <p>{"Page " + pageno}</p>
    </div>
  );
};

export default SearchResult;
