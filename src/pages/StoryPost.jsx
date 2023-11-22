import "@toast-ui/editor/dist/toastui-editor.css";
import { apiNoToken } from "../network/api";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Editor } from "@toast-ui/react-editor";
import PeriodSelect from "../component/post/PeriodSelect";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import CategorySelect from "../component/common/CategorySelect";
import { useNavigate } from "react-router-dom";
import { getUploadKey, handleImageUpload } from "../firebase/FileUpload";
import { useSelector } from "react-redux";

const StoryPost = () => {
  const editorRef = useRef();

  const loginUser = useSelector((state) => state.me);

  const [tasks, setTasks] = useState([{ period: "", content: "" }]);
  const [category, setCategory] = useState("");
  const categoryChange = (category) => {
    setCategory(category);
  };

  const [thumbnail, setThumbnail] = useState({
    isFirst: true,
    thumbnailImageUrl: "default",
  });

  const addTask = () => {
    setTasks((prev) => [...prev, {}]);
  };

  const taskEdit = (e, index) => {
    setTasks((prev) => {
      const updatedTasks = [...prev];
      updatedTasks[index][e.target.name] = e.target.value;
      return updatedTasks;
    });
  };
  const nav = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();

    const formData = {
      title: form.get("title"),
      content: content,
      category: category,
      tasks: tasks,
      thumbnailImageUrl: thumbnail.thumbnailImageUrl,
    };

    console.log(formData);

    try {
      const { data } = await apiNoToken("/api/v1/story", "post", formData);
      nav("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUploadKey();
  }, []);

  const onUploadImage = async (blob, callback) => {
    const imageUrl = await handleImageUpload(loginUser, blob);

    if (thumbnail.isFirst) {
      setThumbnail({ isFirst: false, thumbnailImageUrl: imageUrl });
    }
    callback(imageUrl, "image");
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
              required
              fullWidth
            />
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
              hooks={{
                addImageBlobHook: onUploadImage,
              }}
            ></Editor>
          </Grid>
          <Grid item md={12}>
            <Button
              color="primary"
              onClick={addTask}
              endIcon={<AddIcon />}
              size="large"
              sx={{ textTransform: "none", fontSize: 24 }}
            >
              Task
            </Button>
          </Grid>
          <Grid item md={12}>
            <Grid container spacing={2}>
              {tasks.map((task, index) => (
                <>
                  <Grid item md={2}>
                    <PeriodSelect onChange={(e) => taskEdit(e, index)} />
                  </Grid>
                  <Grid item md={10}>
                    <TextField
                      id="content"
                      required
                      name="content"
                      label="태스크"
                      variant="outlined"
                      onBlur={(e) => taskEdit(e, index)}
                      fullWidth
                    />
                  </Grid>
                </>
              ))}
            </Grid>
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

export default StoryPost;
