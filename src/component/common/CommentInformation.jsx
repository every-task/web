import React from "react";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

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
      endAdornment={
        id === comment?.member.id && (
          <InputAdornment position="end">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </InputAdornment>
        )
      }
    />
  );
};

export default CommentInformation;
