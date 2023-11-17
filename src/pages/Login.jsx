import {
  Avatar,
  CssBaseline,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Container,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { MyCustomTheme } from "../component/template/Palette";
import { apiNoToken } from "../network/api";
import { onLoginSuccess } from "../component/template/Myheader";
import { setLogin, setMe } from "../feature/meSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.me.isLogin);

  const getData = async () => {
    const { data } = await apiNoToken("/api/v1/auth/member/me/info", "GET");

    dispatch(setMe(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = new FormData(e.currentTarget);
    const member = {
      email: result.get("email"),
      password: result.get("password"),
    };

    try {
      const { data } = await apiNoToken(
        "/api/v1/auth/member/login",
        "POST",
        member
      );

      if (!isLogin) {
        dispatch(setLogin(true));

        onLoginSuccess(data);
      } else {
        const accessToken = data.token;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      }
      nav("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Typography
        position="absolute"
        variant="h5"
        sx={{ flexGrow: 1, fontWeight: "bold", ml: 3, mt: -6 }}
        color="primary"
      >
        <Link to="/" color="primary">
          {" "}
          .Task
        </Link>
      </Typography>

      <ThemeProvider theme={MyCustomTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Hello Again!
            </Typography>
            <Typography>Welcome Back</Typography>
            <Box
              component="form"
              onSubmit={(e) => handleSubmit(e, nav)}
              noValidate
              sx={{ mt: 1, alignItems: "center" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Button>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default Login;
