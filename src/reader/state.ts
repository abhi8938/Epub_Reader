import { useState } from "react";
import { default_ann, default_config } from "./Assets/theme";

const useReaderState = () => {
  //* STATE
  const [src, setSrc] = useState("");

  const [bookData, setBookData] = useState({
    title: "",
    toc: [],
    book: {},
    location: "",
    selected: false,
    load: false,
  });

  const [controls, setControls] = useState({
    showBars: true,
    showNav: false,
    sliderDisabled: false,
    visibleLocation: { start: { percentage: 0 } },
    showSearch: false,
    showNotes: false,
    type: "",
  });

  const [pageData, setPageData] = useState({
    cfi: "",
    bookmark: false,
    notes: [],
  });

  const [annotations, setAnnotations] = useState({
    ann: default_ann,
  });

  const [config, setConfig] = useState(default_config);

  const [search, setSearch] = useState({
    query: "",
    show: false,
  });

  const [lists, setLists] = useState({
    annotations: [],
    results: [],
    content: [],
  });

  const [selected, setSelected] = useState({
    data: "",
    epubcfi: "",
  });

  const [Error, setError] = useState("");

  //* STATE HANDLERS

  const handleBook = (key: string, value: any) => {
    let x: any = {
      title: bookData.title,
      toc: bookData.toc,
      book: bookData.book,
      location: bookData.location,
    };
    if (key === "book") {
      x[key] = value;
      x["title"] = value.package.metadata.title;
      x["toc"] = value.navigation.toc;
    } else {
      x[key] = value;
    }
    setBookData(x);
  };
  const handleControls = (
    key:
      | "showBars"
      | "showNav"
      | "showNotes"
      | "sliderDisabled"
      | "visibleLocation"
      | "showDropmenu"
      | "type",
    value: any
  ) => {
    let x: any = {
      showBars: controls.showBars,
      showNav: controls.showNav,
      showNotes: controls.showNotes,
      sliderDisabled: controls.sliderDisabled,
      visibleLocation: controls.visibleLocation,
      type: controls.type,
    };
    //* - close dropmenu when clicked anywhere on reader
    if (key === "showBars") {
      x["type"] = "";
    } else if (key === "type" && value.length === 0) {
      //* show selection when selected and key === type and type === ''
      handleConfig("selectActive", "text");
    }
    x[key] = value;

    setControls(x);
  };
  const handleConfig = (key: string, value: any) => {
    let x: any = {
      size: config.size,
      background: config.background,
      brightness: config.brightness,
      flow: config.flow,
      font: config.font,
      color: config.color,
      selectActive: config.selectActive,
    };
    if (key === "CONFIG") {
      return setConfig(value);
    }
    x[key] = value;
    setConfig(x);
  };
  const handleSearch = (key: "query" | "results" | "show", value: any) => {
    let x: any = {
      query: search.query,
      show: search.show,
    };
    x[key] = value;
    setSearch(x);
  };
  const handleAnnotations = (key: "ann", value: any) => {
    let x: any = {
      ann: annotations.ann,
    };
    x[key] = value;
    setAnnotations(x);
  };
  const handleLists = (key: "annotations" | "content", value: any) => {
    let x: any = {
      annotations: lists.annotations,
      content: lists.content,
      results: lists.results,
    };
    x[key] = value;
    setLists(x);
  };

  //TODO:TRIGGER this onPageChange
  const handlePageData = (key: "cfi" | "bookmark" | "notes", value: any) => {
    let x: any = {
      cfi: pageData.cfi,
      bookmark: pageData.bookmark,
      notes: pageData.notes,
    };
    x[key] = value;
    setPageData(x);
  };
  const toggleBars = () => {
    handleControls("showBars", !controls.showBars);
  };

  //*-------------------EPUB HANDLERS--------------------

  const onPress = (cfi: any, position: any, rendition: any) => {
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

  const onSelected = (cfiRange: any, book: any) => {
    handleConfig("selectActive", "none");

    return book.getRange(cfiRange).then(function (range: any) {
      setSelected({
        epubcfi: cfiRange,
        data: range.endContainer.data,
      });
    });
  };

  const onMarkClicked = (cfiRange: any, data: any, book: any) => {
    console.log("mark clicked", cfiRange);
    return book
      .getRange(cfiRange)
      .then(function (range: any) {
        console.log("range", range);
        setSelected({
          epubcfi: cfiRange,
          data: range.endContainer.data,
        });
      })
      .catch((err: any) => console.log("error_mark", err));
  };

  const onReady = (book: any) => {
    handleBook("book", book);
  };

  const onError = (message: any) => {};

  return {
    src,
    bookData,
    controls,
    pageData,
    annotations,
    config,
    search,
    lists,
    selected,
    handleBook,
    handleControls,
    handleAnnotations,
    handleConfig,
    handleSearch,
    handleLists,
    handlePageData,
    toggleBars,
    setSrc,
    setSelected,
    onError,
    onReady,
    onMarkClicked,
    onSelected,
    beforeViewRemoved,
    onViewAdded,
    onDblPress,
    onLongPress,
    onPress,
  };
};

export default useReaderState;
