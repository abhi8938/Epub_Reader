import React, { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";
import Handlers from "./Handlers";
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
  const epubRef: any = useRef(null);
  const { disableContextMenu, onReady } = Handlers();
  const { handleBook, bookData } = useReaderState();

  const [load, setLoad] = useState(true);

  useEffect(() => {
    load === false && disableContextMenu(1000);
  }, [load]);

  useEffect(() => {
    if (epubRef.current?.readerRef.current.book.isOpen === true) {
      console.log("book", epubRef.current?.readerRef.current.book);
      handleBook("book", epubRef.current?.readerRef.current.book);
    }
  }, [epubRef.current?.readerRef]);

  useEffect(() => console.log("Book Data", bookData), [bookData]);
  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <ReactReader
        ref={epubRef}
        url={"https://s3.amazonaws.com/epubjs/books/moby-dick.epub"}
        title={"Test Epub"}
        locationChanged={(epubcifi: any) => {
          console.log(epubcifi);
          disableContextMenu(0);
        }}
        tocChanged={(data: any) => {
          setLoad(false);
        }}
        getRendition={(rendition: any) => {
          console.log("rendition", rendition);
          rendition.themes.default({
            body: {},
          });
        }}
      />
    </div>
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
