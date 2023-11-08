import React from "react";
import { TextField } from "@mui/material";

const CommentInformation = ({ comment }) => {
  return (
    <TextField
      id="filled-basic"
      defaultValue={comment.content}
      variant="standard"
      margin="normal"
      InputProps={{
        readOnly: true,
      }}
      fullWidth
    />
  );
};

export default CommentInformation;
