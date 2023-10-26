import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";


const Myheader = () => {


    return (

        <AppBar position="static" color="common">
            <Toolbar >
                <Typography
                    variant="h5"
                    sx={{ flexGrow: 1, fontWeight: 'bold' }}
                    color="primary"
                >
                    <Link to='/' color='primary'> .Task</Link>
                </Typography>

                <Link to="/login"><Button color="text" size="large">Login</Button></Link>
                <Link to='/signup'><Button color="primary" size="large">signup</Button></Link>
            </Toolbar>
        </AppBar>




    );


}
export default Myheader