import { IoChevronBack, IoCloseCircle, IoSearch } from "react-icons/io5";
import React, { FunctionComponent, useEffect } from "react";

import Sidebar from "react-sidebar";
import styles from "./TocModalStyles.module.css";

type props = {
  bg: string;
  color: string;
  show: boolean;
  toggle: () => void;
  toc: Array<any>;
  handleClick: (href: string) => void;
};

const TocModal: FunctionComponent<props> = ({
  bg,
  color,
  show,
  toggle,
  toc,
  handleClick,
}) => {
  return (
    <Sidebar
      sidebar={
        <div className={styles.parent} style={{ backgroundColor: bg }}>
          <div className={styles.header}>
            <IoChevronBack
              className={styles.backIcon}
              style={{ color }}
              onClick={toggle}
            />
            <h3 style={{ color }}>Table of Contents</h3>
          </div>
          <div className={styles.content}>
            {toc.map((item: any, index: number) => (
              <div
                key={`${item.label} + ${index}`}
                className={styles.contentItem}
                style={{ borderColor: color }}
                onClick={(e) => handleClick(item.href)}
              >
                <p className={styles.contentText} style={{ color }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      }
      open={show}
      pullRight={true}
      overlayClassName={styles.overlay}
      styles={{
        sidebar: {
          background: "white",
          width: "100%",
          maxWidth: "500px",
          zIndex: "3",
        },
      }}
    >
      <></>
    </Sidebar>
  );
};

export default TocModal;
