import React, {useEffect, useState} from 'react';
import {api} from "../../network/api";
import {Grid, Typography} from "@mui/material";
import TaskInformation from "../common/TaskInformation";

const QuestionTasks = ({id}) => {
    const [tasks, setTasks] = useState([]);
    const [taskStatus, setTaskStatus] = useState(false)
    useEffect(() => {
        getStoryTasks();
    }, []);
    const getStoryTasks = async () => {
        const { data } = await api(`/api/v1/task/suggest/questions/${id}/tasks`, "GET", {});
        setTasks(data);
        if(tasks.length!=0)
        {
            setTaskStatus(!taskStatus);
        }
    };
    return (
        <>
            <Grid item md={12}>
                <Typography variant="h5" color="primary">
                    Tasks
                </Typography>
            </Grid>
            <Grid item md={12}>
                {taskStatus === true && tasks.map((task, index) => (
                        <TaskInformation key={index} task={task} />
                    ))
                }
            </Grid>
        </>
    );
};

export default QuestionTasks;