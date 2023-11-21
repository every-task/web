import { Button, FormControl, Grid, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { apiNoToken } from "../../network/api";
import { useSelector } from "react-redux";

const StoryInsertComment = ({ id, getStoryById }) => {
  const { isLogin } = useSelector((state) => state.me);

  const [comment, setComment] = useState();

  const onWriteHandler = async () => {
    try {
      const { data } = await apiNoToken(
        `/api/story/articles/${id}/comment`,
        "POST",
        comment
      ).then(() => [getStoryById(id)]);
    } catch (err) {
      alert(err);
    }
  };

  const onCommentHandler = (e) => {
    const { name, value } = e.target;

    setComment({ [name]: value });
  };

  return (
    <>
      {isLogin && (
        <>
          <Grid item md={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="content">Comment</InputLabel>
              <Input id="content" name="content" onBlur={onCommentHandler} />
            </FormControl>
          </Grid>
          <Grid
            item
            md={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="text"
              sx={{ fontWeight: "bold" }}
              size="large"
              endIcon={<CheckIcon />}
              onClick={onWriteHandler}
            >
              작성
            </Button>
          </Grid>
        </>
      )}
    </>
  );
};

export default StoryInsertComment;
