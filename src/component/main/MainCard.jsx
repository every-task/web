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
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { apiNoToken } from "../../network/api";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Link } from "react-router-dom";

const MainCard = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await apiNoToken(`/api/v1/story`, "GET");
    setData(data.content);
    console.log(data.content);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container sx={{ py: 8 }}>
      {/* End hero unit */}
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
