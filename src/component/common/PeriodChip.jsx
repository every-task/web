import React from "react";
import { Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const PeriodChip = ({ period }) => {
  return (
    <Chip icon={<AccessTimeIcon />} label={periodLabel[period.toLowerCase()]} />
  );
};

const periodLabel = {
  always: "상시",
  monthly: "월간",
  weekly: "주간",
  daily: "일간",
};

export default PeriodChip;
