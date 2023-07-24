import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import DeleteProject from "../../modals/DeleteProject";
import EditProject from "../../modals/EditProject";

function ProjectCard() {
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const activeProject = infoProjects.find((project) => project.isActive);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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
                  Status: In Progress
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
