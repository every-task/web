import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia, Chip,
  Container, FormControl,
  Grid,
  IconButton, InputLabel, MenuItem, OutlinedInput,
  Pagination, Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api, apiNoToken } from "../../network/api";
import SearchCondition from "../common/SearchCondition";

import { categorys } from "../common/Category";
import ShowQuestionsCard from "./ShowQuestionsCard";
import SearchIcon from "@mui/icons-material/Search";
import {Link} from "react-router-dom";
import {red} from "@mui/material/colors";

const QuestionCard = () => {
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [nowPage, setNowPage] = useState(0);
  const [totalPage, setTotalPage] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const nav = useNavigate();
  const [searchCondition, setSearchCondition] = useState("latest");
  const [mainCategorys, setMainCategorys] = useState(
      categorys.map((el) => {
        return { isChecked: false, ...el };
      })
  );

  const onCoinHandler = ()=>{
    setNowPage(0)
    setCoin(!coin);
  }
  const onClickHandler = (category,idx) => {
    if (!categoryList.includes(category)) setCategoryList([...categoryList, category]);
    else {
      setCategoryList(categoryList.filter((u) => u !== category));
    }
    setMainCategorys(
        mainCategorys.map((el, index) => {
          if (index === idx) {
            return { ...el, isChecked: !el.isChecked };
          } else {
            return el;
          }
        })
    );
    setNowPage(0)
  };
  useEffect(() => {
    getData();
  }, [categoryList,nowPage,coin]);
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
  const changePage = (page) => {
    const getPageData = page - 1
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
      <Container sx={{ py: 8 }}>
        <Grid
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
            spacing={1}
        >
          <Grid item md={1.5}>
            <SearchCondition onChangeHandler={changeSearchCondition} />
          </Grid>
          <Grid item md={9}>
            <OutlinedInput
                margin="normal"
                name="keyword"
                placeholder="입력"
                fullWidth
                onBlur={onKeywordChangeHandler}
            />
          </Grid>
          <Grid item md={1}>
            <Button
                variant="contained"
                sx={{ height: 55 }}
                onClick={onCoinHandler}
                name='Search'
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid
            container
            spacing={4}
            sx={{ justifyContent: "center", minWidth: 500 }}
            mt={3}
        >
          {mainCategorys.map((category, idx) => (
              <Grid item>
                <IconButton
                    sx={{ flexDirection: "column" }}
                    onClick={() => onClickHandler(category.value,idx)}
                >
                  <img src={category.src} width="70" height="auto" />
                  <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        color: `${category.isChecked ? "primary.main" : "text.main"}`,
                        fontWeight: `${category.isChecked ? "bold" : ""}`,
                      }}
                  >
                    #{category.label}
                  </Typography>
                </IconButton>
              </Grid>
          ))}
        </Grid>

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
              page={nowPage+1}
          />
        </Box>
      </Container>

  );
};
export default QuestionCard;
