import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api, apiNoToken } from "../../network/api";
import SearchCondition from "../common/SearchCondition";

import { categorise } from "../common/Category";
import ShowQuestionsCard from "./ShowQuestionsCard";

const QuestionCard = () => {
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [nowPage, setNowPage] = useState(0);
  const [totalPage, setTotalPage] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const nav = useNavigate();
  const [searchCondition, setSearchCondition] = useState("latest");

  const onClickHandler = (category) => {
    if (!categoryList.includes(category)) setCategoryList([...categoryList, category]);
    else {
      setCategoryList(categoryList.filter((u) => u !== category));
    }
  };
  const checkTheCategoryClicked =(category) => {
    if (!categoryList.includes(category)) {
      return false;
    }
    else {
      return true;
    }
  }
  useEffect(() => {
    getData();
  }, [categoryList,nowPage,searchCondition]);
  const getData = async () => {
    let link = "";
    for (let i = 0; i < categoryList.length; i++) {
      link += `&category=${categoryList[i]}`;
    }
    link += `&orderBy=${searchCondition}`;
    if (keyword != null) {
      link += `&keyword=${keyword}`
    }
    const getData = await apiNoToken(
      `/api/v1/question/article?page=${nowPage}` +
        link,
      "GET"
    );
    setData(getData.data.content);
    setTotalPage(getData.data.totalPages);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    getData();
  };
  const changePage = (page) => {
    const getPageData = page;
    setNowPage(getPageData);
  };

  const changeSearchCondition = (condition) => {
    setSearchCondition(condition);
  };
  const onKeywordChangeHandler = (e) => {
    const getKeywordData = e.target.value;
    setKeyword(getKeywordData);
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div className="input-div">
        <div className="input-div-divide">
          <SearchCondition onChangeHandler={changeSearchCondition} />
        </div>
        <div className="input-div-divide">
          <input
            className="input-keyword"
            type={"text"}
            name={"keyword"}
            placeholder={"입력"}
            onChange={onKeywordChangeHandler}
          />
        </div>
        <div className="input-div-divide">
          <input className="input-submit" type={"submit"} name={"검색"} />
        </div>
      </div>
      <div className="button-div">
        {categorise.map((category, idx) => (
          <button
            className="button-detail"
            onClick={() => onClickHandler(category.value)}
            type="button"
          >
            <img src={category.src} width="100" height="auto" />
            <Typography
                gutterBottom
                variant="h5"
                component="h2"
                sx={{
                  color: `${checkTheCategoryClicked(category)===true ? "primary.main" : "text.main"}`,
                  fontWeight: `${checkTheCategoryClicked(category)===true ? "bold" : ""}`
                }}
            >
              #{category.label}
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
        <Pagination
          count={totalPage}
          onChange={(event, page) => changePage(page)}
        />
      </Box>
    </form>
  );
};
export default QuestionCard;
