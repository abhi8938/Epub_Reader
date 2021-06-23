//* - Top Bar - back - Table of content icon
//* - (DropDown - (Night Mode - Brigtness controller Slider - FontSize( Medium / large))
//* - Bookmark page

import {
  IoArrowBackCircleOutline,
  IoBookmark,
  IoBookmarkOutline,
  IoDocumentTextOutline,
  IoSearchOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import React, { FunctionComponent } from "react";

import { BsList } from "react-icons/bs";
import styles from "./TopBarStyles.module.css";

//@ts-nocheck
// FUNCTION TO CHECK FOE PROPS UPDATE
// const propsDidUpdate = (callback: any, deps: any) => {
//   const hasMount = useRef(false);

//   useEffect(() => {
//     if (hasMount.current) {
//       callback();
//     } else {
//       hasMount.current = true;
//     }
//   }, deps);
// };

type props = {
  bg: string;
  color: string;
  shown: boolean;
  title: string;
  onBookMark?: () => void;
  onAnnotations?: () => void;
  onSearch?: () => void;
  onSettings: () => void;
  isMarked: boolean;
  onToc: () => void;
  onBookMarkDelete: () => void;
  scroll: boolean;
};

const Topbar: FunctionComponent<props> = ({
  bg,
  color = "#808080",
  shown,
  title,
  onBookMark,
  onAnnotations,
  onSearch,
  onSettings,
  isMarked,
  onToc,
  onBookMarkDelete,
  scroll,
}) => {
  const windy: any = window;
  return (
    <div className={styles.parent} style={{ backgroundColor: bg }}>
      {windy.ReactNativeWebView && (
        <IoArrowBackCircleOutline
          className={styles.icon}
          style={{ color }}
          onClick={(e) => {
            const GO_BACK = "GO_BACK";
            windy.ReactNativeWebView.postMessage(
              JSON.stringify({ type: GO_BACK })
            );
          }}
        />
      )}

      <div className={styles.menu}>
        <BsList className={styles.icon} onClick={onToc} style={{ color }} />
        {scroll === false ? (
          isMarked === true ? (
            <IoBookmark
              className={styles.icon}
              onClick={onBookMarkDelete}
              style={{ color }}
            />
          ) : (
            <IoBookmarkOutline
              className={styles.icon}
              onClick={onBookMark}
              style={{ color }}
            />
          )
        ) : null}
        <IoSearchOutline
          className={styles.icon}
          onClick={onSearch}
          style={{ color }}
        />
        <IoDocumentTextOutline
          className={styles.icon}
          onClick={onAnnotations}
          style={{ color }}
        />
        <IoSettingsOutline
          className={styles.icon}
          onClick={onSettings}
          style={{ color }}
        />
      </div>
    </div>
  );
};

export default Topbar;
