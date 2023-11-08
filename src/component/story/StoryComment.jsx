import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import MemberChip from "../common/MemberChip";
import DateChip from "../common/DateChip";
import CommentInformation from "../common/CommentInformation";

const StoryComment = ({ id }) => {
  const [comments, setComments] = useState([
    {
      content: "와 님 좀 치네요",
      createdAt: "2023-11-08",
      member: {
        nickname: "고양이는야옹",
        imageUrl: "M",
      },
    },
    {
      content: "이런말을 누가 못함 ?",
      createdAt: "2023-11-08",
      member: {
        nickname: "비둘기는구구구구",
        imageUrl: "M",
      },
    },
  ]);
  // TODO : useEffect 작성
  return (
    <>
      <Grid item md={12}>
        <Typography variant="h5">Comment</Typography>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={1}>
          {comments.map((comment, index) => (
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
