import MainFeaturedPost from "../component/main/MainFeaturedPost";
import StoryCard from "../component/story/StoryCard";

const Story = () => {
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
  return (
    <div>
      <MainFeaturedPost post={mainFeaturedPost_1} />
      <StoryCard />
    </div>
  );
};

export default Story;
