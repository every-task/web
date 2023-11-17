import {Box, Button, Grid, Typography} from "@mui/material";
import MemberChip from "../common/MemberChip";
import DateChip from "../common/DateChip";
import CommentInformation from "../common/CommentInformation";
import React from "react";
import {useSelector} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

const QuestionComments =({comments}) =>{
    const memberId = useSelector(state=>state.me.id);
    return (
        <>
            <Grid item md={12}>
                <Typography variant="h5">Comment</Typography>
            </Grid>
            <Grid item md={12}>
                <Grid container spacing={1}>
                    {comments.map((comment, index) => (
                        <>
                            <Grid item md={12}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <MemberChip member={comment.member} />
                                    <DateChip date={comment.createdAt} />
                                </Box>
                                {comment.member.id===memberId &&
                                    <Button variant="outlined" size="large" endIcon={<CloseIcon />}>
                                        글 수정
                                    </Button>}
                                {comment.member.id===memberId &&
                                    <Button variant="outlined" size="large" endIcon={<CloseIcon />}>
                                        글 삭제
                                    </Button>}
                            </Grid>
                            <Grid item md={12}>
                                <CommentInformation comment={comment}></CommentInformation>
                            </Grid>
                        </>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};
export default QuestionComments;