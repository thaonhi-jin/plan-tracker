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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editInfoProject } from "../redux/cacheSlice";
import { checkProjectStatus } from "../redux/methods";

function EditProject({ activeProject, openEdit, setOpenEdit }) {
  const dispatch = useDispatch();
  const [updateProject, setUpdateProject] = useState({
    ...activeProject.attributes,
  });
  const activeTasks = useSelector((state) => state.cache.activeTasks);

  const handleUpdateChange = (e) => {
    setUpdateProject((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleEditProject = () => {
    let status = checkProjectStatus(
      updateProject.startDate,
      updateProject.endDate,
      updateProject.deadline,
      activeTasks.tasks
    );
    let updateData = {
      data: {
        ...updateProject,
        status: status,
      },
    };

    axios
      .put(`http://localhost:1337/api/projects/${activeProject.id}`, updateData)
      .then((res) => {
        dispatch(editInfoProject(res.data.data));
      })
      .then(() => {
        setOpenEdit(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
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
              defaultValue={activeProject.attributes.title}
              onChange={handleUpdateChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              name="description"
              label="Description"
              multiline
              maxRows={4}
              sx={{ minWidth: "300px" }}
              defaultValue={activeProject.attributes.description}
              onChange={handleUpdateChange}
            />

            <label>Deadline:</label>
            <div>
              <TextField
                type="date"
                id="deadline"
                name="deadline"
                sx={{ minWidth: "200px", marginTop: "12px" }}
                placeholder="dd/mm/yyyy"
                defaultValue={activeProject.attributes.deadline}
                onChange={handleUpdateChange}
              />
            </div>

            <label htmlFor="start-date">Start Date :</label>
            <TextField
              type="date"
              id="start-date"
              name="startDate"
              // label="Start Date"
              placeholder="dd/mm/yyyy"
              variant="outlined"
              sx={{ minWidth: "200px", marginRight: "10px" }}
              defaultValue={activeProject.attributes.startDate}
              onChange={handleUpdateChange}
            />

            <label htmlFor="end-date">End Date :</label>
            <TextField
              type="date"
              id="end-date"
              name="endDate"
              // label="End Date"
              placeholder="dd/mm/yyyy"
              variant="outlined"
              sx={{ minWidth: "200px" }}
              defaultValue={activeProject.attributes.endDate}
              onChange={handleUpdateChange}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit}>Cancel</Button>
        <Button
          onClick={() => {
            handleEditProject();
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
