import React, { useEffect, useState } from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";
import DateChip from "../common/DateChip";
import MemberChip from "../common/MemberChip";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { api } from "../../network/api";
import MentoringChip from "../common/MentoringChip";
import { indigo } from "@mui/material/colors";

const StoryArticle = ({ story }) => {
  return (
    <>
      <Grid item md={12}>
        <Typography
          variant="h2"
          color={indigo[400]}
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          STORY
        </Typography>
      </Grid>
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
          <Box sx={{ display: "flex" }}>
            <MemberChip member={story?.member} />
            <MentoringChip
              memberId={story?.member?.id}
              member={story?.member}
            />
          </Box>
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
