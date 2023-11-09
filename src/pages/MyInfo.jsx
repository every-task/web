import { Avatar, Box, Button, Container, CssBaseline, FormControl, Grid, Input, InputLabel, OutlinedInput, TextField, Typography, } from "@mui/material"

import { Link, useNavigate } from "react-router-dom";
import { apiNoToken } from "../network/api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";




const MyInfo = () => {

    const [key, setKey] = useState("");

    const getUploadKey = async () => {
        const keys = await apiNoToken("api/v1/auth/firebase", "GET");
        setKey(keys);
    };

    useEffect(() => {
        getUploadKey();
    }, []);


    // 이 밑은 파일 버튼을 눌렀을때 하면 됨.
    // const auth = getAuth();

    // signInWithCustomToken(auth, keys)
    //     .then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         // 추가적으로 할게 없음. 어짜피 기존에 로그인 되어있던 유저의 uuid를 활용하여 키를 발급받아온 것임.

    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // ...
    //     });

    const nav = useNavigate()
    const user = useSelector((state) => state.me)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log({
            email: data.get('email'),
            nickname: data.get('nickname'),
        });
    };




    return <>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <label htmlFor="img">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 150, height: 150 }} src={user.profileImageUrl}>
                    </Avatar>
                </label>
                <Input type="file" id="img" sx={{ display: "none" }} />


                <Typography component="h1" variant="h5">
                    내 정보 수정
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <OutlinedInput
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    defaultValue={user.email}
                                    sx={{ minWidth: 400 }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="nickname">nickname</InputLabel>
                                <OutlinedInput
                                    required
                                    fullWidth
                                    name="nickname"
                                    label='nickname'
                                    defaultValue={user.nickname}
                                    id="nickname"
                                    sx={{ minWidth: 400 }}
                                />
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        변경
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>


    </>


}

export default MyInfo