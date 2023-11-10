import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import TaskInformation from "../common/TaskInformation";
import { api } from "../../network/api";

const StoryTask = ({ id }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getStoryTasks();
  }, []);
  const getStoryTasks = async () => {
    const { data } = await api(`/api/v1/task/stories/${id}/tasks`, "GET", {});
    console.log(data);
    setTasks(data);
  };
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
