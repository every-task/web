

import "../css/question.css"
import "../css/buttons.css"
import QuestionCard from "../component/questions/QuestionCard";
import MainFeaturedPost from "../component/main/MainFeaturedPost";
import mainFeaturedPost from "../component/main/MainFeaturedPost";

const Question =() =>{
    const mainFeaturedPost_2 = {
        title: "성공을 위한 미래를 고민해봐요",
        description:
            "성공에 관한 질문을 공유하고 놓치지 말아야 할 인사이트를 찾아보세요. " +
            "어떤 목표를 향해 나아가는지, 어떤 습관이 성공에 도움이 될지 질문 해보세요.",
        image:
            "https://cdn.pixabay.com/photo/2023/04/25/09/22/question-mark-7949828_1280.jpg"
    };
    return <div>
        <MainFeaturedPost post={mainFeaturedPost_2} />
        <QuestionCard></QuestionCard>
    </div>
}
export default Question;