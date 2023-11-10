import React, { useEffect, useState } from "react";
import { Chip, Grid, Typography } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";
import DateChip from "../common/DateChip";
import MemberChip from "../common/MemberChip";
import { api } from "../../network/api";

const StoryArticle = ({ article }) => {
  return (
    <>
      <Grid item md={12}>
        <Chip label={article?.category} color="primary" variant="outlined" />
      </Grid>
      <Grid item md={12}>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          {article?.title}
        </Typography>
      </Grid>
      <Grid item md={12}>
        <MemberChip member={article?.member} />
        <DateChip date={article?.createdAt} />
      </Grid>
      <Grid item md={12}>
        <Viewer initialValue={article?.content} />
      </Grid>
    </>
  );
};

export default StoryArticle;
