import React, { useEffect, useState } from "react";
import { Chip, Grid, Typography } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";
import DateChip from "../common/DateChip";
import MemberChip from "../common/MemberChip";
import { api } from "../../network/api";

const StoryArticle = ({ id }) => {
  const [article, setArticle] = useState({
    category: "운동",
    title: " 대충 제목이 들어올겁니다.",
    content: "ㅁㅁㅁ",
    createdAt: "2023-11-08",
    member: {
      nickname: "사자는어흥",
      imageUrl: "M",
    },
  });

  const getArticle = async () => {
    try {
      const { data } = await api(`/api/v1/story/${id}`, "GET", {});
      setArticle(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);
  return (
    <>
      <Grid item md={12}>
        <Chip label={article.category} color="primary" variant="outlined" />
      </Grid>
      <Grid item md={12}>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          {article.title}
        </Typography>
      </Grid>
      <Grid item md={12}>
        <MemberChip member={article.member} />
        <DateChip date={article.createdAt} />
      </Grid>
      <Grid item md={12}>
        <Viewer
          initialValue={
            "여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야 여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야" +
            "여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야" +
            "여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야" +
            "여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야" +
            "여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야" +
            "여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야" +
            "여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야" +
            "여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야" +
            "여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야" +
            "여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야" +
            "여기에는 엄청나게 긴 내용이 들어올 것이야, 여기에는 엄청나게 긴 내용이 들어올 것이야"
          }
        />
      </Grid>
    </>
  );
};

export default StoryArticle;
