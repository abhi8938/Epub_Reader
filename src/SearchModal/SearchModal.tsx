import { IoChevronBack, IoCloseCircle, IoSearch } from "react-icons/io5";
import React, { FunctionComponent, useEffect, useRef } from "react";

import { Data } from "../reader/Data";
import SearchResult from "./SearchResult/SearchResult";
import Sidebar from "react-sidebar";
import styles from "./SearchModalStyles.module.css";
import useReaderState from "../reader/state";

type props = {
  bg: string;
  color: string;
  open: boolean;
  close: () => void;
  onSearch: (query: string) => void;
  results: Array<any>;
  query: string;
  handleQuery: (query: String) => void;
  handleClick: (cfi: string) => void;
};

const SearchModal: FunctionComponent<props> = ({
  bg,
  color,
  open,
  close,
  onSearch,
  results,
  query,
  handleQuery,
  handleClick,
}) => {
  const inputRef: any = useRef(null);

  useEffect(() => {
    if (inputRef.current !== null && open === true) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  return (
    <Sidebar
      sidebar={
        <div className={styles.parent} style={{ backgroundColor: bg }}>
          <div className={styles.header}>
            <IoChevronBack
              className={styles.backIcon}
              style={{ color }}
              onClick={close}
            />
            <div className={styles.searchBar}>
              <IoSearch className={styles.searchIcon} style={{ color }} />
              <input
                style={{ color }}
                ref={inputRef}
                value={query}
                className={styles.inputBox}
                onChange={(e) => handleQuery(e.target.value)}
                placeholder={"Type Your Search here"}
              />
              <IoCloseCircle
                style={{ cursor: "pointer", color }}
                className={styles.searchIcon}
                onClick={() => handleQuery("")}
              />
            </div>
            <p
              style={{ color }}
              onClick={() => onSearch(query)}
              className={styles.search}
            >
              Search
            </p>
          </div>
          <div className={styles.content}>
            {results.map((item: any, index: number) => (
              <SearchResult
                bg={bg}
                color={color}
                handleClick={() => handleClick(item.cfi)}
                key={index}
                text={item.excerpt}
                pageno={item.cfi}
              />
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
