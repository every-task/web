import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiNoToken } from "../../network/api";
import { setLogout } from "../../feature/meSlice";
import { useDispatch } from "react-redux";

const InfoMenu = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const toInfoHandler = () => {
    setAnchorEl(null);
    nav("/info");
  };
  const toQuestionHandler = () => {
    setAnchorEl(null);
    nav("/question");
  };

  const toLogoutHandler = async () => {
    axios.defaults.headers.common["Authorization"] = "";
    const { data } = await apiNoToken("api/v1/auth/token/logout", "POST");
    dispatch(setLogout());

    window.location.assign("/login");
  };

  return (
    <>
      <Button
        id="info-button"
        aria-controls={open ? "info-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://png.pngtree.com/png-vector/20190926/ourlarge/pngtree-man-icon-isolated-on-abstract-background-png-image_1742606.jpg"
        />
      </Button>
      <Menu
        id="info-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "info-button",
        }}
      >
        <MenuItem onClick={toInfoHandler}> 설정 </MenuItem>
        <MenuItem onClick={toQuestionHandler}>내 멘토 </MenuItem>
        <MenuItem onClick={toQuestionHandler}>내 멘티 </MenuItem>
        <MenuItem onClick={toLogoutHandler}>로그아웃 </MenuItem>
      </Menu>
    </>
  );
};

export default InfoMenu;
