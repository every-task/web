import {Avatar, Button, Fab, FormControl, Grid, Input, InputLabel} from "@mui/material";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import {Editor} from "@toast-ui/react-editor";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import {apiNoToken} from "../../network/api";
import {useRef, useState} from "react";
import {useSelector} from "react-redux";
import CheckIcon from "@mui/icons-material/Check";

const QuestionInsertComment =({id,getQuestionDetail}) =>{
    const { isLogin } = useSelector((state) => state.me);
    const [comment, setComment] = useState();
    const onWriteHandler = async () => {
        try {
            const { data } = await apiNoToken(
                `/api/v1/question/comment/${id}`,
                "POST",
                comment
            ).then(() => [getQuestionDetail(id)]);
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
    )

}



export default QuestionInsertComment;