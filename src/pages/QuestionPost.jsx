import { useEffect, useRef, useState } from "react";
import { api, apiNoToken } from "../network/api";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Editor } from "@toast-ui/react-editor";
import AddIcon from "@mui/icons-material/Add";
import PeriodSelect from "../component/post/PeriodSelect";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CategorySelect from "../component/common/CategorySelect";
import {useNavigate} from "react-router-dom";

const QuestionPost = () => {
  const nav = useNavigate();
  const editorRef = useRef();
  const [category, setCategory] = useState("STRESS");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const goToQuestionPage =() => {
      nav(`/question`);
    }

    const postData = {
      title: form.get("title"),
      content: form.get("content"),
      category: category,
    };

    try {
      const { data } = await apiNoToken(
        `/api/v1/question/article`,
        "POST",
        postData,
      ).then(goToQuestionPage);
    } catch (err) {
      console.log(err);
    }
  };
  const categoryChange = (category) => {
    setCategory(category);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        component="form"
        onSubmit={onSubmitHandler}
      >
        <Grid container sx={{ maxWidth: "800px" }} spacing={2}>
          <Grid item md={3}>
            <CategorySelect onChangeHandler={categoryChange} />
          </Grid>
          <Grid item md={9}>
            <TextField
              margin="normal"
              id="title"
              label="title"
              name="title"
              autoFocus
              fullWidth
              required
            />
          </Grid>
          <Grid item md={12}>
            <TextField
                margin="normal"
                id="content"
                name="content"
                label="content"
                multiline
                rows={8}
                variant="filled"
                autoFocus
                fullWidth
                required
            />
          </Grid>
          <Grid
            item
            md={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Button
              type="submit"
              variant="outlined"
              size="large"
              endIcon={<EditIcon />}
            >
              작성
            </Button>
            <Button variant="outlined" size="large" endIcon={<CloseIcon />}>
              취소
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default QuestionPost;
