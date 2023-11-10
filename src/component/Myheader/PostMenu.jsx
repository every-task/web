import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const PostMenu = () => {
  const nav = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const toSuccessHandler = () => {
    setAnchorEl(null);
    nav("/story/post");
  };

  const toQuestionHandler = () => {
    setAnchorEl(null);
    nav("/question/post");
  };

  return (
    <>
      <Button
        id="write-button"
        aria-controls={open ? "write-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        글 작성
      </Button>
      <Menu
        id="write-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "write-button",
        }}
      >
        <MenuItem onClick={toSuccessHandler}> 성공담 </MenuItem>
        <MenuItem onClick={toQuestionHandler}>질문글 </MenuItem>
      </Menu>
    </>
  );
};

export default PostMenu;
