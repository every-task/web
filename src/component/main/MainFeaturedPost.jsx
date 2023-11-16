import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";

const MainFeaturedPost = (props) => {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        minHeight: 400,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${post.image})`,
        width: "100%",
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: "none", objectFit: "fill" }}
          src={post.image}
          alt={post.imageText}
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
              pt: 10,
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              mt={4}
            >
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph mt={4}>
              {post.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;
