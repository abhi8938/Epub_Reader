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
const BASE_URL = "https://digitalluxe.ca/api";
export default class Services {
  updateAnnotations = async (ann: any[], token, annotation: string) => {
    //TODO: send post request to backend with updated annotations
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };
    return axios
      .put(
        // eslint-disable-next-line
        `${BASE_URL}/annotations/${annotation}`,
        { ann },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }; // asynchronous

  getAnn = (token: string, paper: string) => {
    //TODO: send post request to backend with updated annotations
    // alert(`paper - ${BASE_URL}/annotations/${paper}`);
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };
    return axios
      .get(
        // eslint-disable-next-line
        `${BASE_URL}/annotations/${paper}`,
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }; // asynchronous
}
