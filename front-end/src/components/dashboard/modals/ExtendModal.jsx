import React from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import { useSelector, useDispatch } from "react-redux";
import {
  editProjectDashBoard,
  editTaskDashBoard,
} from "../../../redux/cacheSlice";

function ExtendModal({
  openExtend,
  setOpenExtend,
  setOpenActiveProject,
  task,
}) {
  const dispatch = useDispatch();
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const selectedProject = infoProjects.find(
    (project) => project.id === task.projectID
  );
  const today = new Date().toISOString().slice(0, 10);

  const handleClickExtend = () => {
    if (selectedProject.attributes.status !== "It's overdue") {
      let updateState = {
        data: {
          ...task.attributes,
          status: "In Progress",
          endDate: today,
        },
      };

      axios
        .put(`http://localhost:1337/api/tasks/${task.id}`, updateState)
        .then((res) => {
          dispatch(editTaskDashBoard(res.data.data));
        })
        .then(() => {
          if (selectedProject.attributes.status === "Deadline is coming") {
            let updateProject = {
              data: {
                ...selectedProject.attributes,
                status: "In Progress",
                endDate: today,
              },
            };
            axios
              .put(
                `http://localhost:1337/api/projects/${task.projectID}`,
                updateProject
              )
              .then((res) => {
                console.log(res.data.data);
                dispatch(editProjectDashBoard(res.data.data));
                setOpenExtend(false);
              })
              .catch((err) => {
                console.log(err);
                setOpenExtend(false);
              });
          } else setOpenExtend(false);
        });
    } else {
      setOpenActiveProject(true);
      setOpenExtend(false);
    }
  };
  const handleCloseExtend = () => {
    setOpenExtend(false);
  };
  return (
    <Dialog
      open={openExtend}
      onClose={handleCloseExtend}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" color="warning">
        Extend this task?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to extend end date for the "
          {task.attributes.name}" task? This action can change the end date of
          the related project.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<UpdateIcon />}
          color="warning"
          onClick={handleClickExtend}
        >
          Extend
        </Button>
        <Button onClick={handleCloseExtend} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExtendModal;
