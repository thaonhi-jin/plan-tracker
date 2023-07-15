import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Project from "./components/Project";
import './App.css'
import { useSelector, useDispatch } from "react-redux";
import {
  setProjectActive, setTaskCompleted,
  setTaskStatus,
} from "./redux/projectSlice";
import { useEffect, useState } from "react";
import { setDateTime } from "./redux/updateCurrentSlice"

function App() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const activeProject = projects.find((board) => board.isActive);
  if (!activeProject && projects.length > 0)
    dispatch(setProjectActive({ index: 0 }));
  const currentDateTime = useSelector((state) => state.currentState);
  const [theme, setTheme] = useState("#fff")

  useEffect(() => {
    updateAll()
  }, [activeProject])

  async function updateAll() {
    try {
      await updateCurrentTime()
      await updateTasks(activeProject.tasks)
      await updateProject()
      // setTimeout(() => { updateAll() }, 10000)
    }
    catch (error) {
      console.log(error)
    }
  }

  // 1. update current time
  const updateCurrentTime = () => {
    return new Promise((resolve) => {
      dispatch(setDateTime())
      // let currDateTime = new Date().toISOString()
      resolve()
    })
  }

  // 2. update tasks, subtasks
  const isAllSubtasksCompleted = (subtasks) => {
    let isCompleted = true;
    (subtasks || []).forEach((subtask) => {
      if (!subtask.isCompleted) isCompleted = false;
    });
    return isCompleted;
  };

  const checkTaskStatus = (task, index) => {
    let currDate = new Date(currentDateTime.datetime.slice(0, 10));
    let start = new Date(task["start-date"]);
    if (currDate < start) {
      dispatch(setTaskStatus({ index, newStatus: "Not Started" }));
    } else {
      dispatch(setTaskStatus({ index, newStatus: "In Progress" }));
    }
  };

  const updateTasks = (tasks) => {
    return new Promise((resolve) => {

      (tasks || []).forEach((task, index) => {
        if (task.subtasks.length > 0) {
          if (isAllSubtasksCompleted(task.subtasks) && !task.isCompleted) {
            dispatch(setTaskCompleted(index));
            dispatch(setTaskStatus({ index, newStatus: "Completed" }));
          }
          else if (!isAllSubtasksCompleted(task.subtasks) && task.isCompleted) {
            dispatch(setTaskCompleted(index));
            checkTaskStatus(task, index)
          }
          else if (!isAllSubtasksCompleted(task.subtasks) && !task.isCompleted) {
            checkTaskStatus(task, index);
          }
        }
        else {
          if (task.isCompleted && task.status !== "Completed") {
            dispatch(setTaskStatus({ index, newStatus: "Completed" }));
          } else if (!task.isCompleted) {
            checkTaskStatus(task, index);
          }
        }
      });

      resolve()
    })
  }

  // 3. update project
  const isCompletedProject = () => {
    if (activeProject.tasks.length === 0) return false
    let isCompleted = true;
    activeProject.tasks.forEach((task) => {
      if (!task.isCompleted) isCompleted = false;
    });
    return isCompleted;
  };

  const updateProject = () => {
    return new Promise((resolve) => {
      let currDateTime = new Date(currentDateTime.datetime);
      let currDate = new Date(currentDateTime.datetime.slice(0, 10));
      let end = new Date(activeProject["end-date"]);
      let deadline = new Date(
        activeProject.deadlineDate + " " + activeProject.deadlineTime
      );
      // console.log(end, currDate, currDateTime, deadline);
      if (isCompletedProject(activeProject)) setTheme("#ABD5AB");
      else if (end <= currDate && currDateTime < deadline)
        setTheme("#FEFEBE")
      else if (currDateTime >= deadline) setTheme("#F28B88")
      else setTheme("#fff")
      resolve()
    })
  };
  return (
    <div className="App" style={{ backgroundColor: `${theme}` }} >
      <Header />
      <Project updateTasks={updateTasks} />
      <Sidebar />

    </div>
  );
}

export default App;
