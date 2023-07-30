import React, { useEffect, useState } from "react";
import axios from "axios";
import { CardContent, Button, Typography, Grid, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { useDispatch, useSelector } from "react-redux";
import DeleteProject from "../../modals/DeleteProject";
import EditProject from "../../modals/EditProject";
import { editInfoProject } from "../../redux/cacheSlice";
import { checkProjectStatus } from "../../redux/methods";
import {
  CardActionStyled,
  ProjectCardContent,
  ProjectInfoBox,
  ProjectInfoItem,
  ProjectTitle,
} from "./styles/ProjectCardStyles";
import dayjs from "dayjs";

function ProjectCard() {
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const activeProject = infoProjects.find((project) => project.isActive);
  const activeTasks = useSelector((state) => state.cache.activeTasks);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  let updateStatus = checkProjectStatus(
    activeProject.attributes.startDate,
    activeProject.attributes.endDate,
    activeProject.attributes.deadline,
    activeTasks.tasks
  );

  console.log(activeProject, updateStatus);

  useEffect(() => {
    console.log("here4");
    if (activeProject.attributes.status !== updateStatus) {
      let updateProject = {
        data: {
          ...activeProject.attributes,
          status: updateStatus,
        },
      };
      axios
        .put(
          `http://localhost:1337/api/projects/${activeProject.id}`,
          updateProject
        )
        .then((res) => {
          dispatch(editInfoProject(res.data.data));
        })
        .catch((err) => console.log(err));
    }
  }, [updateStatus]);

  // edit project modal
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  // delete project modal
  const handleOpenDel = () => {
    setOpenDel(true);
  };

  return (
    <ProjectCardContent>
      <CardContent>
        <Box sx={{ textAlign: "center" }}>
          <ProjectTitle variant="h4" component="div">
            {activeProject.attributes.title}
          </ProjectTitle>
          <Typography sx={{ fontSize: 18 }} color="text.secondary">
            {activeProject.attributes.description}
          </Typography>
        </Box>

        <ProjectInfoBox>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <ProjectInfoItem>
                <AccessAlarmsIcon sx={{ flexGrow: 1, color: "#73C2FB" }} />
                <Typography sx={{ flexGrow: 2, color: "#01058A" }}>
                  Deadline:{" "}
                  {dayjs(activeProject.attributes.deadline).format(
                    "DD-MM-YYYY"
                  )}
                </Typography>
              </ProjectInfoItem>
            </Grid>
            <Grid item xs={6}>
              <ProjectInfoItem>
                <NotificationsIcon sx={{ flexGrow: 1, color: "#73C2FB" }} />
                <Typography sx={{ flexGrow: 2, color: "#01058A" }}>
                  Status: {activeProject.attributes.status}
                </Typography>
              </ProjectInfoItem>
            </Grid>
            <Grid item xs={6}>
              <ProjectInfoItem>
                <WorkHistoryIcon sx={{ flexGrow: 1, color: "#73C2FB" }} />
                <Typography sx={{ flexGrow: 2, color: "#01058A" }}>
                  Start:{" "}
                  {dayjs(activeProject.attributes.startDate).format(
                    "DD-MM-YYYY"
                  )}
                </Typography>
              </ProjectInfoItem>
            </Grid>
            <Grid item xs={6}>
              <ProjectInfoItem>
                <WorkHistoryIcon sx={{ flexGrow: 1, color: "#73C2FB" }} />
                <Typography sx={{ flexGrow: 2, color: "#01058A" }}>
                  Finish:{" "}
                  {dayjs(activeProject.attributes.endDate).format("DD-MM-YYYY")}
                </Typography>
              </ProjectInfoItem>
            </Grid>
          </Grid>
        </ProjectInfoBox>
      </CardContent>
      <CardActionStyled>
        <Button
          variant="contained"
          size="small"
          startIcon={<EditIcon />}
          sx={{ backgroundColor: "#0DA2FF" }}
          onClick={() => handleOpenEdit()}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<DeleteIcon />}
          sx={{ color: "#0DA2FF" }}
          onClick={() => handleOpenDel()}
        >
          Delete
        </Button>

        {openEdit && (
          <EditProject
            activeProject={activeProject}
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
          />
        )}

        {/* Delete Project Modal */}
        {openDel && (
          <DeleteProject
            openDel={openDel}
            setOpenDel={setOpenDel}
            projectTitle={activeProject.attributes.title}
          />
        )}
      </CardActionStyled>
    </ProjectCardContent>
  );
}

export default ProjectCard;
