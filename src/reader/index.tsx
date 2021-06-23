//@ts-nocheck

import React, { useEffect, useRef } from "react";

import AnnotationModal from "../AnnotationsModal/AnnotationsModal";
import BottomBar from "../BottomBar/BottomBar";
import ConfigMenu from "./ConfigMenu/ConfigMenu";
import { EpubViewer } from "react-epub-viewer";
import PopUpMenu from "./PopUpMenu/PopUpMenu";
import SearchModal from "../SearchModal/SearchModal";
import TocModal from "../TocModal/TocModal";
import Topbar from "./TopBar/TopBar";
import spinner from "./Assets/spinner.gif";
import useReaderState from "./state";

/* TO-DO

  1.) Save Annotations created by user
       - Show Dropmenu component whenever text is selected  -  Location, 
  2.) Dropmenu - Text Select 
       - Highlight Colors 
       - Note - Text Input Multiline, save button
       - Dictionary - create modal dictionary
       - delete - show when mark clicked
  3.) Drop Menu - Configurations
       - Toggle Font size
       - Change Font Family
       - Toggle font style
       - Change theme
       - Toggle flow
       - Toggle Brightness
  4.) Create Bookmark toggle
  5.) Create Search - search icon and modal
  6.) Create Navigation - Top tab bar - notes and bookmarks
  7.) BottomBar - Left, right, pageNo
  8.) Test from 1-7
  9.) send update request to backend
  10.) Connect Nav Screen to notes and bookmarks

*/
function Reader() {
  const {
    showAnn,
    onBookMarkDelete,
    onBookMark,
    highlightText,
    deleteHighlight,
    onColorChange,
    scroll,
    setScroll,
    setAnnotations,
    updateAnnotations,
    onAnnotations,
    disableContextMenu,
    handleConfig,
    handleInputs,
    handleLists,
    handleShow,
    rendition,
    setRendition,
    coord,
    setCoord,
    book,
    inputs,
    lists,
    config,
    show,
    cfi,
    handleCFI,
    bookmarkedPages,
    setBookmarkedPages,
    toc,
    setTOC,
    setBook,
    setLoad,
    load,
    handlePage,
    page,
    setPage,
    setX,
    setY,
    onNote,
    note,
    updateNote,
    y,
    x,
    url,
    onSearch,
    setUrl,
    meanings,
    handleMeaning,
    handleMarked,
    fetchMeanings,
    marked,
    setNote,
    setMarked,
    setShared,
    sharedData,
    setAnn,
    annRef,
    getPosition,
  } = useReaderState();
  const epubRef: any = useRef(null);
  let rendiRef: any = useRef(null);

  useEffect(() => {
    if (load === false) {
      disableContextMenu();
    }
    // eslint-disable-next-line
  }, [load]);

  useEffect(() => {
    if (rendiRef.current) {
      if (scroll === true) {
        rendiRef.current.flow("scrolled");
      } else {
        rendiRef.current.flow("paginated");
      }
    }
    // eslint-disable-next-line
  }, [scroll]);

  useEffect(() => {
    if (rendiRef.current) {
      rendiRef.current.themes.fontSize(config.fontSize + "px");
      rendiRef.current.manager.clear();
      rendiRef.current.display(page.cfi);
    }
    // eslint-disable-next-line
  }, [config.fontSize]);

  useEffect(() => {
    if (rendiRef.current) {
      const windy: any = window;
      rendiRef.current.themes.default({
        body: { color: config.color },
      });
      const background = {
        type: "BACKGROUND",
        value: config.bg,
      };
      windy.ReactNativeWebView &&
        windy.ReactNativeWebView.postMessage(JSON.stringify(background));
    }
    // eslint-disable-next-line
  }, [config]);

  useEffect(() => {
    if (lists.annotations) {
      let list = [];

      lists.annotations?.map((item: any, index: number) => {
        if (item.type === "BOOKMARK") {
          list.push(parseInt(item.pageNumber));
        }
        return true;
      });
      setBookmarkedPages(list);
    }
  }, [lists.annotations]);

  useEffect(() => {
    if (rendiRef.current) {
      rendiRef.current.on("selected", (cfiRange, content) => {
        getPosition();
        let newCfi = handleMarked(cfiRange, rendiRef.current, annRef.current);
        if (newCfi !== null) {
          handleCFI("range", newCfi);
        } else {
          handleCFI("range", cfiRange);
        }
        content.window.getSelection().removeAllRanges();
      });

      rendiRef.current.on("relocated", function (location) {
        // var percent = book.locations.percentageFromCfi(location.start.cfi);

        let current = location.start.displayed.page;
        let total = location.end.displayed.total;
        var percentage = Math.floor((current / total) * 100);
        setPage({
          current:
            location.atEnd === true
              ? location.end.displayed.page
              : location.start.displayed.page,
          total: location.end.displayed.total,
          cfi: location.start.cfi,
          percentage: location.atEnd === true ? "the end" : percentage,
        });
      });

      rendiRef.current.on("markClicked", (_cfi, data, content) => {
        let selection = content.document.getSelection();
        let range = selection.getRangeAt(0).cloneRange();
        if (!range.getClientRects) return;
        let posy = range.getClientRects().item(0).y;
        let posx = range.getClientRects().item(0).x;
        setMarked(true);
        handleCFI("range", _cfi);
        let x = posx > window.innerWidth ? posx % window.innerWidth : posx;
        setX(x);
        setY(posy + 30);
        handleShow("popup", true);
      });

      if (window.URI && window.token && window.paper) {
        setShared({
          token: window.token,
          paper: window.paper,
          annotation: "",
        });
        setAnnotations(window.token, window.paper, rendiRef.current);
      }
    }
  }, [rendiRef.current]);

  useEffect(() => {
    setTimeout(() => {
      if (window.URI && window.token && window.paper) {
        setUrl(window.URI);
      }
    }, 300);
  }, []);

  return (
    <div
      style={{
        backgroundColor: `${config.bg}50`,
        width: "100vw",
        height: "94vh",
      }}
    >
      <ConfigMenu
        color={config.color}
        bg={config.bg}
        nightMode={show.nightMode}
        open={show.config}
        close={() => handleShow("config", false)}
        onScrollChnage={(value: boolean) => setScroll(value)}
        scrollValue={scroll}
        onColorChange={(color, bg) => {
          if (bg !== "#000000") {
            handleShow("nightMode", false);
          }
          onColorChange(color, bg);
        }}
        increaseSize={() =>
          config.fontSize <= 24 && handleConfig("fontSize", config.fontSize + 2)
        }
        decreaseSize={() =>
          config.fontSize >= 16 && handleConfig("fontSize", config.fontSize - 2)
        }
        onNightMode={(value, color, bg) => {
          handleShow("nightMode", value);
          if (value === true) {
            onColorChange(color, bg);
          } else {
            onColorChange("#000000", "#ffffff");
          }
        }}
      />
      <SearchModal
        color={config.color}
        bg={`${config.bg}50`}
        handleClick={(_cfi) => {
          rendiRef.current.annotations.underline(
            _cfi,
            {
              text: rendiRef.current.getRange(_cfi).toString(),
            },
            (e: any) => {
              console.log("marked successfully", e);
            },
            "hl",
            {
              "text-decoration": "underline",
              "text-decoration-color": "red",
            }
          );
          rendiRef.current.display(_cfi);
          handleShow("search", false);
          setTimeout(() => {
            rendiRef.current.annotations.remove(_cfi, "underline");
          }, 3000);
        }}
        query={inputs.search}
        results={lists.search}
        onSearch={(query) => {
          onSearch(query, book);
        }}
        open={show.search}
        close={() => handleShow("search", false)}
        handleQuery={(query) => {
          handleLists("search", []);
          handleInputs("search", query);
        }}
      />
      <AnnotationModal
        color={config.color}
        bg={config.bg}
        handleBookmark={(cfi) => {
          rendiRef.current.display(cfi);
          handleShow("annotation", false);
        }}
        open={show.annotation}
        close={() => handleShow("annotation", false)}
        annotations={lists.annotations}
        onNotesCLick={(epubcfi) => {
          rendiRef.current.display(epubcfi);
          handleShow("annotation", false);
        }}
        deleteBookmark={onBookMarkDelete}
        deleteHighlight={(cfi) => deleteHighlight(cfi, rendiRef.current)}
        handleNote={(epubCFI, note) =>
          updateNote(epubCFI, note, rendiRef.current)
        }
      />

      <PopUpMenu
        color={config.color}
        bg={`${config.bg}50`}
        marked={marked}
        onSearchPress={() => {
          let searchText = rendiRef.current.getRange(cfi.range).toString();
          handleInputs("search", searchText);
          handleShow("search", true);
          onSearch(searchText, book);
        }}
        coord={{ x: x, y: y }}
        show={show.popup}
        hide={() => {
          handleMeaning("english", {
            word: "",
            prounciation: "",
            definition: "",
            example: "",
            synonyms: [],
          });
          handleShow("popup", false);
          setMarked(false);
          setNote("");
          setX(0);
          setY(0);
        }}
        highlight={(color) => highlightText(color, rendiRef.current)}
        note={note}
        onNote={(note) => onNote(note, rendiRef.current)}
        onDeleteNote={() => {
          updateNote(cfi.range, "", rendiRef.current);
        }}
        meanings={meanings}
        deleteHighlight={() => {
          deleteHighlight(cfi.range, rendiRef.current);
          handleShow("popup", false);
        }}
        onMeaning={() => {
          let meaningText = rendiRef.current.getRange(cfi.range).toString();
          fetchMeanings(meaningText);
        }}
      />

      <TocModal
        color={config.color}
        bg={`${config.bg}50`}
        show={show.toc}
        toggle={() => handleShow("toc", false)}
        toc={toc}
        handleClick={(href) => {
          rendiRef.current.display(href);
          handleShow("toc", false);
        }}
      />
      <div>
        <Topbar
          bg={`${config.bg}`}
          color={config.color}
          shown={true}
          title={"Text Top bar"}
          onSearch={() => handleShow("search", true)}
          onAnnotations={() => handleShow("annotation", true)}
          onSettings={() => handleShow("config", true)}
          onBookMark={() => onBookMark(rendiRef.current)}
          isMarked={bookmarkedPages.includes(page.current)}
          onToc={() => handleShow("toc", true)}
          scroll={scroll}
          onBookMarkDelete={() => onBookMarkDelete(page.current)}
        />
        <EpubViewer
          url={url}
          ref={epubRef}
          style={{ height: "85vh", marginTop: "6vh" }}
          pageChanged={(page) => {
            disableContextMenu();
            let windy: any = window;
            const LOAD_FALSE = "LOAD_FALSE";
            windy.ReactNativeWebView &&
              windy.ReactNativeWebView.postMessage(
                JSON.stringify({ type: LOAD_FALSE })
              );
          }}
          tocChanged={(toc) => {
            setTOC(toc);
            setLoad(false);
          }}
          bookChanged={(book) => {
            setBook(book);
          }}
          epubOptions={{
            resizeOnOrientationChange: true,
            spread: "auto",
            flow: "paginated",
          }}
          rendtionChanged={(rendition) => {
            console.log("rendi", rendition);
            rendiRef.current = rendition;
            setRendition(rendition);
          }}
          loadingView={
            <div
              style={{
                height: "95vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  width: "70px",
                  height: "70px",
                  aspectRatio: "1:1",
                }}
                src={spinner}
                alt="loading..."
              />
            </div>
          }
        />
        <BottomBar
          color={config.color}
          bg={`${config.bg}`}
          onNext={() => rendiRef.current && rendiRef.current.next()}
          onPrev={() => rendiRef.current && rendiRef.current.prev()}
          page={{
            current: page.current,
            total: page.total,
            percentage: page.percentage,
          }}
          scroll={scroll}
        />
      </div>
    </div>
  );
}

export default Reader;

// const getPosition = (e?: any) => {
//   var posy = 0;
//   let posx = 0;
//   let selection;
//   let iframeBody = document.getElementsByTagName("iframe");
//   for (var i = 0, len = iframeBody.length; i < len; i++) {
//     var doc = iframeBody[i]?.contentWindow?.document;
//     const sel = doc?.getSelection();
//     if (sel.type === "None") continue;
//     selection = sel;
//   }
//   if (selection) {
//     let range = selection.getRangeAt(0).cloneRange();
//     if (!range.getClientRects) return;
//     posy = range.getClientRects().item(0).y;
//     posx = range.getClientRects().item(0).x;
//      setY(posy);
//      setX(posx);
//   }
// };
