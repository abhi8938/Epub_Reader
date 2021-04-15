import React, { FunctionComponent } from "react";
import styles from "./BottomBarStyles.module.css";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

type props = {
  onNext: () => void;
  onPrev: () => void;
};

const BottomBar: FunctionComponent<props> = ({ onNext, onPrev }) => {
  return (
    <div className={styles.parent}>
      <div className={styles.menu}>
        <IoArrowBack className={styles.icon} onClick={onPrev} />
        <p>1/10</p>
        <IoArrowForward className={styles.icon} onClick={onNext} />
      </div>
    </div>
  );
};

export default BottomBar;
