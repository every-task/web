import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import PeriodChip from "./PeriodChip";

const TaskInformation = ({ task }) => {
  return (
    <TextField
      id="filled-basic"
      variant="standard"
      margin="normal"
      defaultValue={task.content}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PeriodChip period={task.period} />
          </InputAdornment>
        ),
        readOnly: true,
      }}
    />
  );
};

export default TaskInformation;
