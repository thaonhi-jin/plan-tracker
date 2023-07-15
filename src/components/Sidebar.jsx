import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useSelector, useDispatch } from "react-redux";
import { setProjectActive } from "../redux/projectSlice";
import AddProject from "../modals/AddProject";

function Sidebar() {
  const sidebarWidth = 250;
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        marginTop: "64px",
        height: "100vh",
        "& > div": { borderRight: "none" },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100vh",
          backgroundColor: "#F0F8FF",
          marginTop: "64px",
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "10px",
            }}
          >
            <Typography variant="body2" fontWeight="700" color="black">
              Daily Plan
            </Typography>
          </Box>
        </ListItem>
        <ListItem sx={{ padding: "4px 16px" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700" color="black">
              Projects ({projects?.length})
            </Typography>
            <IconButton onClick={() => handleOpenAdd()}>
              <AddBoxOutlinedIcon fontSize="small" color="#4B5563" />
            </IconButton>
          </Box>
        </ListItem>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List sx={{ padding: "0" }}>
            {projects
              ? projects.map((project, index) => (
                  <>
                    <ListItemButton
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "4px 8px",
                      }}
                      onClick={() => dispatch(setProjectActive({ index }))}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "30px",
                        }}
                      >
                        <ListAltIcon
                          fontSize="small"
                          style={{
                            color: "#4B5563",
                          }}
                        />
                      </ListItemIcon>
                      <Typography
                        variant="body2"
                        fontWeight="100"
                        color="black"
                      >
                        {project.title}
                      </Typography>
                    </ListItemButton>
                  </>
                ))
              : "No project!"}
          </List>
        </Collapse>
      </List>

      {/* Add Project Modal */}
      {openAdd && <AddProject openAdd={openAdd} setOpenAdd={setOpenAdd} />}
    </Drawer>
  );
}

export default Sidebar;
