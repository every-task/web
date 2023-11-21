import React from "react";
import { Input } from "@mui/material";

const CommentInformation = ({ comment }) => {
  return (
    <Input
      id="filled-basic"
      defaultValue={comment.content}
      variant="standard"
      margin="normal"
      readOnly
      fullWidth
    />
  );
};

export default CommentInformation;
