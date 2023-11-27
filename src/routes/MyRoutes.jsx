import { BrowserRouter, Route, Routes } from "react-router-dom";
import Template from "../component/template/Template";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import StoryPost from "../pages/StoryPost";
import StoryDetails from "../pages/StoryDetails";
import Question from "../pages/Question";
import MyInfo from "../pages/MyInfo";
import QuestionPost from "../pages/QuestionPost";

import MessageInbox from "../pages/MessageInbox";
import MessageSentbox from "../pages/MessageSentbox";
import QuestionDetails from "../pages/QuestionDetails";
import Story from "../pages/Story";
import Mentoring from "../pages/Mentoring";


const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<Signup></Signup>} />
        <Route element={<Template />}>
          <Route path="/" element={<Main />} />

          <Route path="/info" element={<MyInfo />} />
          <Route path="/story" element={<Story />} />
          <Route path="/story/:id" element={<StoryDetails />} />
          <Route path="/story/post" element={<StoryPost />} />
          <Route path="/question" element={<Question />}></Route>
          <Route path="/question/:id" element={<QuestionDetails />}></Route>
          <Route path="/question/post" element={<QuestionPost />}></Route>
          <Route path="/mentoring" element={<Mentoring />}></Route>
          <Route path="/mentoring/messageinbox" element={<MessageInbox />}></Route>
          <Route path="/mentoring/messagesentbox" element={<MessageSentbox />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default MyRoutes;
