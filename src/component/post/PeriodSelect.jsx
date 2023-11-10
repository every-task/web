import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const PeriodSelect = ({ onChange }) => {
  const [period, setPeriod] = useState("always");

  const handleChange = (event) => {
    setPeriod(event.target.value);
    onChange(event);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">주기</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="period"
        name="period"
        value={period}
        label="주기"
        onChange={handleChange}
      >
        <MenuItem value="ALWAYS">상시</MenuItem>
        <MenuItem value="MONTHLY">월간</MenuItem>
        <MenuItem value="WEEKLY">주간</MenuItem>
        <MenuItem value="DAILY">일간</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PeriodSelect;
