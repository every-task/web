import React from "react";
import { Avatar, Chip } from "@mui/material";

const MemberChip = ({ member }) => {
  return (
    <Chip
      avatar={<Avatar>{member.profileImageUrl}</Avatar>}
      label={member.nickname}
      variant="outlined"
    />
  );
};

export default MemberChip;
