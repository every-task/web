import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import MemberChip from "../common/MemberChip";
import DateChip from "../common/DateChip";
import CommentInformation from "../common/CommentInformation";
import React from "react";
import {useSelector} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {apiNoToken} from "../../network/api";

const QuestionComments =({comments,questionId,getQuestionDetail}) =>{
    const memberId = useSelector(state=>state.me.id);
    const onDeleteHandler = (id,qId) => {
        apiNoToken(`/api/v1/question/comment/${id}`,"DELETE").then(()=>{
            getQuestionDetail(qId);
        });
    };

    return (
        <>
            <Grid item md={12}>
                <Typography variant="h5">Comment</Typography>
            </Grid>
            <Grid item md={12}>
                <Grid container spacing={2}>
                    {comments?.map((comment, index) => (
                        <>
                            <Grid item md={12}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: 1,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Avatar
                                            src={comment?.member?.profileImageUrl}
                                            sx={{ width: 24, height: 24 }}
                                        />
                                        {comment.member.nickname}
                                    </Box>
                                    <DateChip date={comment.createdAt} />
                                </Box>
                            </Grid>
                            <Grid ml={2} mt={1} md={12}>
                                <CommentInformation
                                    comment={comment}
                                    onDeleteHandler={onDeleteHandler}
                                    id={questionId}
                                ></CommentInformation>
                            </Grid>
                        </>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};
export default QuestionComments;