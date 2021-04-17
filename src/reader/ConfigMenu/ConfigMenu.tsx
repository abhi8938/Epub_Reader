import React, { FunctionComponent } from "react";
import Modal from "react-modal";
import styles from "./ConfigMenu.module.css";
import {
  IoAddCircleOutline,
  IoRemoveCircleOutline,
  IoSunny,
  IoSunnyOutline,
} from "react-icons/io5";

type props = {
  open: boolean;
  close: () => void;
  onScrollChnage: (value: boolean) => void;
  scrollValue: boolean;
};

const ConfigMenu: FunctionComponent<props> = ({
  open,
  close,
  onScrollChnage,
  scrollValue,
}) => {
  return (
    <div>
      <Modal
        isOpen={open}
        className={styles.Modal}
        contentLabel="Example Modal"
        overlayClassName={styles.Overlay}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          close();
        }}
      >
        <div style={{ width: "100%" }}>
          <span className={styles.title}>Font Size</span>
          <div className={styles.fontSizeMenu}>
            <IoRemoveCircleOutline style={{ fontSize: "24px" }} />
            <span>Aa</span>
            <IoAddCircleOutline style={{ fontSize: "24px" }} />
          </div>
        </div>

        <div style={{ width: "100%", marginTop: "20px" }}>
          <span className={styles.title}>Color</span>
          <div className={styles.ColorMenu}>
            <div
              className={styles.colorDiv}
              style={{ backgroundColor: "#4AC6BD50", borderColor: "#4AC6BD" }}
            >
              <span>Aa</span>
            </div>
            <div
              className={styles.colorDiv}
              style={{ backgroundColor: "#F9EA6250", borderColor: "#F9EA62" }}
            >
              <span>Aa</span>
            </div>
            <div
              className={styles.colorDiv}
              style={{ backgroundColor: "#51454550", borderColor: "#514545" }}
            >
              <span>Aa</span>
            </div>
            <div
              className={styles.colorDiv}
              style={{ backgroundColor: "#13BA6A50", borderColor: "#13BA6A" }}
            >
              <span>Aa</span>
            </div>
            <div
              className={styles.colorDiv}
              style={{ backgroundColor: "#00000050", borderColor: "#000000" }}
            >
              <span>Aa</span>
            </div>
            <div
              className={styles.colorDiv}
              style={{ backgroundColor: "#FE38EA50", borderColor: "#FE38EA" }}
            >
              <span>Aa</span>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", marginTop: "20px" }}>
          <span className={styles.title}>Brightness</span>
          <div className={styles.BrightnessMenu}>
            <IoSunnyOutline style={{ fontSize: "12px" }} />
            <input
              type="range"
              min="1"
              max="100"
              id="brightness"
              className={styles.slider}
            />
            <IoSunny style={{ fontSize: "12px" }} />
          </div>
        </div>

        <div style={{ width: "100%", marginTop: "20px" }}>
          <span className={styles.title}>Scroll Direction</span>
          <div className={styles.ScrollMenu}>
            <span>Scrollable</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={scrollValue}
                onChange={(event) => onScrollChnage(event.target.checked)}
              />
              <span className={styles.sliderRound}></span>
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfigMenu;
