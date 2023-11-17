import {MenuItem, TextField} from "@mui/material";
import React from "react";

const SearchCondition =({ onChangeHandler }) => {
    const searchCondition = [
        {
            value: "latest",
            label: "최신순",
        },
        {
            value: "manyComments",
            label: "답글 많은 순",
        },
        {
            value: "manyViews",
            label: "조회수",
        }
    ];
    return (
        <TextField
            id="outlined-select-currency"
            select
            label="searchCondition"
            margin="normal"
            fullWidth
            onChange={(e) => onChangeHandler(e.target.value)}
        >
            {searchCondition.map((condition) => (
                <MenuItem key={condition.value} value={condition.value}>
                    {condition.label}
                </MenuItem>
            ))}
        </TextField>
    );
}
export default SearchCondition;