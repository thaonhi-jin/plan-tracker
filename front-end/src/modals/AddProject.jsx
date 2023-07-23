import React, { useState } from "react";
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
} from "@mui/material";
import { setUpdateNoti } from "../redux/cacheSlice";
import { addProject } from "../data/CRUD";

function AddProject({ openAdd, setOpenAdd }) {
  const [newProject, setNewProject] = useState({});
  const dispatch = useDispatch();

  const handleSetProject = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProject = async () => {
    try {
      addProject(newProject);
      dispatch(setUpdateNoti());
    } catch (err) {
      console.log(err);
    }
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

            <TextField
              required
              type="date"
              id="deadline"
              name="deadline"
              sx={{ minWidth: "200px", marginTop: "12px" }}
              placeholder="dd/mm/yyyy"
              onChange={handleSetProject}
              helperText={
                newProject.deadline === undefined
                  ? "Please fill in this field!"
                  : ""
              }
            />

            <label htmlFor="start-date">Start Date :</label>
            <TextField
              required
              type="date"
              id="start-date"
              name="startDate"
              // label="Start Date"

              placeholder="dd/mm/yyyy"
              helperText={
                newProject.startDate === undefined
                  ? "Please fill in this field!"
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
              name="endDate"
              // label="End Date"
              placeholder="dd/mm/yyyy"
              variant="outlined"
              sx={{ minWidth: "200px" }}
              helperText={
                newProject.endDate === undefined
                  ? "Please fill in this field!"
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
          onClick={() => {
            handleAddProject();
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
