import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Toolbar,
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddTask from "../modals/AddTask";
import DeleteProject from "../modals/DeleteProject";
import EditProject from "../modals/EditProject";
import { convertDate } from "../redux/projectSlice";

function ProjectCard({ project, alert }) {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  // add task
  const handleOpenAddTask = () => {
    setOpenAddTask(true);
  };

  // edit project modal
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  // delete project modal
  const handleOpenDel = () => {
    setOpenDel(true);
  };

  // handle open/close setting modal
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardContent>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 14,
              display: { xs: "none", md: "flex" },
              fontWeight: "700",
              fontSize: "25px",
              color: "#000",
              justifyContent: "flex-start",
            }}
          >
            {/* title Task */}
            {project.title}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                borderRadius: "20px",
                backgroundColor: "#1E90FF",
              }}
              variant="contained"
              onClick={handleOpenAddTask}
            >
              + Add New Task
            </Button>
          </Box>

          {/* Add task modal */}
          {openAddTask && (
            <AddTask
              openAddTask={openAddTask}
              setOpenAddTask={setOpenAddTask}
              activeProject={project}
            />
          )}
          {/* Setting Project */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MoreVertIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
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
                <Typography textAlign="center">Edit Project</Typography>
              </MenuItem>

              <MenuItem onClick={() => handleOpenDel()}>
                <Typography textAlign="center" color="error">
                  Delete Project
                </Typography>
              </MenuItem>

              {/* Edit Project Modal */}
              {openEdit && (
                <EditProject
                  activeProject={project}
                  openEdit={openEdit}
                  setOpenEdit={setOpenEdit}
                  setAnchorElUser={setAnchorElUser}
                />
              )}

              {/* Delete Project Modal */}
              {openDel && (
                <DeleteProject
                  openDel={openDel}
                  setOpenDel={setOpenDel}
                  projectTitle={project.title}
                />
              )}
            </Menu>
          </Box>
        </Toolbar>
        <Typography>Description: {project.description}</Typography>
        <Typography>
          Deadline:{" "}
          {project.deadlineTime + " " + convertDate(project.deadlineDate)}
        </Typography>

        <Typography>Start: {convertDate(project["start-date"])}</Typography>
        <Typography>Finish: {convertDate(project["end-date"])}</Typography>
      </CardContent>
      <CardContent>
        {alert ? <Alert severity={alert.type}>{alert.content}</Alert> : ""}
      </CardContent>
      {alert ? (
        <CardActions>
          {alert.type === "error" || alert.type === "warning" ? (
            <Button
              size="medium"
              variant="contained"
              color={alert.type}
              onClick={() => handleOpenEdit()}
            >
              Set new deadline
            </Button>
          ) : (
            ""
          )}

          {alert.type === "error" ? (
            <Button
              size="medium"
              variant="outlined"
              color={alert.type}
              onClick={() => handleOpenDel()}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
        </CardActions>
      ) : (
        ""
      )}
    </Card>
  );
}

export default ProjectCard;
