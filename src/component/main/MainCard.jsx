import React, { useEffect, useState } from 'react';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { api, apiNoToken } from "../../network/api";

const MainCard = () => {
    const [data, setData] = useState([]);
    const [myMentees, setMyMentees] = useState([]);
    const [myMentors, setMyMentors] = useState([]);
    const getData = async () => {
        const { data } = await apiNoToken(`/api/v1/story`, "GET")
        setData(data.content);
    }
    console.log(data);
    useEffect(() => {
        getData()
    }, [])
    return (
        <Container sx={{ py: 8 }} >
            {/* End hero unit */}
            <Grid container spacing={4}>
                {data.map((el, index) => (
                    <Grid item key={index} md={4}  >
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                                    </Avatar>
                                }
                                title="김아무개"
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://cdn.pixabay.com/photo/2023/09/21/18/17/automobile-8267369_1280.jpg"
                                alt="Paella dish"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {el.title}
                                </Typography>
                                <Typography overflow="hidden" textOverflow="ellipsis">
                                    {el.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>

    );
};

export default MainCard;