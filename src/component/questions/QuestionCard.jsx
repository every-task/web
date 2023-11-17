import {
  Avatar, Box, Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid, IconButton, Pagination, TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api, apiNoToken } from "../../network/api";
import SearchCondition from "../common/SearchCondition";
import ShowQuestionsCard from "./ShowQuestionsCard";

const QuestionCard = () => {
  const [data, setData] = useState([]);
  const [urlq, setUrlq] = useState([]);
  const [nowPage, setNowPage] = useState(0);
  const [size, setSize] = useState(9);
  const [totalPage, setTotalPage] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [searchCondition, setSearchCondition] = useState();
  const imgList = [
    "https://cdn-icons-png.flaticon.com/128/1683/1683155.png",
    "https://cdn-icons-png.flaticon.com/128/6350/6350271.png",
    "https://cdn-icons-png.flaticon.com/128/4647/4647153.png",
    "https://cdn-icons-png.flaticon.com/128/2640/2640788.png",
    "https://cdn-icons-png.flaticon.com/128/3302/3302647.png",
    "https://cdn-icons-png.flaticon.com/128/2017/2017334.png",
    "https://cdn-icons-png.flaticon.com/128/3898/3898082.png"
  ];
  const categoryList = [
    {
      value: "HEALTH",
      label: "건강",
    },
    {
      value: "TRAVEL",
      label: "여행",
    },
    {
      value: "ART",
      label: "예술",
    },
    {
      value: "RELATIONSHIP",
      label: "인간관계",
    },
    {
      value: "EMPLOYMENT",
      label: "취업",
    },
    {
      value: "STRESS",
      label: "정신건강",
    },
    {
      value: "LANGUAGE",
      label: "언어",
    },
  ];
  const onClickHandler = (category) => {
    if(!urlq.includes(category))
    setUrlq([...urlq, category]);
    else {
      setUrlq(urlq.filter(u=>u!==category));
    }
  };
  useEffect(() => {
    getData();
  }, [urlq]);
  useEffect(() => {
    getData();
  }, [nowPage]);
  useEffect(()=>{
    getData();
  },[searchCondition]);
  const getData = async () => {
    let link = "";
    if (keyword != null)
      for (let i = 0; i < urlq.length; i++) {
        link += `&category=${urlq[i]}`;
      }
    const getData = await apiNoToken(
      `/api/v1/question/article` + `?page=${nowPage}&size=${size}&orderBy=${searchCondition}` + link,
      "GET"
    );
    console.log(searchCondition);
    setData(getData.data.content);
    setTotalPage(getData.data.totalPages);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    getDataByQuestion();
  };
  const changePage = (page) => {
    const getPageData = page;
    setNowPage(getPageData);
  };

  const changeSearchCondition =(condition) => {
    setSearchCondition(condition);
  }
  const getDataByQuestion = async () => {
    const getData = await apiNoToken(
      `/api/v1/question/article` +
        `?page=${nowPage}&size=${size}&keyword=${keyword}`,
      "GET"
    );
    setData(getData.data.content);
  };
  const onChangeHandler = (e) => {
    const getKeywordData = e.target.value;
    setKeyword(getKeywordData);
  };
  return (
      <form onSubmit={onSubmitHandler}>
        <div className="input-div">
          <div className="input-div-divide">
            <SearchCondition onChangeHandler={changeSearchCondition}/>
          </div>
          <div className="input-div-divide">
            <input
                className="input-keyword"
                type={"text"}
                name={"keyword"}
                placeholder={"입력"}
                onChange={onChangeHandler}
            />
          </div>
          <div className="input-div-divide">
            <input
                className="input-submit"
                type={"submit"}
                name={"검색"}
            />
          </div>
        </div>
        <div className="button-div">
          {categoryList.map((category, idx) => (
              <button className="button-detail"
                      onClick={() => onClickHandler(category.value)}
                      type="button"
              >
                <img src={imgList[idx]}
                     width="100" height="auto"/>
                <Typography gutterBottom variant="h5" component="h2">
                  {category.label}
                </Typography>
              </button>
          ))}
        </div>
        <ShowQuestionsCard data={data} />

        <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
        >
          <Pagination count={totalPage} onChange={(event, page) => changePage(page)} />
        </Box>
      </form>
  );
};
export default QuestionCard;
