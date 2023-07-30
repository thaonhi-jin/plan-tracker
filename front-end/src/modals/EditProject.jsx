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
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { editInfoProject } from "../redux/cacheSlice";
import { checkInValid, checkProjectStatus } from "../redux/methods";

function EditProject({ activeProject, openEdit, setOpenEdit }) {
  const dispatch = useDispatch();
  const [updateProject, setUpdateProject] = useState({
    ...activeProject.attributes,
  });
  const activeTasks = useSelector((state) => state.cache.activeTasks);

  // return minDate/maxDate for Date Type
  const FindMinDate = (dateType) => {
    if (dateType === "deadline") {
      if (!checkInValid(updateProject.endDate, "date"))
        return dayjs(updateProject.endDate);
      else if (!checkInValid(updateProject.startDate, "date"))
        return dayjs(updateProject.startDate);
    } else if (dateType === "end") {
      if (!checkInValid(updateProject.startDate, "date"))
        return dayjs(updateProject.startDate);
    }
  };

  const FindMaxDate = (dateType) => {
    if (dateType === "start") {
      if (!checkInValid(updateProject.endDate, "date"))
        return dayjs(updateProject.endDate);
      else if (!checkInValid(updateProject.deadline, "date"))
        return dayjs(updateProject.deadline);
    } else if (dateType === "end") {
      if (!checkInValid(updateProject.deadline, "date"))
        return dayjs(updateProject.deadline);
    }
  };

  const DisplayStatus = () => {
    if (
      checkInValid(updateProject.deadline, "date") ||
      checkInValid(updateProject.startDate, "date") ||
      checkInValid(updateProject.endDate, "date")
    )
      return activeProject.attributes.status;
    return checkProjectStatus(
      updateProject.startDate,
      updateProject.endDate,
      updateProject.deadline,
      activeTasks.tasks
    );
  };

  const handleUpdateDate = (name, value) => {
    setUpdateProject({
      ...updateProject,
      [name]: value,
    });
  };
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

  // check empty before add project
  const checkEmpty = () => {
    return (
      checkInValid(updateProject.title, "text") ||
      checkInValid(updateProject.deadline, "date") ||
      checkInValid(updateProject.startDate, "date") ||
      checkInValid(updateProject.endDate, "date")
    );
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  return (
    <Dialog open={openEdit} onClose={handleCloseEdit}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ padding: "10px 5px" }}>
          <Stack spacing={3}>
            <TextField
              id="outlined-basic"
              name="title"
              label="Title"
              variant="outlined"
              sx={{ minWidth: "300px" }}
              defaultValue={activeProject.attributes.title}
              onChange={handleUpdateChange}
              helperText={
                checkInValid(updateProject.title, "text")
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
              defaultValue={activeProject.attributes.description}
              onChange={handleUpdateChange}
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
                defaultValue={dayjs(updateProject.deadline)}
                minDate={FindMinDate("deadline")}
                onChange={(value) => {
                  if (value)
                    handleUpdateDate("deadline", value.format("YYYY-MM-DD"));
                }}
                slotProps={{
                  textField: {
                    helperText: `${
                      checkInValid(updateProject.deadline, "date")
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
                defaultValue={dayjs(updateProject.startDate)}
                maxDate={FindMaxDate("start")}
                onChange={(value) => {
                  if (value)
                    handleUpdateDate("startDate", value.format("YYYY-MM-DD"));
                }}
                slotProps={{
                  textField: {
                    helperText: `${
                      checkInValid(updateProject.startDate, "date")
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
                defaultValue={dayjs(updateProject.endDate)}
                minDate={FindMinDate("end")}
                maxDate={FindMaxDate("end")}
                onChange={(value) => {
                  if (value)
                    handleUpdateDate("endDate", value.format("YYYY-MM-DD"));
                }}
                slotProps={{
                  textField: {
                    helperText: `${
                      checkInValid(updateProject.endDate, "date")
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
                label={DisplayStatus()}
                sx={{
                  backgroundColor:
                    DisplayStatus() === "In Progress"
                      ? "#73C2FB"
                      : DisplayStatus() === "Completed"
                      ? "#3DD598"
                      : DisplayStatus() === "It's overdue"
                      ? "#FC5A5A"
                      : DisplayStatus() === "Deadline is coming"
                      ? "#fee135"
                      : "action",
                }}
              />
            </div>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit}>Cancel</Button>
        <Button
          disabled={checkEmpty()}
          onClick={() => {
            handleEditProject();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProject;
