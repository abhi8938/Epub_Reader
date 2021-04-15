//@ts-nocheck
import React, { FunctionComponent, useState } from "react";
import Modal from "react-modal";
import styles from "./PopUpStyles.module.css";
import { IoTrash, IoClose } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";

Modal.setAppElement("#root");
type props = {
  coord: { x: number; y: number };
  show: boolean;
  hide: () => void;
};

const PopUpMenu: FunctionComponent<props> = ({ coord, show, hide }) => {
  const [modalType, setModalType] = useState("annSelect");
  const [showNote, setshowNote] = useState(false);
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
          setshowNote(false);
        }}
        style={{
          content: {
            position: "absolute",
            left: coord.x + 30,
            bottom: coord.y - 40,
          },
        }}
      >
        {showNote === false && (
          <>
            {modalType === "annSelect" && (
              <div
                className={styles.PopUpMenu}
                style={{ backgroundColor: "#CCCCCC", borderRadius: "10px" }}
              >
                <div className={styles.annotationMenu}>
                  <button
                    className={styles.buttons}
                    onClick={() => setshowNote(true)}
                  >
                    Notes
                  </button>
                  <div className={styles.line} />
                  <button
                    className={styles.buttons}
                    onClick={() => setModalType("highlight")}
                  >
                    Highlights
                  </button>
                  <div className={styles.line} />
                  <button className={styles.buttons}>Dictionary</button>
                </div>
              </div>
            )}
            {modalType === "highlight" && (
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
          </>
        )}
        {showNote === true && (
          <div className={styles.noteDiv}>
            <div className={styles.noteHeader}>
              <p className={styles.noteHeading}>Notes</p>
              <IoClose className={styles.closeIcon} />
            </div>
            <textarea
              placeholder={"Enter Your Notes here"}
              className={styles.noteInput}
            />
            <div className={styles.noteButtonDiv}>
              <button
                className={styles.noteButton}
                onClick={() => setshowNote(false)}
              >
                Delete
              </button>
              <button
                className={styles.noteButton}
                onClick={() => setshowNote(false)}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PopUpMenu;
