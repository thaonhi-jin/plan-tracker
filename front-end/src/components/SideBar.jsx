import React, { useState } from "react";
import {
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { useSelector, useDispatch } from "react-redux";
import { setProjectActive } from "../redux/cacheSlice";
import AddProject from "../modals/AddProject";
import {
  AddIconStyle,
  AllProjectBox,
  AllProjectContent,
  LogoApp,
  LogoIcon,
  LogoTitle,
  ProjectItem,
  ProjectItemTitle,
  ProjectList,
  SideBar,
  SideBarContent,
} from "./sidebarStyles";

function Sidebar() {
  const dispatch = useDispatch();
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  return (
    <SideBar container={window.document.body} variant="permanent" open={true}>
      <SideBarContent disablePadding>
        <ListItem sx={{ padding: "16px 8px" }}>
          <LogoApp>
            <LogoIcon />
            <LogoTitle variant="h4" noWrap component="a" href="/">
              Plan Tracker
            </LogoTitle>
          </LogoApp>
        </ListItem>
        <ProjectList>
          <AllProjectBox>
            <AllProjectContent variant="body2">
              All projects ({infoProjects?.length})
            </AllProjectContent>
            <IconButton onClick={() => handleOpenAdd()}>
              <AddIconStyle fontSize="medium" />
            </IconButton>
          </AllProjectBox>
        </ProjectList>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List sx={{ padding: "0" }}>
            {infoProjects
              ? infoProjects.map((project) => (
                  <ProjectItem
                    key={project.id}
                    sx={{ backgroundColor: project.isActive ? "#1AA8E9" : "" }}
                    onClick={() => {
                      dispatch(setProjectActive(project.id));
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "30px", mr: 2 }}>
                      <SpaceDashboardIcon
                        fontSize="medium"
                        sx={{ color: "#fff" }}
                      />
                    </ListItemIcon>
                    <ProjectItemTitle variant="body2">
                      {project.attributes.title}
                    </ProjectItemTitle>
                  </ProjectItem>
                ))
              : "No project!"}
          </List>
        </Collapse>
      </SideBarContent>

      {/* Add Project Modal */}
      {openAdd && <AddProject openAdd={openAdd} setOpenAdd={setOpenAdd} />}
    </SideBar>
  );
}

export default Sidebar;
