import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainFeaturedPost from "./MainFeaturedPost";

const MainSlider = () => {
  const settings = {
    dots: false,
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
      "불가능한 꿈을 끝내 이룬 이야기. " +
      "끊임없는 노력과 열정으로 어려움을 극복하며 성공에 도달한 용기와 인내는 감동적입니다. " +
      "당신의 성공담을 공유해서" +
      "다른 사람의 인생을 확장해 주세요.",
    image:
      "https://cdn.pixabay.com/photo/2023/02/07/18/56/rocket-7774875_1280.png",
    imageText: "image",
    // linkText: 'Continue reading…',
  };

  const mainFeaturedPost_2 = {
    title: "성공을 위한 미래를 고민해봐요",
    description:
      "성공에 관한 질문을 공유하고 놓치지 말아야 할 인사이트를 찾아보세요. " +
      "어떤 목표를 향해 나아가는지, 어떤 습관이 성공에 도움이 될지 질문 해보세요.",

    image:
      "https://cdn.pixabay.com/photo/2023/04/25/09/22/question-mark-7949828_1280.jpg",
  };

  const mainFeaturedPost_3 = {
    image:
      "https://cdn.pixabay.com/photo/2016/03/06/17/41/business-idea-1240825_1280.jpg",
  };

  return (
    <Slider {...settings}>
      <MainFeaturedPost post={mainFeaturedPost_1} />
      <MainFeaturedPost post={mainFeaturedPost_2} />
      <MainFeaturedPost post={mainFeaturedPost_3} />
    </Slider>
  );
};
export default MainSlider;
