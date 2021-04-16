import React, { FunctionComponent } from "react";
import styles from "./SearchModalStyles.module.css";
import { IoChevronBack, IoSearch, IoCloseCircle } from "react-icons/io5";
import Sidebar from "react-sidebar";
import SearchResult from "../SearchResult/SearchResult";
import { Data } from "../reader/Data";
type props = {
  open: boolean;
  close: () => void;
};

const SearchModal: FunctionComponent<props> = ({ open, close }) => {
  const { searchData } = Data();
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
            <p className={styles.search}>Search</p>
          </div>
          <div className={styles.content}>
            {searchData.map((item: any, index: number) => (
              <SearchResult key={index} text={item.text} pageno={item.pageno} />
            ))}
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
      <></>
    </Sidebar>
  );
};

export default SearchModal;
