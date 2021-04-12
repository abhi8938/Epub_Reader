import React, { FunctionComponent, useState } from "react";
import Modal from "react-modal";
import styles from "./PopUpStyles.module.css";

Modal.setAppElement("#root");

type props = {
  coord: { x: number; y: number };
  show: boolean;
  hide: () => void;
};

const PopUpMenu: FunctionComponent<props> = ({ coord, show, hide }) => {
  return (
    <div>
      <Modal
        isOpen={show}
        contentLabel="Example Modal"
        className={styles.Modal}
        overlayClassName={styles.Overlay}
        shouldCloseOnOverlayClick={true}
      >
        <div className={styles.Container} onClick={hide}>
          <div
            className={styles.PopUpContainer}
            style={{
              position: "absolute",
              left: coord.x + 30,
              bottom: coord.y - 50,
            }}
          >
            <div
              className={styles.PopUpMenu}
              style={{ backgroundColor: "#CCCCCC" }}
            >
              <p className={styles.label}>Notes</p>
              <div className={styles.line} />
              <p className={styles.label}>Highlights</p>
              <div className={styles.line} />
              <p className={styles.label}>Dictionary</p>
            </div>
            <div className={styles.triangle} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopUpMenu;
