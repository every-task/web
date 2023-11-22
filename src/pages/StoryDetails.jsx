import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import StoryArticle from "../component/story/StoryArticle";
import StoryTask from "../component/story/StoryTask";
import StoryComment from "../component/story/StoryComment";
import { api, apiNoToken } from "../network/api";
import StoryInsertComment from "../component/story/StoryInsertComment";

const StoryDetails = () => {
  const { id } = useParams();

  const [story, setStory] = useState({});

  const getStoryById = async (getId) => {
    try {
      const { data } = await apiNoToken(`/api/v1/story/${getId}`, "GET", {});
      setStory(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStoryById(id);
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
        <StoryArticle story={story} />
        <StoryTask id={id} />
        <StoryComment
          comments={story?.comments}
          id={id}
          getStoryById={getStoryById}
        />
        <StoryInsertComment id={id} getStoryById={getStoryById} />
      </Grid>
    </Box>
  );
};

export default StoryDetails;
