import React, { useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Box,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { editProject } from "../redux/projectSlice";

function EditProject({
  activeProject,
  openEdit,
  setOpenEdit,
  setAnchorElUser,
}) {
  const dispatch = useDispatch();
  const [updateProject, setUpdateProject] = useState({
    ...activeProject,
  });

  const handleUpdateChange = (e) => {
    setUpdateProject((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validateDateProject = (type) => {
    let deadline = new Date(updateProject.deadlineDate);
    let start = new Date(updateProject["start-date"]);
    let end = new Date(updateProject["end-date"]);
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

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setUpdateProject({ ...activeProject });
    setAnchorElUser(null);
  };

  return (
    <Dialog open={openEdit} onClose={handleCloseEdit}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ padding: "10px 5px" }}>
          <Stack spacing={4}>
            <TextField
              id="outlined-basic"
              name="title"
              label="Title"
              variant="outlined"
              sx={{ minWidth: "300px" }}
              defaultValue={activeProject.title}
              onChange={handleUpdateChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              name="description"
              label="Description"
              multiline
              maxRows={4}
              sx={{ minWidth: "300px" }}
              defaultValue={activeProject.description}
              onChange={handleUpdateChange}
            />

            <label>Deadline:</label>
            <div>
              <TextField
                type="time"
                id="deadlineTime"
                name="deadlineTime"
                sx={{
                  minWidth: "50px",

                  margin: "12px 10px 0 0px",
                }}
                defaultValue={activeProject.deadlineTime}
                onChange={handleUpdateChange}
              />
              <TextField
                type="date"
                id="deadlineDate"
                name="deadlineDate"
                sx={{ minWidth: "200px", marginTop: "12px" }}
                placeholder="dd/mm/yyyy"
                defaultValue={activeProject.deadlineDate}
                onChange={handleUpdateChange}
              />
            </div>

            <label htmlFor="start-date">Start Date :</label>
            <TextField
              type="date"
              id="start-date"
              name="start-date"
              // label="Start Date"
              placeholder="dd/mm/yyyy"
              variant="outlined"
              sx={{ minWidth: "200px", marginRight: "10px" }}
              error={validateDateProject("start")}
              helperText={
                validateDateProject("start")
                  ? "Start Date is before End Date & Deadline!"
                  : ""
              }
              defaultValue={activeProject["start-date"]}
              onChange={handleUpdateChange}
            />

            <label htmlFor="end-date">End Date :</label>
            <TextField
              type="date"
              id="end-date"
              name="end-date"
              // label="End Date"
              placeholder="dd/mm/yyyy"
              variant="outlined"
              sx={{ minWidth: "200px" }}
              error={validateDateProject("end")}
              helperText={
                validateDateProject("end")
                  ? "End Date is before Deadline and after Start Date!"
                  : ""
              }
              defaultValue={activeProject["end-date"]}
              onChange={handleUpdateChange}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit}>Cancel</Button>
        <Button
          disabled={validateDateProject()}
          onClick={() => {
            dispatch(editProject(updateProject));
            handleCloseEdit();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProject;
