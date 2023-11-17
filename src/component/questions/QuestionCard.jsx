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
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api, apiNoToken } from "../../network/api";
import SearchCondition from "../common/SearchCondition";

import { categorys } from "../common/Category";
import ShowQuestionsCard from "./ShowQuestionsCard";


const QuestionCard = () => {
  const [data, setData] = useState([]);
  const [urlq, setUrlq] = useState([]);
  const [nowPage, setNowPage] = useState(0);
  const [size, setSize] = useState(9);
  const [totalPage, setTotalPage] = useState([]);
  const [keyword, setKeyword] = useState([]);

  const [searchCondition, setSearchCondition] = useState("latest");

  const goToQuestionDetail = (el) => {
    nav(`/question/${el.id}`);
  };
  const goToQuestionPost = () => {
    nav(`/question/post`);
  };

  const [searchCondition, setSearchCondition] = useState();

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
  useEffect(() => {
    getData();
  }, [searchCondition]);
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

  const changeSearchCondition = (condition) => {
    setSearchCondition(condition);
  };
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
      </div>
      <div className="button-div">
        {categorys.map((category, idx) => (
          <button
            className="button-detail"
            onClick={() => onClickHandler(category.value)}
            type="button"
          >
            <img src={category.src} width="100" height="auto" />
            <Typography gutterBottom variant="h5" component="h2">
              {category.label}
            </Typography>
          </button>
        ))}
      </div>
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {data.map((el, index) => (
            <Grid
              item
              key={index}
              onClick={() => {
                goToQuestionDetail(el);
              }}
              md={4}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500] }}
                      aria-label="user"
                    ></Avatar>
                  }
                  title={el.member.nickname}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="https://cdn.pixabay.com/photo/2023/09/21/18/17/automobile-8267369_1280.jpg"
                  alt="Paella dish"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {el.title}
                  </Typography>
                  <Typography overflow="hidden" textOverflow="ellipsis">
                    {el.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
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
