import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {api, apiNoToken} from "../../network/api";
import "../../css/questionDetail.css"
import {Avatar, Button, Fab, Grid, TextField} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {Editor} from "@toast-ui/react-editor";

const QuestionDetail =() =>{
    const editorRef = useRef();
    const nav = useNavigate();
    const [detail, setDetail] = useState({});
    const [comments, setComments] = useState({});
    const [memberData, setMemberData] = useState({});
    const [commentsStatus, setCommentsStatus] =useState(false);
    const [insertCommentStatus, setInsertCommentStatus] = useState(false)
    const [insertComment, setInsertComment] =useState({
        content:""
    });
    const id = useParams();
    const detailId = Object.values(id);
    const token = localStorage.setItem('token',"eyJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6IuyCrOyekCIsImlkIjoiNTUyMjdjZmMtNmJmNi00ZTdlLTljM2QtYWViMjg3NGE0NTQ2IiwicHJvZmlsZUltYWdlVXJsIjoiaHR0cHM6Ly9jZG4ucGl4YWJheS5jb20vcGhvdG8vMjAyMy8wOS8yMS8xOC8xNy9hdXRvbW9iaWxlLTgyNjczNjlfMTI4MC5qcGciLCJlbWFpbCI6IjMyIiwiZXhwIjoxNjk5NTgzNDA5fQ.jd6OcfMAESHH2im2Bsc24T_9jlwz3O_ljvWWImtAIUo")

    const getQuestionDetail = async () => {

        const getData = await apiNoToken(`http://localhost:8082/api/v1/question/article/${detailId}`, "GET")
        setDetail(getData.data);
        setMemberData(getData.data.member);
        if (getData.data.comments!=null){
            setComments(getData.data.comments);
            setCommentsStatus(true);
        }
        console.log(getData.data);
    }
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
        await api(`http://localhost:8082/api/v1/question/comment/${detailId}`, "POST",postData);
    }
    // const onChangeHandler = (e)=> {
    //     const {name, value} =e.target
    //     setInsertComment({...insertComment, [name]: value})
    // }


    useEffect(() => {
        getQuestionDetail();
    }, []);
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
                <Grid container sx={{ maxWidth: "1000px" }} spacing={2}>
                    <Grid item md={12}>
                        <div className="place-center">
                            <div className="description_title">Q : {detail.title}</div>
                        </div>
                        <div className="description">{detail.content}</div>
                    </Grid>
                    <Grid item md={12}>
                        <Box sx={{ '& > :not(style)': { m: 1 },
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "center"}}>
                            <Avatar alt="Remy Sharp" src={memberData.profileImageUrl} />
                            <p>{memberData.nickname}</p>
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
                    }
                    {commentsStatus === true &&
                        <Grid container sx={{ maxWidth: "1000px" }} spacing={2}>
                            {comments.map((comments, idx) =>
                                <div key={idx}>
                                    <Grid item md={12}>
                                        <Box sx={{ '& > :not(style)': { m: 1 },
                                            display: "flex",
                                            justifyContent: "right",
                                            alignItems: "center"}}>
                                            <div className="description">{comments.content}</div>
                                            <Avatar alt="Remy Sharp" src={comments.member.profileImageUrl} />
                                            <div className="description">{comments.member.nickname}</div>
                                        </Box>
                                    </Grid>

                                </div>
                                                    )}
                        </Grid>
                    }
                </Grid>
            </Box>
        </>
    );
}
export default QuestionDetail;