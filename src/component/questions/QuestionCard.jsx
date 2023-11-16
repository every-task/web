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

const QuestionCard = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [urlq, setUrlq] = useState([]);
  const [nowPage, setNowPage] = useState(0);
  const [size, setSize] = useState(9);
  const [totalPage, setTotalPage] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [searchCondition, setSearchCondition] = useState("latest");
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
  const imgList = [
    "https://cdn-icons-png.flaticon.com/128/1683/1683155.png",
    "https://cdn-icons-png.flaticon.com/128/6350/6350271.png",
    "https://cdn-icons-png.flaticon.com/128/4647/4647153.png",
    "https://cdn-icons-png.flaticon.com/128/2640/2640788.png",
    "https://cdn-icons-png.flaticon.com/128/3302/3302647.png",
    "https://cdn-icons-png.flaticon.com/128/2017/2017334.png",
    "https://cdn-icons-png.flaticon.com/128/3898/3898082.png"
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
      `/api/v1/question/article` + `?page=${nowPage}&size=${size}&orderby=${searchCondition}` + link,
      "GET"
    );
    setData(getData.data.content);
    setTotalPage(getData.data.totalPages);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    getDataByQuestion();
  };
  const changePage = (page) => {
    console.log(page);
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
