import Editor from "../component/post/Editor"
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { api } from "../network/api";
import { useEffect } from "react";
import SendIcon from '@mui/icons-material/Send';

import {
    CssBaseline,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Container,
} from "@mui/material"


import { ThemeProvider } from '@mui/material/styles';
import { MyCustomTheme } from "../component/template/Palette";
import { useState } from "react";



const Post = () => {

    const [key, setKey] = useState()


    const getUploadKey = async () => {

        const keys = await api('api/v1/firebase', 'GET')

        setKey(keys)

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


    }

    useEffect(() => {

        getUploadKey()

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = new FormData(e.currentTarget);

        const post = {
            title: result.get('title'),
            content: result.get('content'),
        }

        try {

            const { data } = await api('api/v1/story', 'post', post)

        } catch (err) {
            console.log(err)
        }

    };


    return <>

        < ThemeProvider theme={MyCustomTheme} >
            <Container component="main" Width="500">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,

                        alignItems: "flex-start"
                    }}
                >

                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }} >
                        당신의 성공담을 공유해주세요!
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                        mt: 1, alignItems: 'center', display: 'flex',
                        flexDirection: 'column',
                        alignItems: "flex-start"
                    }}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            id="title"
                            label="title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            sx={{ width: 500 }}
                        />

                        <TextField
                            id="content"

                            label="content"
                            name="content"
                            multiline
                            maxRows={20}
                            minRows={10}
                            sx={{ width: 500 }}
                        />

                        <Box sx={{ mt: 1 }}>
                            <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
                                <Grid item >
                                    <Button type="submit" variant="outlined" endIcon={<SendIcon />}>작성하기</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" endIcon={<SendIcon />}>취소하기</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    </>

}

export default Post