//@ts-nocheck
import React, { FunctionComponent, useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./PopUpStyles.module.css";
import {
  IoTrash,
  IoClose,
  IoDocument,
  IoPencil,
  IoBusiness,
  IoBook,
  IoSearch,
} from "react-icons/io5";
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
  useEffect(() => {
    // console.log("x,y", coord);
    return () => {};
  }, [coord]);
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
            top: coord.y,
            marginLeft: coord.x,
          },
        }}
      >
        {showNote === false && (
          <div
            className={styles.popup}
            style={{ flexDirection: "row", display: "flex" }}
          >
            {modalType === "annSelect" && (
              <div style={{ backgroundColor: "#CCCCCC", borderRadius: "5px" }}>
                <div className={styles.annotationMenu}>
                  <div className={styles.selectable}>
                    <IoSearch
                      className={styles.icon}
                      onClick={() => setshowNote(true)}
                    />
                  </div>
                  <div className={styles.line} />
                  <div className={styles.selectable}>
                    <FiEdit3
                      className={styles.icon}
                      onClick={() => setModalType("highlight")}
                    />
                  </div>
                  <div className={styles.line} />

                  <div className={styles.selectable}>
                    <IoBook className={styles.icon} />
                  </div>
                </div>
                <div className={styles.line} />
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

                <div className={styles.line} />
                <div className={styles.selectable}>
                  <IoTrash className={styles.icon} />
                </div>
              </div>
            )}
            <div className={styles.triangle} />
          </div>
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
