import React, { useEffect, useState } from "react";
import { Chip, Grid, Typography } from "@mui/material";
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
        <MemberChip member={story?.member} />
        <DateChip date={story?.createdAt} />
      </Grid>
      <Grid item md={12}>
        {story?.content && <Viewer initialValue={story?.content} />}
      </Grid>
    </>
  );
};

export default StoryArticle;
