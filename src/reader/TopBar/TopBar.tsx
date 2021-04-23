//* - Top Bar - back - Table of content icon
//* - (DropDown - (Night Mode - Brigtness controller Slider - FontSize( Medium / large))
//* - Bookmark page

import React, { FunctionComponent } from "react";
import styles from "./TopBarStyles.module.css";
import {
  IoSettingsOutline,
  IoBookmarkOutline,
  IoSearchOutline,
  IoDocumentTextOutline,
  IoBookmark,
} from "react-icons/io5";
//@ts-nocheck
// //FUNCTION TO CHECK FOE PROPS UPDATE
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
  shown: boolean;
  title: string;
  onBookMark?: () => void;
  onAnnotations?: () => void;
  onSearch?: () => void;
  onSettings: () => void;
  isMarked: boolean;
};
const Topbar: FunctionComponent<props> = ({
  bg,
  shown,
  title,
  onBookMark,
  onAnnotations,
  onSearch,
  onSettings,
  isMarked,
}) => {
  return (
    <div className={styles.parent}>
      <div className={styles.menu}>
        {isMarked === true && <IoBookmark className={styles.icon} />}
        {isMarked === false && (
          <IoBookmarkOutline className={styles.icon} onClick={onBookMark} />
        )}
        <IoSearchOutline className={styles.icon} onClick={onSearch} />
        <IoDocumentTextOutline
          className={styles.icon}
          onClick={onAnnotations}
        />
        <IoSettingsOutline className={styles.icon} onClick={onSettings} />
      </div>
    </div>
  );
};

export default Topbar;
