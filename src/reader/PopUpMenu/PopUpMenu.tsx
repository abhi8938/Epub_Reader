import { IoBook, IoClose, IoSearch, IoTrash } from "react-icons/io5";
//@ts-nocheck
import React, {
  FunctionComponent,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";

import DictionaryModal from "./DictionaryModal/DictionaryModal";
import { FiEdit3 } from "react-icons/fi";
import Modal from "react-modal";
import NotesModal from "./NotesModal/NotesModal";
import styles from "./PopUpStyles.module.css";
import theme from "../Assets/theme";

Modal.setAppElement("#root");
type props = {
  coord: { x: number; y: number };
  show: boolean;
  hide: () => void;
  highlight: (color: string) => void;
  onSearchPress: () => void;
  onNote: (text: String) => void;
  onDeleteNote: () => void;
  marked?: boolean;
  note: string;
  onMeaning: () => void;
  meanings: { hindi: string; english: string };
  deleteHighlight: () => void;
};
let contentRef: any = createRef();
const PopUpMenu: FunctionComponent<props> = ({
  coord,
  show,
  hide,
  highlight,
  onSearchPress,
  onDeleteNote,
  onNote,
  marked,
  note,
  meanings,
  onMeaning,
  deleteHighlight,
}) => {
  const [modalType, setModalType] = useState("ANN"); // "ANN" || NOTE || DICT
  const [column, setColumn] = useState(true);
  // const [breakpoint, setBreakPoint] = useState(0);
  const [ph, setPH] = useState(0);
  const [pW, setPW] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const onCLose = () => {
    hide();
    setModalType("ANN");
  };

  const centerStyle: any = {
    position: "fixed",
    left: "50%",
    top: "20%",
    transform: `translate(-50%, 0)`,
  };

  useEffect(() => {
    //Popup should always be inside the window and arrow should respond accordingly
    let nx = coord.x;
    let ny = coord.y;
    if (pW !== 0 && ph !== 0) {
      let breakpointy = window.innerHeight - (ph + 50);

      if (coord.y > breakpointy) {
        setColumn(false);
        ny = coord.y - ph * 0.93;
      } else {
        setColumn(true);
      }
      if (coord.x < pW) {
        nx = coord.x + pW + 5;
      } else if (window.innerWidth - coord.x < pW + 10) {
        nx = coord.x - pW - 10;
      }
    }
    setX(nx);
    setY(ny);
  }, [coord, modalType]);

  return (
    <Modal
      contentRef={(ref) => {
        if (ref) {
          if (ph !== ref.clientHeight) {
            setPH(ref.clientHeight);
          }
          if (pW !== ref.clientWidth) {
            setPW(ref.clientWidth);
          }
        }
      }}
      isOpen={show}
      className={styles.Modal}
      overlayClassName={styles.Overlay}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onCLose}
      style={{
        content:
          modalType === "ANN"
            ? {
                position: "absolute",
                top: `${y}px`,
                left: `${x}px`,
                display: "flex",
                flexDirection: column === false ? "column-reverse" : "column",
              }
            : centerStyle,
        overlay:
          modalType === "NOTE"
            ? {
                display: "flex",
                flex: 1,
                backgroundColor: "#cccccc",
              }
            : {},
      }}
    >
      {modalType === "ANN" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className={styles.annotationContainer}>
            <div className={styles.pencilHead} />
            <div className={styles.line} />
            <div
              className={styles.annotationMenu}
              style={{
                display: "flex",
              }}
            >
              <div
                className={styles.selectable}
                onClick={(e) => onSearchPress()}
              >
                <IoSearch className={styles.icon} />
              </div>
              <div className={styles.line} />
              <div
                className={styles.selectable}
                onClick={() => setModalType("NOTE")}
              >
                <FiEdit3 className={styles.icon} />
              </div>
              <div className={styles.line} />
              <div
                className={styles.selectable}
                onClick={() => {
                  setModalType("DICT");
                  onMeaning();
                }}
              >
                <IoBook className={styles.icon} />
              </div>
              {marked && <div className={styles.line} />}
              {marked && (
                <div
                  className={styles.selectable}
                  onClick={() => deleteHighlight()}
                >
                  <IoTrash className={styles.icon} />
                </div>
              )}
            </div>
            <div className={styles.line} />
            <div
              className={styles.CircleContainer}
              style={{
                display: "flex",
              }}
            >
              {theme.HIGHLIGHT_COLORS.map((item) => (
                <div
                  key={item.label}
                  className={styles.Circle}
                  style={{ backgroundColor: item.color }}
                  onClick={() => highlight(item.color)}
                />
              ))}
            </div>
            <div className={styles.line} />
            <div className={styles.pencilHeadBottom} />
          </div>

          {/* <div className={styles.triangle} /> */}
        </div>
      )}
      {modalType === "NOTE" && (
        <NotesModal
          handleShow={onCLose}
          onSave={onNote}
          onDelete={onDeleteNote}
          text={note}
        />
      )}
      {modalType === "DICT" && (
        <DictionaryModal {...meanings} handleShow={onCLose} />
      )}
    </Modal>
  );
};

export default PopUpMenu;
