import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import StoryArticle from "../component/story/StoryArticle";
import StoryTask from "../component/story/StoryTask";
import StoryComment from "../component/story/StoryComment";
import { api } from "../network/api";

const Story = () => {
  const { id } = useParams();

  const [story, setStory] = useState({
    article: {
      category: "",
      title: "",
      content: "",
      createdAt: "",
    },
    member: {
      id: "",
      nickname: "",
      imageUrl: "",
    },
    comments: [],
  });

  const getStoryById = async () => {
    try {
      const { data } = await api(`/api/v1/story/${id}`, "GET", {});
      setStory(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStoryById();
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
      <Grid container sx={{ maxWidth: "800px" }} spacing={2}>
        <StoryArticle article={story.article} />
        <StoryTask id={id} />
        <StoryComment comments={story.comments} />
      </Grid>
    </Box>
  );
};

export default Story;
