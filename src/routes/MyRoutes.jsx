import { BrowserRouter, Route, Routes } from "react-router-dom";
import Template from "../component/template/Template";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Post from "../pages/Post";
import Story from "../pages/Story";
import Question from "../pages/Question";
import QuestionDetail from "../component/questions/QuestionDetail";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<Signup></Signup>} />
        <Route element={<Template />}>
          <Route path="/" element={<Main />} />
          <Route path="/post" element={<Post />} />
          <Route path="/info" element={<MyInfo />} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/question" element={<Question />}></Route>
          <Route path="/question/:id" element={<QuestionDetail />}></Route>  
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default MyRoutes;
