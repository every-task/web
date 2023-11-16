import React, { useEffect, useState } from "react";
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
import { apiNoToken } from "../../network/api";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const MainCard = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await apiNoToken(`/api/v1/story`, "GET");
    setData(data.content);
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
                  title={el.member?.nickname}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={el.member?.profileImageUrl}
                  alt="Paella dish"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {el.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default MainCard;
