import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  Input,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { apiNoToken } from "../network/api";
import { useEffect } from "react";
import { useState } from "react";

import {
  getUploadKey,
  handleImageUpload,
  resizeFile,
} from "../firebase/FileUpload";
import { useSelector } from "react-redux";

const MyInfo = () => {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const isLogin = useSelector((state) => state.me.isLogin);

  const [user, setUser] = useState();

  const [image, setImage] = useState();

  const [imagePreview, setImagePreview] = useState();

  const getUserData = async () => {
    const { data } = await apiNoToken("api/v1/auth/member/me/info", "GET");
    setUser(data);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const nickname = data.get("nickname");
    if (!nickname) {
      alert("빈칸을 채워주세요.");
      return;
    }

    if (nickname.length > 10) {
      alert("별명은 10글자 이내로 작성 바랍니다.");
      return;
    }

    let profileImageUrl;

    if (image) {
      const resizeImg = await resizeFile(image);

      profileImageUrl = await handleImageUpload(user, resizeImg);
    } else {
      profileImageUrl = user.profileImageUrl;
    }

    const member = {
      nickname,
      profileImageUrl,
    };

    try {
      apiNoToken("/api/v1/auth/member/me/info", "PUT", member);

      alert("변경되었습니다!");
      window.location.assign("/");
    } catch (err) {}
  };

  const uploadImgHandler = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage && !selectedImage.type.match(imageMimeType)) {
      alert("올바른 이미지를 올려주세요.");
      return;
    }

    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  useEffect(() => {
    if (isLogin) {
      getUserData();
      getUploadKey();
    }
  }, [isLogin]);

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setImagePreview(result);
        }
      };
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        {user && (
          <>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                mb: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                내 정보 수정
              </Typography>
              <label htmlFor="img">
                <Avatar
                  sx={{
                    m: 3,
                    bgcolor: "secondary.main",
                    width: 150,
                    height: 150,
                  }}
                  src={imagePreview || user.profileImageUrl}
                ></Avatar>
              </label>
              <Input
                type="file"
                id="img"
                sx={{ display: "none" }}
                onChange={uploadImgHandler}
              />

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <FormControl>
                      <InputLabel htmlFor="nickname">nickname</InputLabel>
                      <OutlinedInput
                        required
                        fullWidth
                        name="nickname"
                        label="nickname"
                        defaultValue={user.nickname}
                        id="nickname"
                        sx={{ minWidth: 400 }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Box
                  sx={{ display: "flex", mt: 3, justifyContent: "flex-end" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mb: 2, mr: 3 }}
                  >
                    변경하기
                  </Button>
                  <Button variant="contained" sx={{ mb: 2 }}>
                    <Link to="/">취소</Link>
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default MyInfo;
