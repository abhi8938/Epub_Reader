import { useRef, useState } from "react";

import Services from "./services";
import axios from "axios";

const services = new Services();
const useReaderState = () => {
  const [rendition, setRendition]: any = useState(null);
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [note, setNote] = useState("");
  const [show, setShow] = useState({
    search: false,
    annotation: false,
    config: false,
    scroll: false,
    toc: false,
    popup: false,
    nightMode: false,
  });

  const [scroll, setScroll] = useState(false);

  const [cfi, setCfi] = useState({
    range: "",
    page: "",
  });

  const [lists, setLists] = useState({
    annotations: [], // BOOKMARKS + ANNOTATIONS,
    search: [],
  });

  const annRef: any = useRef(lists.annotations);

  const setAnn = (data: any) => {
    annRef.current = data;
    handleLists("annotations", data);
  };

  const [bookmarkedPages, setBookmarkedPages] = useState([]);

  const [inputs, setInputs] = useState({
    search: "",
    note: "",
  });

  const [page, setPage] = useState({
    current: 0,
    total: 0,
    cfi: "",
    percentage: 0,
  });
  const [url, setUrl] = useState(
    "https://digitalluxe.ca/api/paper/files/BBA_E-COMMERCE_SEMESTER-2_PAPER-1.epub"
  );
  // "https://digitalluxe.ca/api/paper/files/BBA_E-COMMERCE_SEMESTER-2_PAPER-1.epub";

  const [book, setBook]: any = useState(null);
  const [load, setLoad] = useState(false);
  const [config, setConfig] = useState({
    fontSize: 16,
    color: "",
    bg: "",
  });
  const [toc, setTOC] = useState([]);
  const [sharedData, setShared] = useState({
    token: "",
    paper: "",
    annotation: "",
  });
  const [marked, setMarked] = useState(false);
  const [meanings, setMeanings] = useState({
    hindi: "",
    english: {
      word: "",
      prounciation: "",
      definition: "",
      example: "",
      synonyms: [],
      error: "",
    },
  });

  const fetchMeanings = async (query: string) => {
    if (query.includes(" "))
      return handleMeaning("english", {
        ...meanings.english,
        error: "Please select a single word",
      });
    try {
      let eng = await axios.get(
        "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + query
      );
      let data = {
        word: eng.data[0].word,
        prounciation: eng.data[0].phonetics[0].text,
        definition: eng.data[0].meanings[0].definitions[0].definition,
        example: eng.data[0].meanings[0].definitions[0].example,
        synonyms: eng.data[0].meanings[0].definitions[0].synonyms,
        error: "",
      };
      handleMeaning("english", data);
    } catch (e) {
      console.log("meaning_error", JSON.stringify(e));
    }
  };

  const handleMeaning = (key: string, value: any) => {
    let x: any = { ...meanings };
    x[key] = value;
    setMeanings(x);
  };

  const handleShow = (key: string, value: boolean) => {
    let x: any = { ...show };
    if (key === "popup") {
      x["annotation"] = false;
    }
    x[key] = value;

    setShow(x);
  };

  const handleLists = (key: string, value: any) => {
    let x: any = { ...lists };
    x[key] = value;
    setLists(x);
  };

  const handleInputs = (key: string, value: string) => {
    let x: any = { ...inputs };
    x[key] = value;
    setInputs(x);
  };

  const handleConfig = (key: string, value: any) => {
    let x: any = { ...config };
    x[key] = value;
    setConfig(x);
  };

  const handleCFI = (key: string, value: any) => {
    let x: any = { ...cfi };
    x[key] = value;

    setCfi(x);
  };

  const handleCoord = (key: string, value: any) => {
    let x: any = JSON.parse(JSON.stringify(coord));
    x[key] = value;
    setCoord(x);
  };

  const disableContextMenu = (timeout: any) => {
    let iframeBody = document.getElementsByTagName("iframe");
    for (var i = 0, len = iframeBody.length; i < len; i++) {
      var taskItem = iframeBody[i];
      taskItem.contentWindow &&
        taskItem.contentWindow.addEventListener(
          "contextmenu",
          // eslint-disable-next-line no-loop-func
          function (e) {
            e.preventDefault();
            e.stopPropagation();
          },
          false
        );
    }
  };

  const getPosition = () => {
    var posy = 0;
    let posx = 0;
    let selection;
    let iframeBody = document.getElementsByTagName("iframe");
    for (var i = 0, len = iframeBody.length; i < len; i++) {
      var doc = iframeBody[i]?.contentWindow?.document;
      const sel: any = doc?.getSelection();
      if (sel.type === "None") continue;
      selection = sel;
    }
    if (selection) {
      let range = selection.getRangeAt(0).cloneRange();
      if (!range.getClientRects) return;
      posy = range.getClientRects().item(0).y;
      posx = range.getClientRects().item(0).x;
      if (
        selection?.toString().length === 0 ||
        selection?.toString().replace(/\s/g, "").length === 0
      )
        return;

      let x = posx > window.innerWidth ? posx % window.innerWidth : posx;
      let y = posy > window.innerHeight ? posy % window.innerHeight : posy;
      setX(x);
      setY(y + 30);
      handleShow("popup", true);
    }
  };

  const onAnnotations = (ann: any) => {
    let wind: any = window;
    const resp: any = services.updateAnnotations(
      ann,
      wind.token,
      sharedData.annotation
    );
    if (resp.status === 200) {
      // alert(`updated - ${JSON.stringify(resp.data)}`);
    } else if (resp.status !== 200) {
      // alert(`error- ${JSON.stringify(resp)}`);
    }
  };

  const setAnnotations = (token: string, paper: string, rendi: any) => {
    services
      .getAnn(token, paper)
      .then((response) => {
        // alert(
        //   `ann fetch - ${response.status} = ${response.data} - ${response}`
        // );
        const annData = response.data.ann;
        let data: any = [];
        annData.map((item: any, index: number) => {
          delete item._id;
          data.push(item);
          return true;
        });
        setShared({
          token: token,
          paper: paper,
          annotation: response.data._id,
        });
        setAnn(data);
        data.map((item: any, index: number) => {
          showAnn(item.epubCfi, item.text, item.color, rendi);
          return true;
        });
      })
      .catch((error) => alert(`ann fetch error - ${error}`));
  };

  const onColorChange = (color: string, bg: string) => {
    setConfig({
      color,
      bg,
      fontSize: config.fontSize,
    });
  };

  const onSearch = (query: string, _book: any) => {
    //search and set state
    let results: Array<any> = [];
    if (query.length === 0) return;

    Promise.all(
      _book.spine.spineItems.map((item: any) => {
        return item.load(_book.load.bind(_book)).then(() => {
          let results = item.find(query.trim());
          item.unload();
          return Promise.resolve(results);
        });
      })
    ).then((results: any) => {
      let finalResult: any = [].concat.apply([], results);
      console.log("results", results);
      handleLists("search", finalResult);
    });
  };

  const deleteHighlight = (epubcfi: string, rendi: any) => {
    rendi.annotations.remove(epubcfi, "highlight");
    let data: any = [...lists.annotations];
    data = data.filter((item: any, index: number) => {
      if (item.type === "HIGHLIGHT") {
        if (item.epubCfi !== epubcfi) return true;
      } else if (item.type === "BOOKMARK") {
        return true;
      } else {
        return false;
      }
    });
    setAnn(data);
    setMarked(false);
    onAnnotations(data);
  };

  const highlightText = (color: string, rendi: any) => {
    let _cfi = cfi.range;
    let x: Array<any> = [...lists.annotations];

    rendi.annotations.remove(_cfi, "highlight");
    rendi.annotations.highlight(
      _cfi,
      {
        text: rendi.getRange(_cfi).toString(),
      },
      (e: any) => {
        console.log("annotation clicked", e);
      },
      "hl",
      {
        fill: color,
        "fill-opacity": "0.3",
        "mix-blend-mode": "multiply",
        "line-height": "22px",
      }
    );
    //handleState

    let inde = x.findIndex((item) => {
      if (item.type === "HIGHLIGHT") {
        if (item.epubCfi === _cfi) return true;
      } else {
        return false;
      }
    });
    if (inde === -1) {
      x.push({
        type: "HIGHLIGHT",
        pageCfi: _cfi,
        epubCfi: _cfi,
        color: color,
        text: rendi.getRange(_cfi).toString(),
        pageNumber: `${page.current}`,
      });
    } else {
      x[inde] = {
        ...x[inde],
        pageCfi: _cfi,
        epubCfi: _cfi,
        color: color,
      };
    }
    setAnn(x);
    setMarked(true);
    onAnnotations(x);
  };

  const onBookMark = (rendi: any) => {
    let data: any = [...lists.annotations];
    data.push({
      type: "BOOKMARK",
      pageCfi: page.cfi,
      epubCfi: page.cfi,
      color: "#000",
      pageNumber: `${page.current}`,
      text: "Page Number",
    });
    setAnn(data);
    onAnnotations(data);
  };

  const onBookMarkDelete = (pageNumber: number) => {
    const data: any = lists.annotations.filter((item: any, index: number) => {
      if (item.type === "BOOKMARK") {
        if (item.pageNumber !== `${pageNumber}`) return true;
      } else if (item.type === "HIGHLIGHT") {
        return true;
      } else {
        return false;
      }
    });
    setAnn(data);
    onAnnotations(data);
  };

  const showAnn = (_cfi: string, text: string, color: string, rendi: any) => {
    rendi.annotations.highlight(
      _cfi,
      {
        text,
      },
      (e: any) => {
        console.log("annotation clicked", e);
      },
      "hl",
      {
        fill: color,
        "fill-opacity": "0.3",
        "mix-blend-mode": "multiply",
      }
    );
  };

  const handleMarked = (cfiRange: string, rendi: any, list: any) => {
    // check if same chapter
    // check if same pathComponent
    // check if cfiRange is within item.epubcfi
    let chapt1 = rendi.epubcfi.getChapterComponent(cfiRange);
    let path1 = rendi.epubcfi.getPathComponent(cfiRange);
    let range1 = rendi.epubcfi.getRange(cfiRange);
    let x: Array<any> = [...list];
    let _cfi: any = null;
    x.map((item, index) => {
      let chapt2 = rendi.epubcfi.getChapterComponent(item.epubCfi);
      let path2 = rendi.epubcfi.getPathComponent(item.epubCfi);
      let range2 = rendi.epubcfi.getRange(item.epubCfi);
      console.log(
        "ranges",
        cfiRange,
        item.epubCfi,
        rendi.epubcfi.parseComponent(cfiRange),
        rendi.epubcfi.parseComponent(item.epubCfi),
        path1,
        path2,
        range1,
        range2
      );
      // if (
      //  chapt1 === chapt2
      // ) {
      //   setMarked(true);
      //   _cfi = item.epubCfi;
      //   item.note && setNote(item.note);
      // }
    });
    return _cfi;
    // let x: Array<any> = [...lists.annotations];
    // let inde = x.findIndex((item) => {
    //   if (item.type === "HIGHLIGHT") {
    //     if (item.epubCfi === _cfi) return true;
    //   } else {
    //     return false;
    //   }
    // });
    // if (inde !== -1) {
    //   x[inde].note && setNote(x[inde].note);
    // }
  };

  const onNote = (note: string, rendi: any) => {
    let x: Array<any> = [...lists.annotations];
    let inde = x.findIndex((item) => item.epubCfi === cfi.range);
    if (inde === -1) {
      //add
      rendi.annotations.remove(cfi.range, "highlight");
      rendi.annotations.highlight(
        cfi.range,
        {
          text: rendi.getRange(cfi.range).toString(),
        },
        (e: any) => {
          // console.log("annotation clicked", e);
        },
        "hl",
        {
          fill: "#808080",
          "fill-opacity": "0.3",
          "mix-blend-mode": "multiply",
        }
      );
      x.push({
        type: "HIGHLIGHT",
        pageCfi: cfi.range,
        epubCfi: cfi.range,
        color: "#808080",
        text: rendi.getRange(cfi.range).toString(),
        pageNumber: `${page.current}`,
        note,
      });
    } else {
      //update
      x[inde] = {
        ...x[inde],
        note,
      };
    }
    setNote("");
    setAnn(x);
    onAnnotations(x);
  };

  const updateNote = (_cfi: string, note: string, rendi: any) => {
    let x: Array<any> = [...lists.annotations];
    let inde = x.findIndex((item) => item.epubCfi === _cfi);
    if (note.length === 0) {
      delete x[inde]["note"];
    } else {
      x[inde] = {
        ...x[inde],
        note,
      };
    }
    setAnn(x);
    onAnnotations(x);
  };

  return {
    showAnn,
    onBookMarkDelete,
    onBookMark,
    highlightText,
    deleteHighlight,
    onColorChange,
    setAnnotations,
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
    load,
    setLoad,
    setBook,
    toc,
    setTOC,
    page,
    onNote,
    setPage,
    handleCoord,
    y,
    setY,
    x,
    setX,
    url,
    setUrl,
    onSearch,
    handleMeaning,
    setAnn,
    annRef,
    meanings,
    fetchMeanings,
    handleMarked,
    note,
    updateNote,
    marked,
    setMarked,
    setNote,
    sharedData,
    setShared,
    getPosition,
    scroll,
    setScroll,
  };
};

export default useReaderState;
