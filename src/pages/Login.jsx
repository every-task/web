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
} from "@mui/material"


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import { MyCustomTheme } from "../component/template/Palette";
import { apiNoToken } from "../network/api";



export const Login = () => {
    const nav = useNavigate()


    const Copyright = (props) => {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" to="https://playdata.io/">
                    PLAYDATA
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    // TODO remove, this demo shouldn't need to reset the theme.






    return <>

        < ThemeProvider theme={MyCustomTheme} >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >

                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }} >
                        Hello Again!
                    </Typography>
                    <Typography>
                        Welcome Back
                    </Typography>
                    <Box component="form" onSubmit={(e) => handleSubmit(e, nav)} noValidate sx={{ mt: 1, alignItems: 'center' }}>
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
                        <FormControlLabel
                            control={<Checkbox color="primary" name="remember" />}
                            label="Remember me"
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
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider >
    </>

}

export const handleSubmit = async (e, nav) => {

    e.preventDefault();
    const result = new FormData(e.currentTarget);

    const member = {
        email: result.get('email'),
        password: result.get('password'),
        remember: result.get('remember') === 'on' ? true : false
    }



    console.log(member)

    try {

        const { data } = await apiNoToken('api/v1/member/login', 'POST', member)
        localStorage.setItem('token', data.token)
        nav("/")

    } catch (err) {
        console.log(err)
    }

};
