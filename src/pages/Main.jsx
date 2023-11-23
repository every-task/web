import CommonSlider from "../component/common/CommonSlider";
import MainSlider from "../component/main/MainSlider";

const Main = () => {
  return (
    <div>
      <MainSlider></MainSlider>
      <CommonSlider props={story} />
      <CommonSlider props={question} />
    </div>
  );
};
export default Main;

const story = {
  title: "BEST Story",
  info: "/story", // 더보기로 가고싶은 장소
  getData: "/api/v1/story/popular", // 카드 데이터를 만들기 위해 데이터를 받아올 곳
};
const question = {
  title: "BEST Question",
  info: "/question", // 더보기로 가고싶은 장소
  getData: "/api/v1/question/article/popular", // 카드 데이터를 만들기 위해 데이터를 받아올 곳
};
