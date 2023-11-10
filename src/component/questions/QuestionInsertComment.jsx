import {Avatar, Button, Fab, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import {Editor} from "@toast-ui/react-editor";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import {api} from "../../network/api";
import {useRef, useState} from "react";

const QuestionInsertComment =({id}) =>{
    const editorRef = useRef();
    const [insertCommentStatus, setInsertCommentStatus] = useState(false)
    const [insertComment, setInsertComment] =useState({
        content:""
    });
    const token = localStorage.setItem('token',"eyJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6IuyCrOyekCIsImlkIjoiNTUyMjdjZmMtNmJmNi00ZTdlLTljM2QtYWViMjg3NGE0NTQ2IiwicHJvZmlsZUltYWdlVXJsIjoiaHR0cHM6Ly9jZG4ucGl4YWJheS5jb20vcGhvdG8vMjAyMy8wOS8yMS8xOC8xNy9hdXRvbW9iaWxlLTgyNjczNjlfMTI4MC5qcGciLCJlbWFpbCI6IjMyIiwiZXhwIjoxNjk5NTgzNDA5fQ.jd6OcfMAESHH2im2Bsc24T_9jlwz3O_ljvWWImtAIUo")
    const insertCommentStatusHandler =() => {
        setInsertCommentStatus(!insertCommentStatus);
    }
    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const editorInstance = editorRef.current.getInstance();
        const content = editorInstance.getMarkdown();
        const postData = {
            content: content
        };
        console.log(postData);
        await api(`http://localhost:8082/api/v1/question/comment/${id}`, "POST",postData);
    }
    return (
        <>
            <Grid item md={12}>
                <Box sx={{ '& > :not(style)': { m: 1 },
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center"}}>
                    <Fab variant="outlined" onClick={insertCommentStatusHandler} color="secondary" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </Box>
            </Grid>
            {insertCommentStatus === true &&
                <Grid item md={12} sx={{ maxWidth: "1000px" }} >
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"}}>
                        <Editor
                            previewStyle="vertical"
                            height="200px"
                            initialEditType="wysiwyg"
                            usageStatistics={false}
                            hideModeSwitch={true}
                            ref={editorRef}
                        ></Editor>

                    </Box>
                    <Grid
                        item
                        md={12}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                        spacing={5}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            component="form"
                            onSubmit={onSubmitHandler}
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
                        </Box>

                    </Grid>
                </Grid>
            }


        </>
    )

}



export default QuestionInsertComment;