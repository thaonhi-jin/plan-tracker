import React, { useState } from "react";
import { Button, Typography, Box, Divider, Stack, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from "@mui/icons-material/Circle";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";
import AddTask from "../../modals/AddTask";

function Tasks() {
  const status = ["Not Started", "In Progress", "Completed"];
  const activeTasks = useSelector((state) => state.cache.activeTasks);
  const [openAddTask, setOpenAddTask] = useState(false);

  // add task
  const handleOpenAddTask = () => {
    setOpenAddTask(true);
  };
  // console.log(activeTasks);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "5px 30px",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: "20px",
            color: "#000",
          }}
        >
          Tasks (5)
        </Typography>
        <Button
          size="small"
          //   variant="outlined"
          sx={{ color: "#0DA2FF" }}
          startIcon={<AddIcon />}
          onClick={handleOpenAddTask}
        >
          Add task
        </Button>

        {/* Add task modal */}
        {openAddTask && (
          <AddTask
            openAddTask={openAddTask}
            setOpenAddTask={setOpenAddTask}
            projectID={activeTasks.projectID}
          />
        )}
      </Box>
      <Divider sx={{ margin: "0 20px", height: "2px", color: "#828282" }} />

      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="space-around"
            sx={{ padding: "30px 0px" }}
          >
            {status.map((value, index) => (
              <Grid key={index} item>
                <Box sx={{ display: "flex", minWidth: "280px" }}>
                  <CircleIcon
                    fontSize="small"
                    sx={{
                      color:
                        index === 0
                          ? "#FFD300"
                          : index === 1
                          ? "#1F51FF"
                          : "green",
                    }}
                  />

                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: "600",
                      color: "#828FA3",
                      fontSize: "16px",
                      letterSpacing: "0.15em",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    {value} (4)
                  </Typography>
                </Box>
                <Stack spacing={2}>
                  {activeTasks.tasks.length > 0
                    ? activeTasks.tasks.map((task) => {
                        if (task.attributes.status === value)
                          return <TaskCard task={task} />;
                        else return "";
                      })
                    : ""}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Tasks;
