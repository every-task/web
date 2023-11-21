import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { apiNoToken } from "../../network/api";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Link, useNavigate } from "react-router-dom";
import { categorise } from "../common/Category";
import SearchIcon from "@mui/icons-material/Search";

const MainCard = () => {
  const [data, setData] = useState([]);

  const [mainCategorise, setMainCategorise] = useState(
    categorise.map((el) => {
      return { isChecked: false, ...el };
    })
  );

  const [createAtAsc, setCreateAtAsc] = useState();

  const [coin, setCoin] = useState(true);

  const [detail, setDetail] = useState();


  const [searchCondition, setSearchCondition] = useState({
    createAtAsc: '',
    detail: '',
    coin: '',
  })
  // 시간나면 사용할 예정

  const [nowPage, setNowPage] = useState(0);
  const [totalPage, setTotalPage] = useState();

  const getData = async (e) => {
    let link = "";

    for (let category = 0; category < mainCategorise.length; category++) {
      if (mainCategorise[category].isChecked) {
        link += `&category=${mainCategorise[category].value}`;
      }
    }

    if (detail) {
      link += `&content=${detail}&title=${detail}`;
    }
    if (createAtAsc) {
      link += `&createAtAsc=${createAtAsc}`;
    }

    if (nowPage) {
      link += `&page=${nowPage}`;
    }
    const { data } = await apiNoToken(`/api/v1/story?` + link, "GET");
    setData(data.content);

    setTotalPage(data.totalPages);
  };

  useEffect(() => {
    getData();
  }, [mainCategorise, nowPage, coin]);
  const onSelectHandler = (idx) => {
    setMainCategorise(
      mainCategorise.map((el, index) => {
        if (index === idx) {
          return { ...el, isChecked: !el.isChecked };
        } else {
          return el;
        }
      })
    );
    setNowPage(0);
  };

  const onCreateAtAscHandler = (e) => {
    setCreateAtAsc(e.target.value);
  };

  const onDetailHandler = (e) => {
    setDetail(e.target.value);
  };

  const onSearchHandler = () => {
    if (detail) {
      setNowPage(0);
      setCoin(!coin);
    }
  };

  const changePage = (page) => {
    const getPageData = page - 1;
    setNowPage(getPageData);
  };

  const nav = useNavigate()
  const onClickHandler = (id) => {
    nav(`/story/${id}`)

  }

  return (
    <Container sx={{ py: 8 }}>
      {/* End hero unit */}
      <Grid
        container
        sx={{ justifyContent: "center", alignItems: "center" }}
        spacing={1}
      >
        <Grid item md={1.5}>
          <FormControl fullWidth>
            <InputLabel id="createAtAsc">정렬</InputLabel>
            <Select
              labelId="createAtAsc"
              id="createAtAsc"
              value={createAtAsc}
              label="정렬"
              onChange={onCreateAtAscHandler}
            >
              <MenuItem value="true">최신순</MenuItem>
              <MenuItem value="false">과거순</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={9}>
          <OutlinedInput
            margin="normal"
            id="Search"
            name="Search"
            fullWidth
            onBlur={onDetailHandler}
          />
        </Grid>
        <Grid item md={1}>
          <Button
            variant="contained"
            sx={{ height: 55 }}
            onClick={onSearchHandler}
            id="search"
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
        {mainCategorise.map((category, idx) => (
          <Grid item>
            <IconButton
              sx={{ flexDirection: "column" }}
              onClick={() => onSelectHandler(idx)}
            >
              <img src={category.src} width="70" height="auto" />
              <Typography
                gutterBottom
                variant="category"
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
      <Grid container spacing={4} mt={4}>
        {data &&
          data.map((el, index) => (
            <Grid item key={index} md={4}>

              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea onClick={() => onClickHandler(el.id)}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="user"
                        src={el.member?.profileImageUrl}
                      ></Avatar>
                    }
                    title={el.member?.nickname}
                    action={
                      <Chip
                        label={el?.category}
                        color="primary"
                        variant="outlined"
                      />
                    }
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
                  </CardContent>
                </CardActionArea>
              </Card>

            </Grid>
          ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        mt={3}
      >
        <Pagination
          count={totalPage}
          onChange={(event, page) => changePage(page)}
          page={nowPage + 1}
        />
      </Box>
    </Container>
  );
};

export default MainCard;
