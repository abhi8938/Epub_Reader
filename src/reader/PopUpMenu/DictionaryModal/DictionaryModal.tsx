import { IoChevronBack, IoCloseCircle, IoSearch } from "react-icons/io5";
import React, { FunctionComponent, useEffect } from "react";

import { Data } from "../../Data";
import { IoClose } from "react-icons/io5";
import Sidebar from "react-sidebar";
import styles from "./DictionaryModal.module.css";

//TODO: Dictionary
type props = {
  handleShow: () => void;
  hindi: any;
  english: any;
};

const DictionaryModal: FunctionComponent<props> = ({
  handleShow,
  hindi,
  english,
}) => {
  return (
    <div className={styles.parent}>
      <div className={styles.header}>
        <p className={styles.heading}>Dictionary</p>
        <IoClose className={styles.closeIcon} onClick={(e) => handleShow()} />
      </div>
      {english.definition.length === 0 ? (
        <p className={styles.loadingText}>
          {english.error && english.error.length !== 0
            ? english.error
            : "Loading..."}
        </p>
      ) : (
        <div
          className={styles.dictContainer}
          style={{ transition: "all", transitionDuration: "300ms" }}
        >
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <p className={styles.textWord}>{english.word}</p>
            <p className={styles.textProunciation}>{english.prounciation}</p>
          </div>
          <p className={styles.textDefinition}>
            <p className={styles.subHead}>Definition :</p>
            {english.definition}
          </p>
          <p className={styles.textExample}>
            <p className={styles.subHead}>Example :</p> {english.example}
          </p>
          <p className={styles.textSynonyms}>
            <p className={styles.subHead}>Synonyms :</p>
            {english.synonyms ? english.synonyms.join(", ") : "No Synonyms"}
          </p>
          {/* <div className={styles.line} />
        <p className={styles.subHeading}>Hindi:</p>
        <p className={styles.meaningText}>{hindi}</p> */}
        </div>
      )}
    </div>
  );
};

export default DictionaryModal;
