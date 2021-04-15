//@ts-nocheck
const Handlers = () => {
  const onPress = (
    cfi: any,
    position: any,
    rendition: any,
    toggleBars: () => void
  ) => {
    toggleBars();
  };

  const onLongPress = (cfi: any, rendition: any) => {};

  const onDblPress = (
    cfi: any,
    position: any,
    imgSrc: any,
    rendition: any
  ) => {};

  const onViewAdded = (index: any) => {};

  const beforeViewRemoved = (index: any) => {};

  const onSelected = (
    cfiRange: any,
    setSelected: any,
    book: any,
    handleConfig: any
  ) => {
    handleConfig("selectActive", "none");

    return book.getRange(cfiRange).then(function (range: any) {
      setSelected({
        epubcfi: cfiRange,
        data: range.endContainer.data,
      });
    });
  };

  const onMarkClicked = (
    cfiRange: any,
    data: any,
    book: any,
    setSelected: any
  ) => {
    return book.getRange(cfiRange).then(function (range: any) {
      setSelected({
        epubcfi: cfiRange,
        data: range.endContaitner.data,
      });
    });
  };

  const onReady = (
    book: any,
    handleBook: (key: string, value: any) => void
  ) => {
    handleBook("book", book);
  };

  const onError = (message: any) => {};

  const disableContextMenu = (timeout: any) => {
    setTimeout(() => {
      let iframeBody = document.getElementsByTagName("iframe");
      //@ts-ignore
      if (iframeBody.length !== 0) {
        iframeBody[0].contentWindow.document.addEventListener("click", (e) => {
          console.log("select event", e);
        });
        iframeBody[0].contentWindow.document.addEventListener(
          "contextmenu",
          function (e) {
            console.log("contextmenu");
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        );
      }
    }, timeout);
  };

  return {
    onPress,
    onDblPress,
    onError,
    onReady,
    disableContextMenu,
    onMarkClicked,
    onSelected,
    onViewAdded,
    beforeViewRemoved,
    onLongPress,
  };
};

export default Handlers;
