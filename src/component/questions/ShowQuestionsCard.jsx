import {Avatar, Card, CardContent, CardHeader, CardMedia, Chip, Container, Grid, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import React from "react";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

const ShowQuestionsCard =({data}) => {
    const nav = useNavigate();
    const goToQuestionDetail = (el) => {
        nav(`/question/${el.id}`);
    };
    return <div>
        <Container sx={{ py: 8 }}>
            <Grid container spacing={4} mt={4}>
                {data.map((el, index) => (
                    <Grid item key={index} md={4}>
                        <Link to={`/question/${el.id}`}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            sx={{ bgcolor: red[500] }}
                                            aria-label="user"
                                            src={el.member?.profileImageUrl}
                                        ></Avatar>
                                    }
                                    title={el.member?.nickname}
                                    action={
                                        <Chip
                                            label={el?.category}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    }
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
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </div>

}
export default ShowQuestionsCard;