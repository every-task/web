import React from "react";
import { MenuItem, TextField } from "@mui/material";

const CategorySelect = ({ onChangeHandler }) => {
  return (
    <TextField
      id="outlined-select-currency"
      select
      label="category"
      margin="normal"
      fullWidth
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
// TODO : 나중에 실제 사용하는 카테고리로 바꿔야 힘
const categorys = [
  {
    value: "USD",
    label: "숨쉬기",
  },
  {
    value: "EUR",
    label: "밥먹기",
  },
  {
    value: "BTC",
    label: "잠자기",
  },
];

export default CategorySelect;
