import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
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

  // console.log(activeProject);
  console.log("here4");

  useEffect(() => {
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
    <Card
      sx={{
        maxWidth: "100%",
        borderRadius: "none",
        boxShadow: 0,
        marginBottom: "50px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "32px",
              color: "#000",
              marginBottom: "10px",
            }}
          >
            {activeProject.attributes.title}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.secondary">
            {activeProject.attributes.description}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "40%",
            margin: "20px auto",
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AccessAlarmsIcon sx={{ flexGrow: 1 }} />
                <Typography sx={{ flexGrow: 2 }}>
                  Deadline: {activeProject.attributes.deadline}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <NotificationsIcon sx={{ flexGrow: 1 }} />
                <Typography sx={{ flexGrow: 2 }}>
                  Status: {activeProject.attributes.status}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <WorkHistoryIcon sx={{ flexGrow: 1 }} />
                <Typography sx={{ flexGrow: 2 }}>
                  Start: {activeProject.attributes.startDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <WorkHistoryIcon sx={{ flexGrow: 1 }} />
                <Typography sx={{ flexGrow: 2 }}>
                  Finish: {activeProject.attributes.endDate}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions
        sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}
      >
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
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
