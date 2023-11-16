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
// TODO : 나중에 실제 사용하는 카테고리로 바꿔야 힘
const categorys = [
  {
    value: "HEALTH",
    label: "건강",
  },
  {
    value: "TRAVEL",
    label: "여행",
  },
  {
    value: "ART",
    label: "예술",
  },
  {
    value: "RELATIONSHIP",
    label: "인간관계",
  },
  {
    value: "EMPLOYMENT",
    label: "취업",
  },
  {
    value: "STRESS",
    label: "정신건강",
  },
  {
    value: "LANGUAGE",
    label: "언어",
  },
];

export default CategorySelect;
