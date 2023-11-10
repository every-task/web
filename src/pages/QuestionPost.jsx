import { useEffect, useRef, useState } from "react";
import { api, apiNoToken } from "../network/api";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Editor } from "@toast-ui/react-editor";
import AddIcon from "@mui/icons-material/Add";
import PeriodSelect from "../component/post/PeriodSelect";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CategorySelect from "../component/questions/CategorySelect";

const QuestionPost = () => {
  const editorRef = useRef();
  const [category, setCategory] = useState("STRESS");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();

    const postData = {
      title: form.get("title"),
      content: content,
      category: category,
    };
    console.log(postData);

    try {
      const { data } = await apiNoToken(
        `/api/v1/question/article`,
        "POST",
        postData
      );
    } catch (err) {
      console.log(err);
    }
  };
  const categorySelect = (e) => {
    const getCategory = e.target.value;
    setCategory(getCategory);
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
          <Grid item md={12}>
            <TextField
              margin="normal"
              id="title"
              label="title"
              name="title"
              autoFocus
              fullWidth
            />
          </Grid>
          <Grid item md={2}>
            <CategorySelect onChange={(e) => categorySelect(e)} />
          </Grid>
          <Grid item md={12}>
            <Editor
              previewStyle="vertical"
              height="600px"
              initialEditType="wysiwyg"
              usageStatistics={false}
              hideModeSwitch={true}
              toolbarItems={[
                ["heading", "bold", "italic", "strike"],
                ["hr", "quote"],
                ["ul", "ol", "task"],
                ["image"],
              ]}
              ref={editorRef}
            ></Editor>
          </Grid>
          <Grid
            item
            md={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
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
