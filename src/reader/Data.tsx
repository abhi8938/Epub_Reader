import { useState } from "react";

export const Data = () => {
  const sampleSearch = [
    {
      text:
        "Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum.",
      pageno: "10",
    },
    {
      text:
        "Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum.",
      pageno: "15",
    },
    {
      text:
        "Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum.",
      pageno: "20",
    },
    {
      text:
        "Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum.",
      pageno: "22",
    },
  ];

  const sampleAnnotation = [
    {
      type: "Bookmark",
      text:
        "Que 1. Briefly discuss the trend of GDP growth since the reforms of 1991?",
      page: "10",
    },
    {
      type: "Bookmark",
      text:
        "Que 1. Briefly discuss the trend of GDP growth since the reforms of 1991?",
      page: "20",
    },
    {
      type: "Bookmark",
      text:
        "Que 1. Briefly discuss the trend of GDP growth since the reforms of 1991?",
      page: "15",
    },
    {
      type: "Notes",
      text:
        "Lorem Ipsum Lorem Ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum",
      page: "15",
      color: "#FEB701",
    },
    {
      type: "Notes",
      text:
        "Lorem Ipsum Lorem Ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum",
      page: "15",
      color: "#01D0FE",
    },
  ];
  const [annotations, setAnnotations] = useState(sampleAnnotation);
  const [searchData, setSearchData] = useState(sampleSearch);
  const [toc, setTOC] = useState([]);

  return {
    annotations,
    setAnnotations,
    searchData,
    setSearchData,
    toc,
    setTOC,
  };
};
