import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import React, { FunctionComponent } from "react";

import styles from "./BottomBarStyles.module.css";

type props = {
  onNext: () => void;
  onPrev: () => void;
  color: string;
  bg: string;
  page: { current: number; total: number; percentage: number | string };
  scroll: boolean;
};

const BottomBar: FunctionComponent<props> = ({
  onNext,
  onPrev,
  color = "#808080",
  bg,
  page,
  scroll,
}) => {
  return (
    <div className={styles.parent} style={{ backgroundColor: bg }}>
      <div
        className={styles.menu}
        style={{
          justifyContent: scroll === true ? "center" : "space-between",
        }}
      >
        {scroll === false && (
          <IoArrowBack
            className={styles.icon}
            onClick={onPrev}
            style={{ color }}
          />
        )}
        <p style={{ color, alignSelf: "center" }}>
          {page.percentage} {page.percentage === "the end" ? "" : "%"}
        </p>
        {scroll === false && (
          <IoArrowForward
            className={styles.icon}
            onClick={onNext}
            style={{ color }}
          />
        )}
      </div>
    </div>
  );
};

export default BottomBar;
