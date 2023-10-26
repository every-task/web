import { AppBar, Toolbar, Typography, Box, Button, Link } from "@mui/material";


const Myheader = () => {


    return (

        <AppBar position="static" color="common">
            <Toolbar >
                <Typography
                    variant="h4"
                    sx={{ flexGrow: 1, fontWeight: 'bold' }}
                    color="primary"
                >
                    <Link href='/home' color='primary' underline="none"> .Task</Link>
                </Typography>
                <Button color="text" size="large">Login</Button>
                <Button color="primary" size="large">signup</Button>
            </Toolbar>
        </AppBar>




    );


}
export default Myheader