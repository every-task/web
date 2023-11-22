import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainFeaturedPost from "../main/MainFeaturedPost";
import { apiNoToken } from "../../network/api";
import { async } from "q";
import { useEffect, useState } from "react";
import { useEditor } from "@tiptap/react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { Container } from "@mui/system";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const CommonSlider = ({ props }) => {
  const nav = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const [post, setPost] = useState([]);

  const getData = async (getData) => {
    const { data } = await apiNoToken(getData, "get");
    setPost(data.content);
  };
  useEffect(() => {
    getData(props.getData);
  }, []);

  const onNavHandler = (Info) => {
    nav(Info);
    window.scrollTo(0, 0);
  };

  const onDetailHandler = (Info, id) => {
    nav(`${Info}/${id}`);
  };

  return (
    <Container>
      <Card variant="noOutline">
        <CardHeader
          title={props.title}
          action={
            <Button
              variant="text"
              sx={{ fontWeight: "bold" }}
              size="large"
              endIcon={<ArrowOutwardIcon />}
              onClick={() => onNavHandler(props.info)}
            >
              더보기
            </Button>
          }
        />

        <CardContent>
          {post && (
            <Slider {...settings}>
              {post.map((el, index) => (
                <Grid item key={index} md={4} p={2}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardActionArea
                      onClick={() => onDetailHandler(props.info, el.id)}
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
                      <CardContent sx={{ flexGrow: 1, minHeight: 80 }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          textOverflow="ellipsis"
                          overflow="hidden"
                        >
                          {el.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Slider>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};
export default CommonSlider;

const sampleData = {
  title: "타이틀",
  Info: "/story", // 더보기로 가고싶은 장소
  getData: "/api/v1/story", // 카드 데이터를 만들기 위해 데이터를 받아올 곳
};
