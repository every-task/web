import React, {useEffect, useState} from "react";
import {api} from "../../network/api";
import {Chip, Grid, Typography} from "@mui/material";
import MemberChip from "../common/MemberChip";
import DateChip from "../common/DateChip";
import {Viewer} from "@toast-ui/react-editor";

const QuestionArticle =({article}) => {
    return (
        <>
            <Grid item md={12}>
                <Chip label={article.category} color="primary" variant="outlined" />
            </Grid>
            <Grid item md={12}>
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                    {article.title}
                </Typography>
            </Grid>
            <Grid item md={12}>
                {/*<MemberChip member={article.member} />*/}
                <DateChip date={article.createdAt} />
            </Grid>
            <Grid item md={12}>
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                    {article.content}
                </Typography>
                {/*<Viewer*/}
                {/*    {article.content}*/}
                {/*/>*/}
            </Grid>
        </>
    );

}
export default QuestionArticle;
