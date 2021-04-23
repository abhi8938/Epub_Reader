//@ts-nocheck
import axios from "axios";
import theme from "./Assets/theme";
export type ann_data = {
  type: string; //'HIGHLIGHT' | 'BOOKMARK' | 'UNDERLINE' | 'EMPTY'
  pageCfi: string;
  location?: { offsetX: number; offsetY: number };
  epubCfi?: string;
  color?: string;
  text?: string;
  note?: string;
};

export type search_result = {
  epubcfi: string;
};

export type annotations = Array<ann_data>;

export type config = {
  size: number;
  background: string;
  brightness: number;
  flow: string;
  font: string;
  color: string;
  selectActive: string;
};

export default class Services {
  onAnnotations = (data: ann_data, ann: annotations, rendition: any) => {
    //TODO: handle all annotations requests - perform on current state - persist data

    // *check if already present in ann
    const exists = this.existsAnn(ann, data);

    //* START - implement annotations on book
    if (data.type === theme.ITEM_NAMES.highlight) {
      if (exists > -1) {
        rendition.unhighlight(ann[exists].epubCfi);
      }
      rendition.highlight(
        data.epubCfi,
        {},
        (e: any) => {
          console.log("highlight_error", e);
        },
        undefined,
        { fill: data.color ? data.color : "#cccccc" }
      );
    } else if (data.type === theme.ITEM_NAMES.underline) {
      if (exists > -1) {
        rendition.ununderline(ann[exists].epubCfi);
      }
      rendition.underline(
        data.epubCfi,
        {},
        (e: any) => {
          console.log("underline_error", e);
        },
        undefined,
        { fill: data.color ? data.color : "#000000" }
      );
    }
    //* END - implement annotations on book

    //* START - Create Final Data to push
    let fd: any = {};
    fd.type = data.type;
    fd.epubCfi = data.epubCfi;
    if (data.color) {
      fd.color = data.color;
    }
    if (data.note) {
      fd.note = data.note;
    }
    if (data.text) {
      fd.text = data.text;
    }
    const new_ann = exists
      ? this.updateAnn(ann, data, exists)
      : this.addAnn(ann, fd);
    return new_ann;
  }; // Asynchronous

  onDelete = (data: ann_data, ann: annotations, rendition: any) => {
    //TODO: handle all delete request - perform on current state - persist data

    const exists = this.existsAnn(ann, data);

    //* START - implement annotations on book
    if (exists !== -1) {
      if (data.type === theme.ITEM_NAMES.highlight) {
        rendition.unhighlight(data.epubCfi);
      } else if (data.type === theme.ITEM_NAMES.underline) {
        rendition.ununderline(data.epubCfi);
      }
    } else {
      return;
    }
    //* END - implement annotations on book

    const new_ann = this.deleteAnn(ann, data, exists);

    return new_ann;
  }; // synchronous

  populateBook = (ann: annotations, rendition: any) => {
    //TODO: Populate annotations in the book using rendition
    //*handle notes
    ann.map((item, index) => {
      if (item.type === theme.ITEM_NAMES.highlight) {
        rendition.highlight(
          `${item.epubCfi}`,
          {},
          (e: any) => {
            console.log("highlight_error", e);
          },
          undefined,
          { fill: item.color ? item.color : "#cccccc" }
        );
      } else if (item.type === theme.ITEM_NAMES.underline) {
        rendition.underline(
          `${item.epubCfi}`,
          {},
          (e: any) => {
            console.log("highlight_error", e);
          },
          undefined,
          { fill: item.color ? item.color : "#000000" }
        );
      }
      return true;
    });
  }; // asynchronous

  onSearch = (query: string, webview: any) => {
    //TODO: Execute search for query in book
    return webview.current?.injectJavaScript(
      ` (function() {
             Promise.all(
               window.book.spine.spineItems.map((item) => {
                 return item
                   .load(window.book.load.bind(window.book))
                   .then(() => {
                     let results = item.find(${query}.trim());
                     item.unload();
                     return Promise.resolve(results);
                   });
               })
             ).then((results) =>
               window.ReactNativeWebView.postMessage(
                 JSON.stringify({
                   type: 'search',
                   results: [].concat.apply([], results),
                 })
               )).catch(err => 
                  window.ReactNativeWebView.postMessage(
                 JSON.stringify({
                   type: 'search',
                   results: [].concat.apply([], results),
                   error:err
                 })));
               })();
               true;
               `
    );
    //* RETRY IF FAIL
  }; // asynchronous

