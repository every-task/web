import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import MemberChip from "../common/MemberChip";
import DateChip from "../common/DateChip";
import CommentInformation from "../common/CommentInformation";

const StoryComment = ({ comments }) => {
  return (
    <>
      <Grid item md={12}>
        <Typography variant="h5">Comment</Typography>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={1}>
          {comments?.map((comment, index) => (
            <>
              <Grid item md={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <MemberChip member={comment.member} />
                  <DateChip date={comment.createdAt} />
                </Box>
              </Grid>
              <Grid item md={12}>
                <CommentInformation comment={comment}></CommentInformation>
              </Grid>
            </>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default StoryComment;
