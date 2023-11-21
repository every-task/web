import React from "react";
import {MenuItem, TextField, Typography} from "@mui/material";
import { categorise } from "./Category";

const CategorySelect = ({ onChangeHandler }) => {
  return (
    <TextField
      id="outlined-select-currency"
      select
      label="category"
      margin="normal"
      fullWidth
      required
      onChange={(e) => onChangeHandler(e.target.value)}
    >
      {categorise.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Typography variant='category' >
           {option.label}
          </Typography>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CategorySelect;
