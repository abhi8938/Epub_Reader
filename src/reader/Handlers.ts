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

  const disableContextMenu = (timeout: any) => {
    let iframeBody = document.getElementsByTagName("iframe");
    for (var i = 0, len = iframeBody.length; i < len; i++) {
      var taskItem = iframeBody[i];
      taskItem.contentWindow.document.addEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
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

  const updateAnnotations = (ann: []) => {
    services
      .updateAnnotations(ann)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => console.log("update ann error", error));
  };

  const setAnnotations = (setAnn: (data: any) => void) => {
    services
      .getAnn()
      .then((response) => {
        const annData = response.data.ann;
        let data = [];
        annData.map((item: any, index: number) => {
          delete item._id;
          data.push(item);
          return true;
        });
        setAnn(annData);
      })
      .catch((error) => console.log("ann fetch error", error));
  };

  return {
    updateAnnotations,
    onPress,
    disableContextMenu,
    onMarkClicked,
    onSelected,
    onAnnotations,
    setAnnotations,
  };
};

export default Handlers;
