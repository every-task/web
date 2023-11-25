import {
    Avatar,
    Button,
    Card, CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Container,
    Grid,
    Typography
} from "@mui/material";
import {red} from "@mui/material/colors";
import React from "react";
import {useNavigate} from "react-router";

const ShowQuestionsCard =({data}) => {
    const nav = useNavigate();
    const goToQuestionDetail = (el) => {
        nav(`/question/${el}`);
    };
    return <div>
        <Container sx={{ py: 8 }}>
            <Grid container spacing={4} mt={4}>
                {data.map((el, index) => (
                    <Grid item key={index} md={4}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CardActionArea
                                onClick={() => goToQuestionDetail(el.id)}
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
                                    image={el.category === "HEALTH" && "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_640.jpg" ||
                                        el.category ==="TRAVEL" && "https://cdn.pixabay.com/photo/2017/06/05/11/01/airport-2373727_640.jpg" ||
                                        el.category ==="ART" && "https://cdn.pixabay.com/photo/2013/03/23/23/10/brush-96240_640.jpg" ||
                                        el.category ==="RELATIONSHIP" && "https://cdn.pixabay.com/photo/2017/06/27/11/48/team-spirit-2447163_640.jpg" ||
                                        el.category ==="EMPLOYMENT" && "https://cdn.pixabay.com/photo/2012/12/07/15/11/looking-for-a-job-68958_640.jpg" ||
                                        el.category ==="STRESS" && "https://cdn.pixabay.com/photo/2014/11/02/09/15/man-513529_640.jpg" ||
                                        el.category ==="LANGUAGE" && "https://cdn.pixabay.com/photo/2015/08/24/20/13/welcome-905562_640.png"}
                                    alt="No image"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {el.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </div>

}
export default ShowQuestionsCard;

const data = {
    HEALTH:"https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_640.jpg",



}