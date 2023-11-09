import "@toast-ui/editor/dist/toastui-editor.css";
import { api } from "../network/api";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Editor } from "@toast-ui/react-editor";
import PeriodSelect from "../component/post/PeriodSelect";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import CategorySelect from "../component/common/CategorySelect";

const StoryPost = () => {
  const editorRef = useRef();

  const [key, setKey] = useState("");
  const [tasks, setTasks] = useState([{ period: "", content: "" }]);
  const [category, setCategory] = useState("");
  const categoryChange = (category) => {
    setCategory(category);
  };
  const getUploadKey = async () => {
    const keys = await api("api/v1/firebase", "GET");
    setKey(keys);

    // 이 밑은 파일 버튼을 눌렀을때 하면 됨.
    // const auth = getAuth();

    // signInWithCustomToken(auth, keys)
    //     .then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         // 추가적으로 할게 없음. 어짜피 기존에 로그인 되어있던 유저의 uuid를 활용하여 키를 발급받아온 것임.

    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // ...
    //     });
  };

  useEffect(() => {
    // getUploadKey();
  }, []);

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
    };

    try {
      const { data } = await api("/api/v1/story", "post", formData);
    } catch (err) {
      console.log(err);
    }
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
            <Grid container spacing={1}>
              {tasks.map((task, index) => (
                <>
                  <Grid item md={2}>
                    <PeriodSelect onChange={(e) => taskEdit(e, index)} />
                  </Grid>
                  <Grid item md={10}>
                    <TextField
                      id="content"
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
