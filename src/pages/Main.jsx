import CommonSlider from "../component/common/CommonSlider";
import MainSlider from "../component/main/MainSlider";

const Main = () => {
  return (
    <div>
      <MainSlider></MainSlider>
      <CommonSlider props={story} />
    </div>
  );
};
export default Main;

const story = {
  title: "성공담",
  moreInfo: "/story", // 더보기로 가고싶은 장소
  getData: "/api/v1/story", // 카드 데이터를 만들기 위해 데이터를 받아올 곳
};
