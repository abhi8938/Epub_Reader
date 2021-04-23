//@ts-nocheck

import React, { useEffect, useRef, useState } from "react";

import AnnotationModal from "../AnnotationsModal/AnnotationsModal";
import BottomBar from "../BottomBar/BottomBar";
import ConfigMenu from "./ConfigMenu/ConfigMenu";
import Handlers from "./Handlers";
import PopUpMenu from "./PopUpMenu/PopUpMenu";
import { ReactReader } from "react-reader";
import SearchModal from "../SearchModal/SearchModal";
import Topbar from "./TopBar/TopBar";
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
  const [rendition, setRendition] = useState();
  const epubRef: any = useRef(null);
  const {
    disableContextMenu,
    onAnnotations,
    setAnnotations,
    updateAnnotations,
  } = Handlers();
  const { handleBook } = useReaderState();
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  const [load, setLoad] = useState(true);
  const [show, setShow] = useState(false);
  const [showSidebar, setShowSideBar] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState();
  const [cfi, setCfi] = useState();
  const [pageCfi, setPageCfi] = useState();
  const [annotations, setAnnotationsData] = useState(undefined);
  const [bookmarkList, setBookmarkList] = useState([]);

  const getPosition = (e?: any) => {
    var posx = 0;
    var posy = 0;
    let selection;
    let iframeBody = document.getElementsByTagName("iframe");
    for (var i = 0, len = iframeBody.length; i < len; i++) {
      var doc = iframeBody[i]?.contentWindow?.document;
      const sel = doc?.getSelection();
      if (sel.type === "None") continue;
      selection = sel;
    }
    if (selection) {
      let range = selection.getRangeAt(0).cloneRange();
      console.log("range", range.getClientRects());
      if (!range.getClientRects) return;
      posy = range.getClientRects().item(0).y;
      posx = range.getClientRects().item(0).x;
      // console.log("x,y", posx, posy);
      setCoord({
        x: posx,
        y: posy + 45,
      });
    }
  };

  useEffect(() => {
    if (load === false) {
      disableContextMenu();
    }
    // eslint-disable-next-line
  }, [load]);

  useEffect(() => {
    if (epubRef.current?.readerRef.current.book.isOpen === true) {
      console.log("book", epubRef.current);
      handleBook("book", epubRef.current?.readerRef.current.book);
    }
    // eslint-disable-next-line
  }, [epubRef.current?.readerRef]);

  useEffect(() => {
    if (rendition) {
      if (showScroll === true) {
        rendition.flow("scrolled");
      } else {
        rendition.flow("paginated");
      }
    }
    // eslint-disable-next-line
  }, [showScroll]);

  const onColorChange = (color: string) => {
    setColor(color);
    rendition.themes.default({
      body: { "background-color": color },
    });
  };

  const deleteHighlight = (epubcfi: string) => {
    rendition.annotations.remove(epubcfi, "highlight");
    let data = [...annotations];
    data = data.filter((item: any, index: number) => item.epubCfi !== epubcfi);
    setAnnotationsData(data);
    updateAnnotations(data);
  };

  const highlightText = (color: string) => {
    rendition.annotations.remove(cfi, "highlight");
    rendition.annotations.highlight(
      cfi,
      {
        text: rendition.getRange(cfi).toString(),
      },
      (e) => {
        console.log("annotation clicked", e);
      },
      "hl",
      {
        fill: color,
        "fill-opacity": "0.5",
        "mix-blend-mode": "multiply",
      }
    );
    console.log("ann", rendition.annotations._annotations);
    onAnnotations(rendition.annotations._annotations);
    let data = [];
    const annData = Object.entries(rendition.annotations._annotations);
    annData.map((item: any, index: number) => {
      data.push({
        type: "HIGHLIGHT",
        pageCfi: item[1].cfiRange,
        epubCfi: item[1].cfiRange,
        color: item[1].styles.fill,
        text: item[1].data.text,
      });
      return true;
    });
    setAnnotationsData(data);
  };

  const onBookMark = () => {
    let data = [...annotations];
    data.push({
      type: "BOOKMARK",
      pageCfi: pageCfi,
      epubCfi: pageCfi,
      color: "#000",
      text: rendition
        .getRange(pageCfi.slice(0, -5) + ",/1:0,/1:10)")
        .toString(),
    });
    setAnnotationsData(data);
    updateAnnotations(data);
  };

  const onBookMarkDelete = (pagecfi: string) => {
    const data = annotations.filter(
      (item: any, index: number) => item.epubCfi !== pageCfi
    );
    setAnnotationsData(data);
    updateAnnotations(data);
  };

  const showAnn = (cfi: string, text: string, color: string) => {
    rendition.annotations.highlight(
      cfi,
      {
        text,
      },
      (e) => {
        console.log("annotation clicked", e);
      },
      "hl",
      {
        fill: color,
        "fill-opacity": "0.5",
        "mix-blend-mode": "multiply",
      }
    );
  };

  useEffect(() => {
    if (rendition) {
      rendition.themes.fontSize(fontSize + "px");
    }
    // eslint-disable-next-line
  }, [fontSize]);

  useEffect(() => {
    if (rendition) {
      setAnnotations((data: any) => {
        setAnnotationsData(data);
        data.map((item: any, index: number) => {
          showAnn(item.epubCfi, item.text, item.color);
          return true;
        });
      });
    }
    // eslint-disable-next-line
  }, [rendition]);

  useEffect(() => {
    if (annotations) {
      let list = [];
      annotations?.map((item: any, index: number) => {
        if (item.type === "BOOKMARK") {
          list.push(item.pageCfi);
        }
        return true;
      });
      setBookmarkList(list);
    }
  }, [annotations]);
  return (
    <>
      <ConfigMenu
        open={showConfigMenu}
        close={() => setShowConfigMenu(false)}
        onScrollChnage={(value: boolean) => setShowScroll(value)}
        scrollValue={showScroll}
        onColorChange={onColorChange}
        increaseSize={() => setFontSize(fontSize + 2)}
        decreaseSize={() => setFontSize(fontSize - 2)}
      />
      <SearchModal open={showSidebar} close={() => setShowSideBar(false)} />
      <AnnotationModal
        open={showAnnotation}
        close={() => setShowAnnotation(false)}
        annotations={annotations}
        onNotesCLick={(epubcfi) => rendition.display(epubcfi)}
        deteleHighlight={deleteHighlight}
        deteleBookmark={onBookMarkDelete}
      />
      <Topbar
        shown={true}
        title={"Text Top bar"}
        bg={"#CCCCCC"}
        onSearch={() => setShowSideBar(true)}
        onAnnotations={() => setShowAnnotation(true)}
        onSettings={() => setShowConfigMenu(true)}
        onBookMark={onBookMark}
        isMarked={bookmarkList.includes(pageCfi)}
      />
      <PopUpMenu
        coord={coord}
        show={show}
        hide={() => setShow(false)}
        highlight={highlightText}
      />
      <BottomBar
        color={color}
        onNext={() => epubRef.current.next()}
        onPrev={() => epubRef.current.prev()}
      />
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          boxSizing: "border-box",
          paddingBottom: "50px",
        }}
      >
        <ReactReader
          ref={epubRef}
          url={"https://s3.amazonaws.com/epubjs/books/moby-dick.epub"}
          handleTextSelected={(data) => {
            setCfi(data);
            console.log("selected", data);
            getPosition();
            setShow(true);
          }}
          locationChanged={(cfi: any) => {
            disableContextMenu();
            setPageCfi(cfi);
          }}
          epubOptions={{
            manager: "continuous",
            flow: "paginated",
          }}
          tocChanged={(data: any) => {
            setLoad(false);
          }}
          getRendition={(data: any) => {
            setRendition(data);
            console.log("rendition", data);
          }}
        />
      </div>
    </>
  );
}

export default Reader;
