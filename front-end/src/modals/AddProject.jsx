import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addProject } from "../redux/projectSlice";

function AddProject({ openAdd, setOpenAdd }) {
  const today = new Date().toISOString();
  const [newProject, setNewProject] = useState({});
  const dispatch = useDispatch();

  const handleSetProject = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseAdd = () => {
    setNewProject({});

    setOpenAdd(false);
  };

  // validate
  const validateDate = (type) => {
    let deadline = new Date(newProject.deadlineDate);
    let start = new Date(newProject["start-date"]);
    let end = new Date(newProject["end-date"]);
    switch (type) {
      case "start":
        if (end && start > end) return true;
        else if (deadline && start > deadline) return true;
        return false;
      case "end":
        if (start && start > end) return true;
        else if (deadline && end > deadline) return true;
        return false;
      default:
        return false;
    }
  };

  const validateTime = () => {
    let currTime = new Date().toLocaleString("vi").slice(0, 5);
    if (
      newProject.deadlineDate === today.slice(0, 10) &&
      currTime > newProject.deadlineTime
    ) {
      return true;
    }

    return false;
  };

  // check value in newProject is empty
  const checkEmpty = () => {
    return (
      newProject.title === undefined ||
      newProject.deadlineTime === undefined ||
      newProject.deadlineDate === undefined ||
      newProject["start-date"] === undefined ||
      newProject["end-date"] === undefined
    );
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
                newProject.title === undefined
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

            <label>Deadline:</label>
            <div>
              <TextField
                required
                type="time"
                id="deadlineTime"
                name="deadlineTime"
                sx={{
                  minWidth: "50px",

                  margin: "12px 10px 0 0px",
                }}
                onChange={handleSetProject}
                error={validateTime()}
                helperText={
                  newProject.deadlineTime === undefined
                    ? "Please fill in this field!"
                    : validateTime()
                    ? "It's overdue!"
                    : ""
                }
              />
              <TextField
                required
                type="date"
                id="deadlineDate"
                name="deadlineDate"
                sx={{ minWidth: "200px", marginTop: "12px" }}
                placeholder="dd/mm/yyyy"
                inputProps={{
                  min: `${today.slice(0, 10)}`,
                  // min: "2023-07-10",
                }}
                onChange={handleSetProject}
                helperText={
                  newProject.deadlineDate === undefined
                    ? "Please fill in this field!"
                    : ""
                }
              />
            </div>

            <label htmlFor="start-date">Start Date :</label>
            <TextField
              required
              type="date"
              id="start-date"
              name="start-date"
              // label="Start Date"

              placeholder="dd/mm/yyyy"
              inputProps={{
                min: `${today.slice(0, 10)}`,
              }}
              error={validateDate("start")}
              helperText={
                newProject["start-date"] === undefined
                  ? "Please fill in this field!"
                  : validateDate("start")
                  ? "Start Date is before End Date & Deadline!"
                  : ""
              }
              variant="outlined"
              sx={{ minWidth: "200px", marginRight: "10px" }}
              onChange={handleSetProject}
            />

            <label htmlFor="end-date">End Date :</label>
            <TextField
              required
              type="date"
              id="end-date"
              name="end-date"
              // label="End Date"
              placeholder="dd/mm/yyyy"
              inputProps={{
                min: `${today.slice(0, 10)}`,
              }}
              variant="outlined"
              sx={{ minWidth: "200px" }}
              error={validateDate("end")}
              helperText={
                newProject["end-date"] === undefined
                  ? "Please fill in this field!"
                  : validateDate("end")
                  ? "End Date is before Deadline and after Start Date!"
                  : ""
              }
              onChange={handleSetProject}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAdd}>Cancel</Button>
        <Button
          disabled={
            validateDate("start") ||
            validateDate("end") ||
            validateTime() ||
            checkEmpty()
          }
          onClick={() => {
            dispatch(addProject(newProject));
            handleCloseAdd();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProject;
