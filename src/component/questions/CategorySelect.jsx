import React, {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const CategorySelect = ({ onChange }) => {
    const [category, setCategory] = useState("STRESS");

    const handleChange = (event) => {
        setCategory(event.target.value);
        onChange(event);
    };
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="category"
                name="category"
                value={category}
                label="카테고리"
                onChange={handleChange}
            >
                <MenuItem value="STRESS">STRESS</MenuItem>
                <MenuItem value="HEALTH">HEALTH</MenuItem>
                <MenuItem value="TRAVEL">TRAVEL</MenuItem>
                <MenuItem value="RELATIONSHIP">RELATIONSHIP</MenuItem>
                <MenuItem value="EMPLOYMENT">EMPLOYMENT</MenuItem>
                <MenuItem value="LANGUAGE">LANGUAGE</MenuItem>
            </Select>
        </FormControl>
    );
};

export default CategorySelect;