import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
// import useFetch from "./useFetch";
import { readProjects, createProject } from "./crud";

function StrapiDemo() {
  const [data, setData] = useState([]);
  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/api/projects"
  // );
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error</p>;

  useEffect(() => {
    const fetchData = async () => {
      const result = await readProjects("http://localhost:1337/api/projects");
      console.log(result.data.data);
      setData(result.data.data);
    };

    fetchData();
  }, []);

  const createFunc = async () => {
    try {
      const result = await createProject("http://localhost:1337/api/projects", {
        data: {
          title: "Project6",
          description: "this is a project",
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  createFunc();

  return (
    <div>
      {data.map((project) => (
        <Box key={project.id}>
          <Typography>{project.id}</Typography>
          <Typography>{project.attributes.title}</Typography>
          <Typography>{project.attributes.isActive}</Typography>
          <Typography>{project.attributes.deadline}</Typography>
          <Typography>{project.attributes.startDate}</Typography>
          <Typography>{project.attributes.endDate}</Typography>
        </Box>
      ))}
    </div>
  );
}

export default StrapiDemo;
