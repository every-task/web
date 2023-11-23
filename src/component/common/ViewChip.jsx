import {Box, Grid} from "@mui/material";

const ViewChip = ({ view }) => {
    return <>
        <Box mr={1}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Grid item ml={2} mt={1}>
                <img src="https://cdn-icons-png.flaticon.com/128/64/64945.png" width="20" height="auto" />
            </Grid>
            <Grid item ml={1.5}>
                {view}
            </Grid>
        </Box>

    </>
};


export default ViewChip;