  updateConfig = (
    data: config,
    webview: any,
    rendition: any,
    currentLocation: string
  ) => {
    //TODO: update config in rendition.theme with new theme config
    // console.log('rendi', rendition);
    // rendition.themes.register({theme: themeToStyles(data)});
    // rendition.themes.select('theme');
    // this.refresh(webview, currentLocation);
  }; // synchronous || asynchronous

  handleMessages = (event: any, handleResults: (results: any) => void) => {
    //TODO: handle all types of messages
    let parsedData = JSON.parse(event.nativeEvent.data);
    let { type } = parsedData;
    delete parsedData.type;
    switch (type) {
      case "search":
        return handleResults(parsedData.results);
      default:
        return;
    }
  }; // synchronous

  getContents = (book: any) => {
    //TODO : get all contents from book to render in contents section
    let content: any = [];
    book.spine.spineItems.map((item: any) => {
      return content.push(item.href);
    });
    return content;
  }; // synchronous

  updateAnnotations = async (ann: any[]) => {
    //TODO: send post request to backend with updated annotations
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMzY1MTAxMTI2ZjQ5Yjc2ZDA1MTYiLCJpYXQiOjE2MTkwMTUyNTB9.vYqi7PqvcU1Afwm3ysJwqt9Wq-bRfqrfM6pFQ9a7a1E",
    };
    return axios
      .put(
        // eslint-disable-next-line
        "http://digitalluxe.ca" + "/api/annotations/60800b6567c71717356ec777",
        { ann },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }; // asynchronous

  getAnn = () => {
    //TODO: send post request to backend with updated annotations
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMzY1MTAxMTI2ZjQ5Yjc2ZDA1MTYiLCJpYXQiOjE2MTkwMTUyNTB9.vYqi7PqvcU1Afwm3ysJwqt9Wq-bRfqrfM6pFQ9a7a1E",
    };
    return axios
      .get(
        // eslint-disable-next-line
        "http://digitalluxe.ca" + "/api/annotations/607f2a28978c04198bc62ed9",
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }; // asynchronous

  fetchAnnotations = async () => {
    //TODO: send get request to backend and set result in asyncstorage
    const token = sessionStorage.getItem("TOKEN");
    const headers = {
      "Content-Type": "application/json",
      "auth-token": token,
    };
    return axios
      .post(URL + "/getAnnotations", { headers })
      .then((response) => response)
      .catch((error) => error);
  }; // asynchronous

  addAnn = (ann: annotations, data: ann_data) => {
    //TODO: Update array of objects recieved from param - udpate recieved array - update annotations in asyncstorage - return array
    let new_ann = ann;
    new_ann.push(data);
    return new_ann;
  }; // synchronous

  updateAnn = (ann: annotations, data: ann_data, index: number) => {
    //TODO: Update array of objects recieved from param - udpate recieved array - update annotations in asyncstorage - return array
    let new_ann = ann;
    new_ann.splice(index, 1, data);
    return new_ann;
  }; // synchronous

  deleteAnn = (ann: annotations, data: ann_data, index: number) => {
    //TODO: Delete array of objects recieved from param - delete from recieved array - update annotations in asyncstorage - return array
    let new_ann = ann;
    new_ann.splice(index, 1);
    return new_ann;
  }; // synchronous

  // existsAnn = (ann: annotations, data: ann_data | string) => {
  //   //TODO: check if exists in ann by comparing epubcfi - if yes return index or return false
  //   let new_ann = ann;
  //   const result = new_ann.findIndex((item, index) => {
  //     return item === data;
  //   });
  //   return -1;
  // }; // synchronous

  goPrev(webview: any) {
    webview.current?.injectJavaScript(`window.rendition.prev()`);
  }

  goNext = (webview: any) => {
    webview.current?.injectJavaScript(`window.rendition.next()`);
  };

  goToLocation = (href: string, webview: any) => {
    webview.current?.injectJavaScript(`window.rendition.display('${href}')`);
  };

  refresh = (webview: any, currentLocation: string) => {
    webview.current?.injectJavaScript(
      `window.BOOK_LOCATION = "${currentLocation}"`
    );
    webview.current?.reload();
  };
}
