import React, { useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Box,
  IconButton,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/projectSlice";

function AddTask({ openAddTask, setOpenAddTask, activeProject }) {
  const dispatch = useDispatch();
  const currentDateTime = useSelector((state) => state.currentState.datetime);
  const today = currentDateTime.slice(0, 10);

  const initialTask = {
    name: "",
    "start-date": "",
    "end-date": "",
  };
  const initialSubtasks = [
    { name: "", isCompleted: false, id: 0 },
    { name: "", isCompleted: false, id: 1 },
  ];
  const [newTask, setNewTask] = useState({});
  const [subtasks, setSubtasks] = useState(initialSubtasks);

  // check status
  const checkStatus = () => {
    let currDate = new Date(today);
    let start = new Date(newTask["start-date"]);
    // console.log(currDate, start);
    if (currDate >= start) return "In Progress";
    return "Not Started";
  };

  // validate
  const validateDateTask = () => {
    let start = new Date(newTask["start-date"]);
    let end = new Date(newTask["end-date"]);
    if (start && end) return start > end;
    return false;
  };

  // subtasks
  const handleAddSubTask = () => {
    let length = subtasks.length;
    setSubtasks((prev) => [
      ...prev,
      { name: "", isCompleted: false, id: length },
    ]);
  };

  const handleChangeSubtasks = (id, newValue) => {
    setSubtasks((prev) => {
      const newState = [...prev];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.name = newValue;
      return newState;
    });
  };

  const handleDelSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  // task
  const handleSetTask = (e) => {
    setNewTask((prevTask) => {
      return { ...prevTask, [e.target.name]: e.target.value };
    });
  };

  const handleCloseAddTask = () => {
    setOpenAddTask(false);
    setNewTask(initialTask);
    setSubtasks(initialSubtasks);
  };

  // check value in newTask is empty
  const checkSubtasksEmpty = () => {
    let emptyFlag = false;
    if (subtasks.length > 0) {
      subtasks.forEach((subtask) => {
        if (subtask.name === "") emptyFlag = true;
      });
    }
    return emptyFlag;
  };
  const checkTaskEmpty = () => {
    return (
      newTask.name === undefined ||
      newTask["start-date"] === undefined ||
      newTask["end-date"] === undefined
    );
  };

  return (
    <Dialog open={openAddTask} onClose={handleCloseAddTask}>
      <DialogTitle>Create New Task</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ padding: "10px 5px" }}>
          <Stack spacing={4}>
            <TextField
              required
              id="outlined-basic"
              name="name"
              label="Name"
              variant="outlined"
              sx={{ width: "400px" }}
              onChange={handleSetTask}
              helperText={
                newTask.name === undefined ? "Please fill in this field!" : ""
              }
            />

            <label htmlFor="start-date">Start Date:</label>
            <TextField
              required
              id="outlined-basic"
              name="start-date"
              // label="Start Date"
              variant="outlined"
              type="date"
              placeholder="dd/mm/yyyy"
              sx={{ width: "200px", marginRight: "10px" }}
              onChange={handleSetTask}
              inputProps={{
                min: `${today}`,
                max: `${activeProject["end-date"]}`,
              }}
              error={validateDateTask()}
              helperText={
                newTask["start-date"] === undefined
                  ? "Please fill in this field!"
                  : validateDateTask()
                  ? "Start Date is before End Date!"
                  : ""
              }
            />

            <label htmlFor="end-date">End Date</label>
            <TextField
              required
              id="outlined-basic"
              name="end-date"
              // label="End Date"
              variant="outlined"
              sx={{ width: "200px" }}
              type="date"
              placeholder="dd/mm/yyyy"
              inputProps={{
                min: `${today}`,
                max: `${activeProject["end-date"]}`,
              }}
              onChange={handleSetTask}
              error={validateDateTask()}
              helperText={
                newTask["end-date"] === undefined
                  ? "Please fill in this field!"
                  : validateDateTask()
                  ? "Start Date is before End Date!"
                  : ""
              }
            />

            <div>
              <label>Status: </label>
              <Chip
                label={newTask["start-date"] ? checkStatus() : "Not Started"}
                sx={{
                  backgroundColor:
                    newTask["start-date"] && checkStatus() === "In Progress"
                      ? "#6ac5fe"
                      : "#fff444",
                }}
              />
              <Chip label="Not Completed" variant="outlined" />
            </div>

            <div>
              <Box
                sx={{
                  width: "25%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontSize="16px" fontWeight="500" color="black">
                  Subtasks
                </Typography>
                <IconButton>
                  <AddBoxOutlinedIcon
                    fontSize="small"
                    color="#4B5563"
                    onClick={handleAddSubTask}
                  />
                </IconButton>
              </Box>

              {subtasks.map((subtask, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginTop: "15px",
                  }}
                >
                  <TextField
                    hiddenLabel
                    // defaultValue="e.g Take coffee break"
                    variant="filled"
                    size="small"
                    placeholder="e.g Take coffee break"
                    sx={{ minWidth: "400px" }}
                    onChange={(e) =>
                      handleChangeSubtasks(subtask.id, e.target.value)
                    }
                    helperText={
                      subtask.name === ""
                        ? "Please fill in a name for this subtask!"
                        : ""
                    }
                  />

                  <IconButton
                    sx={{ ml: 2, my: 0.5 }}
                    onClick={() => handleDelSubtask(subtask.id)}
                  >
                    <DeleteIcon fontSize="small" color="#4B5563" />
                  </IconButton>
                </Box>
              ))}
            </div>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAddTask}>Cancel</Button>
        <Button
          disabled={
            validateDateTask() || checkTaskEmpty() || checkSubtasksEmpty()
          }
          onClick={() => {
            setNewTask({ ...newTask, status: checkStatus() });
            dispatch(addTask({ newTask, subtasks }));
            handleCloseAddTask();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTask;
