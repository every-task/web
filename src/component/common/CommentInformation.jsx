import React from "react";
import { OutlinedInput, TextField } from "@mui/material";

const CommentInformation = ({ comment }) => {
  return (
    <OutlinedInput
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
