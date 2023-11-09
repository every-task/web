import React from "react";
import { Chip } from "@mui/material";

const DateChip = ({ date }) => {
  return <Chip label={date} variant="outlined" />;
};

export default DateChip;
