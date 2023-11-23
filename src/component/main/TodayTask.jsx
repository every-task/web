import { Chip, Container } from "@mui/material";
import Slider from "react-slick";
import PeriodChip from "../common/PeriodChip";
import { useEffect, useState } from "react";
import { apiNoToken } from "../../network/api";

const TodayTask = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 8000,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
  };

  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await apiNoToken("/api/v1/task/random", "GET");
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container>
        <Slider {...settings}>
          {data &&
            data.map((el, index) => (
              <Chip
                icon={<PeriodChip period={el.period} />}
                label={el.content}
                size="medium"
                key={index}
              ></Chip>
            ))}
        </Slider>
      </Container>
    </>
  );
};
export default TodayTask;
