import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTaskCompleted, setTaskStatus } from "../redux/projectSlice";
import { setDateTime } from "../redux/updateCurrentSlice";
import Column from "./Column";
import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";

function Project() {
  const dispatch = useDispatch();
  const status = ["Not Started", "In Progress", "Completed"];
  const projects = useSelector((state) => state.projects);
  const activeProject = projects.find((project) => project.isActive);
  const filterTasks = (status) => {
    return activeProject.tasks.filter((task) => task.status === status);
  };
  const [alert, setAlert] = useState({
    type: "",
    content: "",
  });

  // update all in active project
  useEffect(() => {
    updateAll();
    // const interval = setInterval(() => {
    //   updateAll();
    // }, 1000);
    // return () => clearInterval(interval);
  }, [activeProject]);

  async function updateAll() {
    try {
      const currentDateTime = await updateCurrentTime();
      await updateTasks(activeProject.tasks, currentDateTime);
      await updateProject(currentDateTime);
    } catch (error) {
      console.log(error);
    }
  }

  // 1. update current time
  const updateCurrentTime = () => {
    return new Promise((resolve) => {
      dispatch(setDateTime());
      resolve(new Date().toISOString());
    });
  };

  // 2. update tasks, subtasks
  const isAllSubtasksCompleted = (subtasks) => {
    let isCompleted = true;
    (subtasks || []).forEach((subtask) => {
      if (!subtask.isCompleted) isCompleted = false;
    });
    return isCompleted;
  };

  const checkTaskStatus = (task, index, currentDateTime) => {
    let currDate = new Date(currentDateTime.slice(0, 10));
    let start = new Date(task["start-date"]);
    if (currDate < start) {
      dispatch(setTaskStatus({ index, newStatus: "Not Started" }));
    } else {
      dispatch(setTaskStatus({ index, newStatus: "In Progress" }));
    }
  };

  const updateTasks = (tasks, currentDateTime) => {
    return new Promise((resolve) => {
      (tasks || []).forEach((task, index) => {
        if (task.subtasks.length > 0) {
          if (isAllSubtasksCompleted(task.subtasks) && !task.isCompleted) {
            dispatch(setTaskCompleted(index));
            dispatch(setTaskStatus({ index, newStatus: "Completed" }));
          } else if (
            !isAllSubtasksCompleted(task.subtasks) &&
            task.isCompleted
          ) {
            dispatch(setTaskCompleted(index));
            checkTaskStatus(task, index, currentDateTime);
          } else if (
            !isAllSubtasksCompleted(task.subtasks) &&
            !task.isCompleted
          ) {
            checkTaskStatus(task, index, currentDateTime);
          }
        } else {
          if (task.isCompleted && task.status !== "Completed") {
            dispatch(setTaskStatus({ index, newStatus: "Completed" }));
          } else if (!task.isCompleted) {
            checkTaskStatus(task, index, currentDateTime);
          }
        }
      });

      resolve();
    });
  };

  // 3. update project
  const isCompletedProject = () => {
    if (activeProject.tasks.length === 0) return false;
    let isCompleted = true;
    activeProject.tasks.forEach((task) => {
      if (!task.isCompleted) isCompleted = false;
    });
    return isCompleted;
  };

  const updateProject = (currentDateTime) => {
    return new Promise((resolve) => {
      // const currentDateTime = useSelector((state) => state.currentState);
      let currDateTime = new Date(currentDateTime);
      let currDate = new Date(currentDateTime.slice(0, 10));
      let end = new Date(activeProject["end-date"]);
      let deadline = new Date(
        activeProject.deadlineDate + " " + activeProject.deadlineTime
      );
      // console.log(end, currDate, currDateTime, deadline);
      if (isCompletedProject(activeProject))
        setAlert({ type: "success", content: "This project is completed!" });
      else if (end <= currDate && currDateTime < deadline)
        setAlert({ type: "warning", content: "The deadline is coming!" });
      else if (currDateTime >= deadline)
        setAlert({ type: "error", content: "It's overdue!" });
      else setAlert(null);
      resolve();
    });
  };

  return (
    <div>
      <ProjectCard project={activeProject} alert={alert} />

      <Grid sx={{ flexGrow: 1 }} container spacing={45}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            spacing={15}
            sx={{ paddingTop: "20px" }}
          >
            {status.map((value, index) => (
              <Grid key={index} item>
                <Column
                  statusName={value}
                  tasks={filterTasks(value)}
                  maxDate={activeProject["end-date"]}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Project;
