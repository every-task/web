import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { apiNoToken } from "../../network/api";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Link } from "react-router-dom";
import { categorys } from "../common/Category";

const MainCard = () => {
  const [data, setData] = useState([]);

  const [mainCategory, setMainCategory] = useState(
    categorys.map((el) => {
      return { isChecked: false, ...el };
    })
  );

  const [test1, setTest1] = useState(0);

  const getData = async () => {
    let link = "";

    for (let i = 0; i < mainCategory.length; i++) {
      if (mainCategory[i].isChecked) {
        link += `&category=${mainCategory[i].value}`;
      }
    }
    const { data } = await apiNoToken(`/api/v1/story?` + link, "GET");
    setData(data.content);
  };

  useEffect(() => {
    getData();
  }, [mainCategory]);

  const onSelectHandler = (idx) => {
    setMainCategory(
      mainCategory.map((el, index) => {
        if (index === idx) {
          return { ...el, isChecked: !el.isChecked };
        } else {
          return el;
        }
      })
    );
  };
  return (
    <Container sx={{ py: 8 }}>
      {/* End hero unit */}
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", minWidth: 500 }}
        mb={4}
      >
        {mainCategory.map((category, idx) => (
          <Grid item>
            <IconButton
              sx={{ flexDirection: "column" }}
              onClick={() => onSelectHandler(idx)}
            >
              <img src={category.src} width="100" height="auto" />
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
      <Grid container spacing={4}>
        {data &&
          data.map((el, index) => (
            <Grid item key={index} md={4}>
              <Link to={`/story/${el.id}`}>
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
                </Card>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default MainCard;
