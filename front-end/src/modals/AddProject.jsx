import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Chip,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addInfoProject, setProjectActive } from "../redux/cacheSlice";
import { checkInValid, checkProjectStatus } from "../redux/methods";

function AddProject({ openAdd, setOpenAdd }) {
  const today = dayjs(dayjs().format("YYYY-MM-DD"));
  const [newProject, setNewProject] = useState({});
  const dispatch = useDispatch();
  // console.log(newProject);

  // check deadline,startDate, endDate is existed
  const checkDateExisted = () => {
    if (
      checkInValid(newProject.deadline, "date") ||
      checkInValid(newProject.startDate, "date") ||
      checkInValid(newProject.endDate, "date")
    )
      return false;
    return true;
  };

  // return minDate/maxDate for Date Type
  const FindMinDate = (dateType) => {
    if (dateType === "deadline") {
      if (!checkInValid(newProject.endDate, "date"))
        return dayjs(newProject.endDate);
      else if (!checkInValid(newProject.startDate, "date"))
        return dayjs(newProject.startDate);
    } else if (dateType === "end") {
      if (!checkInValid(newProject.startDate, "date"))
        return dayjs(newProject.startDate);
    }
    return today;
  };

  const FindMaxDate = (dateType) => {
    if (dateType === "start") {
      if (!checkInValid(newProject.endDate, "date"))
        return dayjs(newProject.endDate);
      else if (!checkInValid(newProject.deadline, "date"))
        return dayjs(newProject.deadline);
    } else if (dateType === "end") {
      if (!checkInValid(newProject.deadline, "date"))
        return dayjs(newProject.deadline);
    }
  };

  // relate change/update newProject
  const handleSetProject = (e) => {
    // console.log(e.target.value);
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetDate = (name, value) => {
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  const handleAddProject = () => {
    let status = checkProjectStatus(
      newProject.startDate,
      newProject.endDate,
      newProject.deadline,
      []
    );
    let data = {
      data: {
        ...newProject,
        status: status,
      },
    };

    axios
      .post("http://localhost:1337/api/projects", data)
      .then((res) => {
        dispatch(addInfoProject(res.data.data));
        return res.data.data.id;
      })
      .then((id) => {
        dispatch(setProjectActive(id));
        setNewProject({});
        setOpenAdd(false);
      })
      .catch((err) => console.log(err));
  };

  // check empty before add project
  const checkEmpty = () => {
    return (
      checkInValid(newProject.title, "text") ||
      checkInValid(newProject.deadline, "date") ||
      checkInValid(newProject.startDate, "date") ||
      checkInValid(newProject.endDate, "date")
    );
  };

  const handleCloseAdd = () => {
    setNewProject({});
    setOpenAdd(false);
  };
  return (
    <Dialog open={openAdd} onClose={handleCloseAdd}>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ padding: "10px 5px" }}>
          <Stack spacing={4}>
            <TextField
              required
              id="outlined-basic"
              name="title"
              label="Title"
              variant="outlined"
              sx={{ minWidth: "300px" }}
              onChange={handleSetProject}
              helperText={
                checkInValid(newProject.title, "text")
                  ? "Please fill in this field!"
                  : ""
              }
            />
            <TextField
              id="outlined-multiline-flexible"
              name="description"
              label="Description"
              multiline
              maxRows={4}
              sx={{ minWidth: "300px" }}
              onChange={handleSetProject}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <label>Note: Deadline isn't after Start/End Date.</label>
              <DatePicker
                required
                label="Deadline"
                id="deadline"
                name="deadline"
                sx={{ minWidth: "200px" }}
                format="DD-MM-YYYY"
                minDate={FindMinDate("deadline")}
                onChange={(value) => {
                  if (value)
                    handleSetDate("deadline", value.format("YYYY-MM-DD"));
                }}
                slotProps={{
                  textField: {
                    helperText: `${
                      checkInValid(newProject.deadline, "date")
                        ? "Please fill in this field!"
                        : ""
                    }`,
                  },
                }}
              />

              <label>Note: End Date isn't after Start Date.</label>
              <DatePicker
                required
                label="Start Date"
                id="startDate"
                name="startDate"
                sx={{ minWidth: "200px", marginTop: "12px" }}
                format="DD-MM-YYYY"
                minDate={today}
                maxDate={FindMaxDate("start")}
                onChange={(value) => {
                  if (value)
                    handleSetDate("startDate", value.format("YYYY-MM-DD"));
                }}
                slotProps={{
                  textField: {
                    helperText: `${
                      checkInValid(newProject.startDate, "date")
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
                minDate={FindMinDate("end")}
                maxDate={FindMaxDate("end")}
                onChange={(value) => {
                  if (value)
                    handleSetDate("endDate", value.format("YYYY-MM-DD"));
                }}
                slotProps={{
                  textField: {
                    helperText: `${
                      checkInValid(newProject.endDate, "date")
                        ? "Please fill in this field!"
                        : ""
                    }`,
                  },
                }}
              />
            </LocalizationProvider>

            <label>Status: </label>
            <Chip
              label={
                checkDateExisted()
                  ? checkProjectStatus(
                      newProject.startDate,
                      newProject.endDate,
                      newProject.deadline,
                      []
                    )
                  : "Please fill in dates!"
              }
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAdd}>Cancel</Button>
        <Button
          disabled={checkEmpty()}
          onClick={() => {
            handleAddProject();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProject;
