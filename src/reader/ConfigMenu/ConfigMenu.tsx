import {
  IoAddCircleOutline,
  IoRemoveCircleOutline,
  IoSunny,
  IoSunnyOutline,
} from "react-icons/io5";
import React, { FunctionComponent } from "react";

import Modal from "react-modal";
import styles from "./ConfigMenu.module.css";

type props = {
  color: string;
  bg: string;
  open: boolean;
  close: () => void;
  onScrollChnage: (value: boolean) => void;
  scrollValue: boolean;
  onColorChange: (value: string, bg: string) => void;
  increaseSize: () => void;
  decreaseSize: () => void;
  onNightMode: (value: boolean, color: string, bg: string) => void;
  nightMode: boolean;
};

const ConfigMenu: FunctionComponent<props> = ({
  color,
  bg,
  open,
  close,
  onScrollChnage,
  scrollValue,
  onColorChange,
  increaseSize,
  decreaseSize,
  onNightMode,
  nightMode,
}) => {
  return (
    <div>
      <Modal
        isOpen={open}
        style={{
          content: {
            backgroundColor: `${bg}`,
          },
        }}
        className={styles.Modal}
        contentLabel="Example Modal"
        overlayClassName={styles.Overlay}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          close();
        }}
      >
        <div
          style={{
            padding: "5px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className={styles.title} style={{ color }}>
            Font Size
          </span>
          <div className={styles.fontSizeMenu}>
            <IoRemoveCircleOutline
              style={{ color }}
              className={styles.icon}
              onClick={decreaseSize}
            />
            <span style={{ color }}>Aa</span>
            <IoAddCircleOutline
              style={{ color }}
              className={styles.icon}
              onClick={increaseSize}
            />
          </div>
        </div>
        <span className={styles.line} style={{ color }} />
        <div
          style={{
            width: "100%",
            padding: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <span className={styles.title} style={{ color }}>
            Theme
          </span>
          <div className={styles.ColorMenu}>
            <div
              className={styles.colorDiv}
              style={{ backgroundColor: "#3D3D3D", borderColor: "#3D3D3D" }}
              onClick={() => onColorChange("#ffffff", "#3D3D3D")}
            >
              <span
                style={{
                  color: "#FFFFFF",
                }}
                className={styles.colorText}
              >
                Aa
              </span>
            </div>
            <div
              className={styles.colorDiv}
              style={{ backgroundColor: "#AAAAAA", borderColor: "#AAAAAA" }}
              onClick={() => onColorChange("#000000", "#AAAAAA")}
            >
              <span className={styles.colorText} style={{ color: "#000000" }}>
                Aa
              </span>
            </div>
            <div
              className={styles.colorDiv}
              style={{ backgroundColor: "#EFE0B9", borderColor: "#EFE0B9" }}
              onClick={() => onColorChange("#3D3D3D", "#EFE0B9")}
            >
              <span
                style={{
                  color: "#3D3D3D",
                }}
                className={styles.colorText}
              >
                Aa
              </span>
            </div>
            <div
              className={styles.colorDiv}
              style={{
                backgroundColor: "#C0C0C0",
                borderColor: "#c0c0c0",
              }}
              onClick={() => onColorChange("#3D3D3D", "#C0C0C0")}
            >
              <span
                style={{
                  color: "#3D3D3D",
                }}
                className={styles.colorText}
              >
                Aa
              </span>
            </div>
          </div>
        </div>
        <span className={styles.line} style={{ color }} />
        {/* <div style={{ width: "100%", marginTop: "20px" }}>
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
        </div> */}
        <div
          style={{
            width: "100%",
            padding: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.ScrollMenu}>
            <span className={styles.title} style={{ color }}>
              Night Mode
            </span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={nightMode}
                onChange={(event) =>
                  onNightMode(event.target.checked, "#000000", "#AAAAAA")
                }
              />
              <span className={styles.sliderRound} style={{ color }}></span>
            </label>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            padding: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.ScrollMenu}>
            <span className={styles.title} style={{ color }}>
              Scrollable
            </span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={scrollValue}
                onChange={(event) => onScrollChnage(event.target.checked)}
              />
              <span className={styles.sliderRound} style={{ color }}></span>
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfigMenu;
