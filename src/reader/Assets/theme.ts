export default {
  COLORS: {
    DEFAULT: "#FFFFFF",
    PRIMARY: "#FF9933",
    SECONDARY: "#138808",
    ACTIVE: "#FF9933", //same as primary
    BUTTON_COLOR: "#000080", //wtf
    PLACEHOLDER: "#9FA5AA",
    PRICE_COLOR: "#585757",
    BORDER_COLOR: "#898989",
    BLOCK: "#E7E7E7",
    ICON: "#172B4D",
    HEADER: "#696969",
    BORDER: "#CAD1D7",
    WHITE: "#FFFFFF",
    BLACK: "#000000",
    ERROR: "#FF0000",
    Links: "#0077c0",
    ORANGE: "#F3983E",
    GREEN: "#138808",
    LIGHT_GREY: "#EFECEC",
  },
  ITEM_NAMES: {
    annotations: "ANNOTATIONS",
    highlight: "HIGHLIGHT",
    bookmark: "BOOKMARK",
    underline: "UNDERLINE",
  },
  DropMenuKeys: {
    delete: "DELETE",
    updateann: "ANN",
    updateconfig: "CONFIG",
    handleclose: "CLOSE",
    handleann: "HANDLEANN",
    handlecon: "HANDLECON",
  },
  READER_THEMES: [
    { background: "#fafafa", color: "#121212", label: "Light" },
    { background: "#5a5a5c", color: "#fafafa", label: "Grey" },
    { background: "#bebebe", color: "#121212", label: "Silver" },
    { background: "#f8f1e3", color: "#121212", label: "Classic" },
    { background: "#121212", color: "#bebebe", label: "Dark" },
    { background: "#D3C59E", color: "#121212", label: "Tan" },
  ],

  HIGHLIGHT_COLORS: [
    { color: "#8cff32", label: "green" },
    { color: "#abff32", label: "light" },
    { color: "#d4ff32", label: "yellowish_green" },
    { color: "#e9ff32", label: "light_yellow" },
    { color: "#fdff32", label: "yellow" },
    { color: "#fafafa", label: "grey" },
  ],
};

export const settings = [
  {
    id: "bg",
    text: "Theme",
    title: "Choose theme",
    items: [
      { label: "Light", value: "#fafafa" },
      { label: "Dark", value: "#121212" },
      { label: "Classic", value: "#f8f1e3" },
      { label: "Silver", value: "#bebebe" },
      { label: "Grey", value: "#5a5a5c" },
    ],
  },
  {
    id: "size",
    text: "Font Size",
    title: "Choose font size",
    items: [
      { label: "15", value: "15px" },
      { label: "16", value: "16px" },
      { label: "17", value: "17px" },
      { label: "18", value: "18px" },
      { label: "19", value: "19px" },
      { label: "20", value: "20px" },
      { label: "21", value: "21px" },
      { label: "22", value: "22px" },
      { label: "23", value: "23px" },
      { label: "24", value: "24px" },
    ],
  },
  {
    id: "height",
    text: "Line Height",
    title: "Choose line height",
    items: [
      { label: "1.4", value: 1.4 },
      { label: "1.6", value: 1.6 },
      { label: "1.8", value: 1.8 },
      { label: "2.0", value: 2.0 },
      { label: "2.2", value: 2.2 },
      { label: "2.4", value: 2.4 },
    ],
  },
];

export const default_config = {
  size: 15,
  background: "#f8f1e3",
  brightness: 60,
  flow: "paginated",
  font: "Default",
  color: "#121212",
  selectActive: "text",
};

export const default_ann = {
  type: "EMPTY",
  pageCfi: "",
  location: { offsetX: 0, offsetY: 0 },
  epubCfi: "",
  color: "",
  text: "",
  note: "",
};
