import React from "react";
import { useDispatch } from "react-redux";
import { setProjectActive } from "../../../redux/cacheSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

function NavigateModal({ openActiveProject, setOpenActiveProject, projectID }) {
  const dispatch = useDispatch();
  const handleClickActiveProject = () => {
    dispatch(setProjectActive(projectID));
  };
  const handleCloseActiveProject = () => {
    setOpenActiveProject(false);
  };

  return (
    <Dialog
      open={openActiveProject}
      onClose={handleCloseActiveProject}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" color="error">
        Deadline of project is overdue
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to navigate the related project to extend its deadline?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<ArrowCircleRightIcon />}
          color="error"
          onClick={handleClickActiveProject}
        >
          Go to project
        </Button>
        <Button onClick={handleCloseActiveProject} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NavigateModal;
