import React, { useState } from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import MemberChip from "../common/MemberChip";
import DateChip from "../common/DateChip";
import CommentInformation from "../common/CommentInformation";

const StoryComment = ({ comments }) => {
  const onDeleteHandler = (id) => {
    console.log(id);
  };
  return (
    <>
      <Grid item md={12}>
        <Typography variant="h5">Comment</Typography>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={2}>
          {comments?.map((comment, index) => (
            <>
              <Grid item md={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={comment?.member?.profileImageUrl}
                      sx={{ width: 24, height: 24 }}
                    />
                    {comment.member.nickname}
                  </Box>
                  <DateChip date={comment.createdAt} />
                </Box>
              </Grid>
              <Grid ml={2} mt={1} md={12}>
                <CommentInformation
                  comment={comment}
                  onDeleteHandler={onDeleteHandler}
                ></CommentInformation>
              </Grid>
            </>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default StoryComment;
