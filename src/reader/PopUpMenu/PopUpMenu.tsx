import classNames from "classnames";
import React, { FunctionComponent, useState } from "react";
import Modal from "react-modal";
import styles from "./PopUpStyles.module.css";
import { IoTrash } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";

Modal.setAppElement("#root");

type props = {
  coord: { x: number; y: number };
  show: boolean;
  hide: () => void;
};

const PopUpMenu: FunctionComponent<props> = ({ coord, show, hide }) => {
  const [modalType, setModalType] = useState("annSelect");
  return (
    <div>
      <Modal
        isOpen={show}
        className={styles.Modal}
        contentLabel="Example Modal"
        overlayClassName={styles.Overlay}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          hide();
          setModalType("annSelect");
        }}
        style={{
          content: {
            position: "absolute",
            left: coord.x + 30,
            bottom: coord.y - 40,
          },
        }}
      >
        {modalType === "annSelect" && (
          <div
            className={styles.PopUpMenu}
            style={{ backgroundColor: "#CCCCCC", borderRadius: "10px" }}
          >
            <div className={styles.annotationMenu}>
              <button
                className={styles.buttons}
                onClick={() => setModalType("highlight")}
              >
                Notes
              </button>
              <div className={styles.line} />
              <button className={styles.buttons}>Highlights</button>
              <div className={styles.line} />
              <button className={styles.buttons}>Dictionary</button>
            </div>
          </div>
        )}
        {modalType == "highlight" && (
          <div
            className={styles.PopUpMenu}
            style={{
              backgroundColor: "#CCCCCC",
              borderRadius: "10px",
            }}
          >
            <div className={styles.HighlightMenu}>
              <div className={styles.CircleContainer}>
                <div
                  className={styles.Circle}
                  style={{ backgroundColor: "#F9EA62" }}
                />
                <div
                  className={styles.Circle}
                  style={{ backgroundColor: "#4AC6BD" }}
                />
                <div
                  className={styles.Circle}
                  style={{ backgroundColor: "#FF986B" }}
                />
                <div
                  className={styles.Circle}
                  style={{ backgroundColor: "#514545" }}
                />
              </div>
              <div className={styles.IconContainer}>
                <div className={styles.line} />
                <FiEdit3 className={styles.icon} />
                <div className={styles.line} />
                <IoTrash className={styles.icon} />
              </div>
            </div>
          </div>
        )}
        <div className={styles.triangle} />
      </Modal>
    </div>
  );
};

export default PopUpMenu;
