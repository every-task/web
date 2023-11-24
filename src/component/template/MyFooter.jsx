import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit">TaskTeam</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const MyFooter = () => {
  return (
    <Box component="footer" position="static" color="common">
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
        </Typography>
        <Copyright />
      </Toolbar>
    </Box>
  );
};
export default MyFooter;
