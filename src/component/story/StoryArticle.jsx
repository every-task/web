import React, { useEffect, useState } from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";
import DateChip from "../common/DateChip";
import MemberChip from "../common/MemberChip";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { api } from "../../network/api";

const StoryArticle = ({ story }) => {
  return (
    <>
      <Grid item md={12}>
        <Chip label={story?.category} color="primary" variant="outlined" />
      </Grid>
      <Grid item md={12}>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          {story?.title}
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MemberChip member={story?.member} />
          <DateChip date={story?.createdAt} />
        </Box>
      </Grid>
      <Grid item md={12}>
        {story?.content && <Viewer initialValue={story?.content} />}
      </Grid>
    </>
  );
};

export default StoryArticle;
