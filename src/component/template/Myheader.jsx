import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  MenuItem,
  Menu,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { apiNoToken } from "../../network/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setLogin, setMe } from "../../feature/meSlice";
import InfoMenu from "../Myheader/InfoMenu";
import PostMenu from "../Myheader/PostMenu";

export const Myheader = () => {
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.me.isLogin);

  const welcome = async () => {
    const { data } = await apiNoToken("/api/v1/auth/token/welcome", "POST");

    if (data.token) {
      dispatch(setLogin(data));
      onLoginSuccess(data);
      getData();
    }
  };

  const getData = async () => {
    const { data } = await apiNoToken("/api/v1/auth/member/me/info", "GET");

    dispatch(setMe(data));
  };

  useEffect(() => {
    welcome();
  }, []);

  return (
    <AppBar position="static" color="common">
      <Toolbar>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
          color="primary"
        >
          <Link to="/" color="primary">
            {" "}
            .Task
          </Link>
          <Button color="text" size="medium" sx={{ ml: 10 }}>
            <Link to="/question">STORY</Link>
          </Button>
          <Button color="text" size="medium" sx={{ ml: 10 }}>
            <Link to="/question">QUESTION</Link>
          </Button>
        </Typography>

        {isLogin ? (
          <>
            <PostMenu />
            <InfoMenu />
          </>
        ) : (
          <>
            <Button color="text" size="large">
              <Link to="/login">Login</Link>
            </Button>

            <Button color="primary" size="large">
              <Link to="/signup">signup</Link>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export const onLoginSuccess = (data) => {
  const expireTime = 1000 * 60 * 10; // 10분

  const accessToken = data.token;

  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  const id = setTimeout(onSilentRefresh, expireTime - 60000);
};

export const onSilentRefresh = async () => {
  const { data } = await apiNoToken("/api/v1/auth/token/refresh", "POST");
  if (data.token) {
    onLoginSuccess(data);
  }
};
