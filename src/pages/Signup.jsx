import {

    CssBaseline,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    Container,
} from "@mui/material"


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { MyCustomTheme } from "../component/template/Palette";



const Signup = () => {

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

    const defaultTheme = createTheme();


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };




    return <ThemeProvider theme={MyCustomTheme}>
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
                    Welcome!
                </Typography>
                <Typography>
                    Sign Up to Get Started
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, alignItems: 'center' }}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                autoComplete="Name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                required
                                fullWidth
                                id="nickname"
                                label="nickname"
                                name="nickname"
                                autoComplete="nickname"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    </ThemeProvider>


}

export default Signup