import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api, apiNoToken } from "../../network/api";

const QuestionCard = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [urlq, setUrlq] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPage, setTotalPage] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const categoryList = [
    "HEALTH",
    "TRAVEL",
    "ART",
    "RELATIONSHIP",
    "EMPLOYMENT",
    "STRESS",
    "LANGUAGE",
  ];
  const goToQuestionDetail = (el) => {
    nav(`/question/${el.id}`);
  };
  const goToQuestionPost = () => {
    nav(`/question/post`);
  };
  const onClickHandler = (category) => {
    setUrlq([...urlq, category]);
  };
  useEffect(() => {
    getData();
  }, [urlq]);
  useEffect(() => {
    getData();
  }, [page]);
  const getData = async () => {
    let link = "";
    if (keyword != null)
      for (let i = 0; i < urlq.length; i++) {
        link += `&category=${urlq[i]}`;
      }
    const getData = await apiNoToken(
      `/api/v1/question/article` + `?page=${page}&size=${size}` + link,
      "GET"
    );
    setData(getData.data.content);
    setTotalPage(getData.data.totalPages);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    getDataByQuestion();
  };
  const changePage = (i) => {
    const getPageData = i;
    setPage(getPageData);
  };
  const getDataByQuestion = async () => {
    const getData = await apiNoToken(
      `/api/v1/question/article` +
        `?page=${page}&size=${size}&keyword=${keyword}`,
      "GET"
    );
    setData(getData.data.content);
  };
  const onChangeHandler = (e) => {
    const getKeywordData = e.target.value;
    setKeyword(getKeywordData);
  };
  return (
    <div>
      <div className="button-div">
        {categoryList.map((category, idx) => (
          <button
            onClick={() => onClickHandler(category)}
            className="w-btn-outline w-btn-gray-outline select-buttons-each"
            type="button"
          >
            {category}
          </button>
        ))}
        <form onSubmit={onSubmitHandler}>
          <input
            className="w-btn-outline2 w-btn-gray-outline select-buttons-each"
            type={"text"}
            name={"keyword"}
            onChange={onChangeHandler}
          />
          <input
            className="w-btn-outline2 w-btn-gray-outline select-buttons-each"
            type={"submit"}
            name={"검색"}
          />
        </form>
        <div>
          <button
            onClick={() => {
              goToQuestionPost();
            }}
            className="w-btn-outline w-btn-gray-outline select-buttons-each"
            type="button"
          >
            글 작성하기
          </button>
        </div>
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
        </Grid>
      </Container>
      <div className="button-div">
        {Array(totalPage)
          .fill(0)
          .map((el, i) => (
            <button onClick={() => changePage(i)} key={i}>
              {i + 1}
            </button>
          ))}
      </div>
    </div>
  );
};
export default QuestionCard;
