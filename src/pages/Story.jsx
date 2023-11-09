import React from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import StoryArticle from "../component/story/StoryArticle";
import StoryTask from "../component/story/StoryTask";
import StoryComment from "../component/story/StoryComment";

const Story = () => {
  const { id } = useParams();

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
        <StoryArticle id={id} />
        <StoryTask id={id} />
        <StoryComment id={id} />
      </Grid>
    </Box>
  );
};

export default Story;
