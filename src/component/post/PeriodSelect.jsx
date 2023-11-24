import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const PeriodSelect = ({ onChange }) => {
  const [period, setPeriod] = useState("always");

  const handleChange = (event) => {
    setPeriod(event.target.value);
    onChange(event);
  };
  return (
    <TextField
      sx={{ mt: 0 }}
      id="outlined-select-currency"
      select
      required
      label="주기"
      margin="normal"
      fullWidth
      name="period"
      onChange={(e) => onChange(e)}
    >
      {categorise.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
const categorise = [
  {
    value: "ALWAYS",
    label: "상시",
  },
  {
    value: "DAILY",
    label: "일간",
  },
  {
    value: "WEEKLY",
    label: "주간",
  },
  {
    value: "MONTHLY",
    label: "월간",
  },
];

export default PeriodSelect;
