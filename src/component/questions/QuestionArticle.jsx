import React, {useEffect, useState} from "react";
import {api} from "../../network/api";
import {Box, Chip, Grid, Typography} from "@mui/material";
import MemberChip from "../common/MemberChip";
import DateChip from "../common/DateChip";
import ViewChip from "../common/ViewChip";


const QuestionArticle =({article}) => {
    return (
        <>
            <Grid item md={12}>
                <Chip label={article.category} color="primary" variant="outlined" />
            </Grid>
            <Grid item md={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        {article.title}
                    </Typography>
                    <ViewChip view={article.view}/>
                </Box>
            </Grid>
            <Grid item md={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <MemberChip member={article?.member} />
                    <DateChip date={article?.createdAt} />
                </Box>
            </Grid>
            <Grid item md={12}>
                <Typography variant="h5" sx={{ flexGrow: 1}}>
                    {article.content}
                </Typography>
            </Grid>
        </>
    );

}
export default QuestionArticle;
