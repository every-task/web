import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import TaskInformation from "../common/TaskInformation";

const StoryTask = ({ id }) => {
  const [tasks, setTasks] = useState([
    { period: "항상", content: "그냥 물을 많이 마시세요" },
    { period: "주간", content: "인바디를 재보세요" },
  ]);
  // TODO : useEffect 작성
  return (
    <>
      <Grid item md={12}>
        <Typography variant="h5" color="primary">
          Tasks
        </Typography>
      </Grid>
      <Grid item md={12}>
        {tasks.map((task, index) => (
          <TaskInformation key={index} task={task} />
        ))}
      </Grid>
    </>
  );
};

export default StoryTask;
