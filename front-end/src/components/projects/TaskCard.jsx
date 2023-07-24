import React, { useState } from "react";
import {
  Typography,
  Paper,
  Checkbox,
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DeleteTask from "../../modals/DeleteTask";
import EditTask from "../../modals/EditTask";

function TaskCard({ task }) {
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // edit-task modal
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  // open delete-task modal
  const handleOpenDel = () => {
    setOpenDel(true);
  };

  // settings for Task
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Paper
      elevation={3}
      sx={{
        width: "256px",
        height: "fit-content",
        padding: "12px 12px",
        margin: "12px 0",
        borderRadius: "7px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            flexGrow: 4,
          }}
        >
          {task.attributes.name}
        </Typography>
        <Tooltip title="Open settings" sx={{ flexGrow: 1 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <MoreVertIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* menu settings */}
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => handleOpenEdit()}>
          <Typography textAlign="center">Edit Task</Typography>
        </MenuItem>

        <MenuItem onClick={() => handleOpenDel()}>
          <Typography textAlign="center" color="error">
            Delete Task
          </Typography>
        </MenuItem>

        {/* Edit Task Modal */}
        {openEdit && (
          <EditTask
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            setAnchorElUser={setAnchorElUser}
            task={task}
          />
        )}

        {/* Delete Task Modal */}
        {openDel && (
          <DeleteTask
            openDel={openDel}
            setOpenDel={setOpenDel}
            setAnchorElUser={setAnchorElUser}
            taskName={task.attributes.name}
            taskID={task.id}
          />
        )}
      </Menu>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          margin: "10px 3px",
        }}
      >
        <ScheduleIcon sx={{ flexGrow: 1 }} fontSize="medium" />
        <Typography sx={{ flexGrow: 4 }} fontSize="14px" color="text.secondary">
          <Chip label={task.attributes.startDate} sx={{ height: "26px" }} /> -{" "}
          <Chip label={task.attributes.endDate} sx={{ height: "26px" }} />
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <Checkbox
          checked={task.attributes.isCompleted}
          sx={{ width: "20px", height: "20px", flexGrow: 1 }}
        />
        <Typography
          sx={{ flexGrow: 10 }}
          fontSize="14px"
          color="text.secondary"
        >
          Completed
        </Typography>
      </Box>
    </Paper>
  );
}

export default TaskCard;
