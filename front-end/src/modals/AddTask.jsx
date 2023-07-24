import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/cacheSlice";

function AddTask({ openAddTask, setOpenAddTask, projectID }) {
  const [newTask, setNewTask] = useState({});
  const dispatch = useDispatch();
  const relation = {
    data: {
      project: {
        set: [projectID],
      },
    },
  };

  // check status
  const checkStatus = () => {
    let currDate = new Date();
    let start = new Date(newTask.startDate);
    if (currDate >= start) return "In Progress";
    return "Not Started";
  };

  const handleSetTask = (e) => {
    setNewTask((prevTask) => {
      return { ...prevTask, [e.target.name]: e.target.value };
    });
  };

  const handleAddTask = () => {
    let data = {
      data: {
        ...newTask,
        status: checkStatus(),
        isCompleted: false,
      },
    };
    axios
      .post("http://localhost:1337/api/tasks", data)
      .then((res) => {
        axios
          .put(`http://localhost:1337/api/tasks/${res.data.data.id}`, relation)
          .then(() => {
            dispatch(addTask(res.data.data));
          })
          .then(() => {
            setNewTask({});
            setOpenAddTask(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleCloseAddTask = () => {
    setNewTask({});
    setOpenAddTask(false);
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
              name="startDate"
              // label="Start Date"
              variant="outlined"
              type="date"
              placeholder="dd/mm/yyyy"
              sx={{ width: "200px", marginRight: "10px" }}
              onChange={handleSetTask}
              helperText={
                newTask.startDate === undefined
                  ? "Please fill in this field!"
                  : ""
              }
            />

            <label htmlFor="end-date">End Date</label>
            <TextField
              required
              id="outlined-basic"
              name="endDate"
              // label="End Date"
              variant="outlined"
              sx={{ width: "200px" }}
              type="date"
              placeholder="dd/mm/yyyy"
              onChange={handleSetTask}
              helperText={
                newTask["end-date"] === undefined
                  ? "Please fill in this field!"
                  : ""
              }
            />

            <div>
              <label>Status: </label>
              <Chip
                label={newTask.startDate ? checkStatus() : "Not Started"}
                sx={{
                  backgroundColor:
                    newTask.startDate && checkStatus() === "In Progress"
                      ? "#6ac5fe"
                      : "#fff444",
                }}
              />
              <Chip label="Not Completed" variant="outlined" />
            </div>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAddTask}>Cancel</Button>
        <Button
          onClick={() => {
            handleAddTask();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTask;
