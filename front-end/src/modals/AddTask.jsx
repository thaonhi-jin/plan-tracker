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
  Alert,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/cacheSlice";
import { checkInValid } from "../redux/methods";

function AddTask({ openAddTask, setOpenAddTask, projectID }) {
  const today = dayjs(dayjs().format("YYYY-MM-DD"));
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const activeProject = infoProjects.find((project) => project.isActive);
  const endDateProject = dayjs(activeProject.attributes.endDate);
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

  // return maxDate for StartDate
  const FindMaxDate = () => {
    if (!checkInValid(newTask.endDate, "date")) return dayjs(newTask.endDate);
    return endDateProject;
  };

  // return minDate for EndDate
  const FindMinDate = () => {
    if (!checkInValid(newTask.startDate, "date"))
      return dayjs(newTask.startDate);
    return today;
  };

  const handleSetDate = (name, value) => {
    setNewTask((prevTask) => {
      return { ...prevTask, [name]: value };
    });
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

  //check empty before add project
  const checkEmpty = () => {
    return (
      checkInValid(newTask.name, "text") ||
      checkInValid(newTask.startDate, "date") ||
      checkInValid(newTask.endDate, "date")
    );
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
            {today.isAfter(endDateProject) ? (
              <Alert severity="warning">
                The End Date of project is overdue. Please extend it before add
                new task.
              </Alert>
            ) : (
              ""
            )}
            <TextField
              required
              id="outlined-basic"
              name="name"
              label="Name"
              variant="outlined"
              sx={{ width: "400px" }}
              onChange={handleSetTask}
              helperText={
                checkInValid(newTask.name, "text")
                  ? "Please fill in this field!"
                  : ""
              }
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <label>Note: End Date isn't after Start Date.</label>
              <DatePicker
                required
                label="Start Date"
                id="startDate"
                name="startDate"
                sx={{ minWidth: "200px", marginTop: "12px" }}
                format="DD-MM-YYYY"
                minDate={today}
                maxDate={FindMaxDate()}
                onChange={(value) => {
                  if (value)
                    handleSetDate("startDate", value.format("YYYY-MM-DD"));
                }}
                slotProps={{
                  textField: {
                    helperText: `${
                      checkInValid(newTask.startDate, "date")
                        ? "Please fill in this field!"
                        : ""
                    }`,
                  },
                }}
              />

              <DatePicker
                required
                label="End Date"
                id="endDate"
                name="endDate"
                sx={{ minWidth: "200px", marginTop: "12px" }}
                format="DD-MM-YYYY"
                minDate={FindMinDate()}
                maxDate={endDateProject}
                onChange={(value) => {
                  if (value)
                    handleSetDate("endDate", value.format("YYYY-MM-DD"));
                }}
                slotProps={{
                  textField: {
                    helperText: `${
                      checkInValid(newTask.endDate, "date")
                        ? "Please fill in this field!"
                        : ""
                    }`,
                  },
                }}
              />
            </LocalizationProvider>

            <div>
              <label>Status: </label>
              <Chip
                label={
                  checkInValid(newTask.startDate)
                    ? checkStatus()
                    : "Not Started"
                }
                sx={{
                  backgroundColor:
                    checkInValid(newTask.startDate) &&
                    checkStatus() === "In Progress"
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
        <Button sx={{ color: "#555555" }} onClick={handleCloseAddTask}>
          Cancel
        </Button>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          variant="outlined"
          sx={{ color: "#0DA2FF" }}
          disabled={checkEmpty()}
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
