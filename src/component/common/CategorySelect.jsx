import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { categorys } from "./Category";

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
      {categorys.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CategorySelect;
