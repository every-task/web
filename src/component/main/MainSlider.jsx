import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainFeaturedPost from "./MainFeaturedPost";

const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnFocus: true,
  };

  const mainFeaturedPost_1 = {
    title: "당신의 성공담을 공유해주세요",
    description:
      "불가능한 꿈을 끝내 이룬 이야기." +
      "끊임없는 노력과 열정으로 어려움을 극복하며 성공에 도달한 용기와 인내는 감동적입니다." +
      "힘든 시간에도 흔들리지 않은 의지는 영감을 주며, 성취의 소중함을 상기시킵니다.",
    image:
      "https://cdn.pixabay.com/photo/2016/02/11/14/59/background-1193727_1280.png",
    imageText: "image",
    // linkText: 'Continue reading…',
  };

  return (
    <Slider {...settings}>
      <MainFeaturedPost post={mainFeaturedPost_1} />
      <MainFeaturedPost post={mainFeaturedPost_1} />
    </Slider>
  );
};
export default MainSlider;
