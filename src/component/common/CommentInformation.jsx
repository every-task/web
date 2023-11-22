import React from "react";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiNoToken } from "../../network/api";
import { useLocation, useParams } from "react-router-dom";

const CommentInformation = ({ comment, onDeleteHandler }) => {
  const id = useSelector((state) => state.me.id);

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const postId = pathSegments[3];

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
            <IconButton
              aria-label="delete"
              onClick={() => onDeleteHandler(comment.id, postId)}
            >
              <DeleteIcon />
            </IconButton>
          </InputAdornment>
        )
      }
    />
  );
};

export default CommentInformation;
