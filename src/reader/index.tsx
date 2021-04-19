//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";
import AnnotationModal from "../AnnotationsModal/AnnotationsModal";
import BottomBar from "../BottomBar/BottomBar";
import SearchModal from "../SearchModal/SearchModal";
import ConfigMenu from "./ConfigMenu/ConfigMenu";
import Handlers from "./Handlers";
import PopUpMenu from "./PopUpMenu/PopUpMenu";
import useReaderState from "./state";
import Topbar from "./TopBar/TopBar";
import Tippy from "@tippyjs/react";
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
  const { disableContextMenu } = Handlers();
  const { handleBook, bookData } = useReaderState();
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  const [load, setLoad] = useState(true);
  const [show, setShow] = useState(false);
  const [showSidebar, setShowSideBar] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [contHeight, setContHeight] = useState(0);
  const [popHeight, setPopHeight] = useState(0);
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
      console.log("x,y", posx, posy);
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
  return (
    <>
      <ConfigMenu
        open={showConfigMenu}
        close={() => setShowConfigMenu(false)}
        onScrollChnage={(value: boolean) => setShowScroll(value)}
        scrollValue={showScroll}
      />
      <SearchModal open={showSidebar} close={() => setShowSideBar(false)} />
      <AnnotationModal
        open={showAnnotation}
        close={() => setShowAnnotation(false)}
      />
      <Topbar
        shown={true}
        title={"Text Top bar"}
        bg={"#CCCCCC"}
        onSearch={() => setShowSideBar(true)}
        onAnnotations={() => setShowAnnotation(true)}
        onSettings={() => setShowConfigMenu(true)}
      />
      <PopUpMenu coord={coord} show={show} hide={() => setShow(false)} />
      <BottomBar
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
            console.log("selected", data);
            getPosition();
            let iframeBody = document.getElementsByTagName("iframe");
            let popmenu = document.getElementById("pop_menu");
            // setContHeight();
            console.log("pop", popmenu, iframeBody[0]);
            setShow(true);
          }}
          locationChanged={(epubcifi: any) => {
            disableContextMenu();
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
          }}
        />
      </div>
    </>
  );
}

export default Reader;

//   const onSelect = (data: any) => {
//     console.log("selected", data);
//     let iframeBody = document.getElementsByTagName("iframe");
//     //@ts-ignore
//     console.log(iframeBody[0].contentWindow.document);
//     //@ts-ignore
//     iframeBody[0].contentWindow.document.getSelection().removeAllRanges();
//   };
