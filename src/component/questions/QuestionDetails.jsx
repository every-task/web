import { useParams } from "react-router-dom";
import { Avatar, Box, Grid } from "@mui/material";
import StoryArticle from "../story/StoryArticle";
import StoryTask from "../story/StoryTask";
import StoryComment from "../story/StoryComment";
import React, { useEffect, useRef, useState } from "react";
import QuestionComments from "./QuestionComments";
import QuestionArticle from "./QuestionArticle";
import { useNavigate } from "react-router";
import { apiNoToken } from "../../network/api";
import QuestionInsertComment from "./QuestionInsertComment";
import QuestionTasks from "./QuestionTasks";

const QuestionDetails = () => {
  const { id } = useParams();
  const editorRef = useRef();
  const nav = useNavigate();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState({});
  const [memberData, setMemberData] = useState({});
  const [commentsStatus, setCommentsStatus] = useState(false);
  const [insertCommentStatus, setInsertCommentStatus] = useState(false);
  const [insertComment, setInsertComment] = useState({
    content: "",
  });
  const getQuestionDetail = async () => {
    const getData = await apiNoToken(`/api/v1/question/article/${id}`, "GET");
    setArticle(getData.data);
    setMemberData(getData.data.member);
    if (getData.data.comments != null) {
      setComments(getData.data.comments);
      setCommentsStatus(true);
    }
  };
  useEffect(() => {
    getQuestionDetail();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      mt={8}
    >
      {article && (
        <Grid container sx={{ maxWidth: "800px" }} spacing={2}>
          <QuestionArticle article={article} member={memberData} />
          {commentsStatus === true && <QuestionComments comments={comments} />}
          <QuestionTasks id={id} />
          <QuestionInsertComment id={id} />
        </Grid>
      )}
    </Box>
  );
};
export default QuestionDetails;
