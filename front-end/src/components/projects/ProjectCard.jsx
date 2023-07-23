import React from "react";
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

function ProjectCard() {
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const activeProject = infoProjects.find((project) => project.isActive);

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
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<DeleteIcon />}
          sx={{ color: "#0DA2FF" }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
