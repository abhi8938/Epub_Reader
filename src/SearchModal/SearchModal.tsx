import React, { FunctionComponent } from "react";
import styles from "./SearchModalStyles.module.css";
import { IoChevronBack, IoSearch, IoCloseCircle } from "react-icons/io5";
import Sidebar from "react-sidebar";

type props = {
  open: boolean;
  close: () => void;
};

const SearchModal: FunctionComponent<props> = ({ open, close }) => {
  return (
    <Sidebar
      sidebar={
        <div className={styles.parent}>
          <div className={styles.header}>
            <IoChevronBack className={styles.backIcon} onClick={close} />
            <div className={styles.searchBar}>
              <IoSearch className={styles.searchIcon} />
              <input
                className={styles.inputBox}
                placeholder={"Type Your Search here"}
              />
              <IoCloseCircle className={styles.searchIcon} />
            </div>
            <p>Search</p>
          </div>
        </div>
      }
      open={open}
      pullRight={true}
      overlayClassName={styles.overlay}
      styles={{
        sidebar: {
          background: "white",
          width: "100%",
          maxWidth: "500px",
          zIndex: "3",
        },
      }}
    >
      <p>Text</p>
    </Sidebar>
  );
};

export default SearchModal;
