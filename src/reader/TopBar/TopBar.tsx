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
  onNavPress?: any;
  onBackPress?: any;
  onBookMark?: any;
  onAnnotations?: () => void;
  onSearch?: () => void;
};
const Topbar: FunctionComponent<props> = ({
  bg,
  shown,
  title,
  onNavPress,
  onBackPress,
  onBookMark,
  onAnnotations,
  onSearch,
}) => {
  return (
    <div className={styles.parent}>
      <div className={styles.menu}>
        <IoBookmarkOutline className={styles.icon} />
        <IoSearchOutline className={styles.icon} onClick={onSearch} />
        <IoDocumentTextOutline
          className={styles.icon}
          onClick={onAnnotations}
        />
        <IoSettingsOutline className={styles.icon} />
      </div>
    </div>
  );
};

export default Topbar;
