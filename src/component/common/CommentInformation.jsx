import React from "react";
import { Input } from "@mui/material";
import { useSelector } from "react-redux";

const CommentInformation = ({ comment }) => {
  const id = useSelector((state) => state.me.id);
  return (
    <Input
      id="filled-basic"
      defaultValue={comment.content}
      variant="standard"
      margin="normal"
      readOnly
      fullWidth
      endAdornment={id === comment?.id && "mine"}
    />
  );
};

export default CommentInformation;
