import {
  IoArrowForwardCircle,
  IoArrowForwardCircleOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import React, { FunctionComponent } from "react";

import styles from "./SearchResultStyles.module.css";

type props = {
  bg: string;
  color: string;
  text: string;
  pageno: string;
  handleClick: () => void;
};

const SearchResult: FunctionComponent<props> = ({
  bg,
  color,
  text,
  pageno,
  handleClick,
}) => {
  return (
    <div
      className={styles.parent}
      style={{ backgroundColor: bg }}
      onClick={handleClick}
    >
      <p className={styles.content} style={{ color }}>
        {text.trim()}
      </p>
      <IoArrowForwardCircleOutline
        style={{ color }}
        className={styles.forwardIcon}
      />
    </div>
  );
};

export default SearchResult;
