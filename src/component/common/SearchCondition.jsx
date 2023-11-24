import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import React from "react";

const SearchCondition =({ onChangeHandler }) => {
    const searchCondition = [
        {
            value: "latest",
            label: "최신순",
        },
        {
            value: "oldest",
            label: "과거순",
        },
        {
            value: "mostPopular",
            label: "인기순",
        },
        {
            value: "manyComments",
            label: "답글순",
        },
        {
            value: "manyViews",
            label: "조회수",
        }
    ];
    return (
        <FormControl fullWidth>
        <InputLabel id="outlined-select-currency">정렬</InputLabel>
        <Select
            id="outlined-select-currency"
            select
            label="정렬"
            margin="normal"
            fullWidth
            onChange={(e) => onChangeHandler(e.target.value)}
        >
            {searchCondition.map((condition) => (
                <MenuItem key={condition.value} value={condition.value}>
                    {condition.label}
                </MenuItem>
            ))}
        </Select>
        </FormControl>
    );
}
export default SearchCondition;