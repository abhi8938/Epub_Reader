//@ts-nocheck

import Services from "./services";

const services = new Services();
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
    let iframeBody = document.getElementsByTagName("iframe");
    for (var i = 0, len = iframeBody.length; i < len; i++) {
      var taskItem = iframeBody[i];
      taskItem.contentWindow.document.addEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
          console.log("event", e);
          e.stopPropagation();
        },
        false
      );
    }
  };

  const onAnnotations = (ann: []) => {
    let data: any[] = [];
    const annData = Object.entries(ann);
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
    console.log("data", data);
    services
      .updateAnnotations(data)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => console.log("update ann error", error));
  };

  const setAnnotations = (setAnn: (data: any) => void) => {
    services
      .getAnn()
      .then((response) => {
        console.log("ann data", response.data[0].ann);
        const annData = response.data[0].ann;
        setAnn(annData);
      })
      .catch((error) => console.log("ann fetch error", error));
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
    onAnnotations,
    setAnnotations,
  };
};

export default Handlers;
