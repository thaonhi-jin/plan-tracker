import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Typography } from "@mui/material";

const PROJECTS = gql`
  query GetProjects {
    project {
      id
      title
      isActive
      deadline
      startDate
      endDate
    }
  }
`;

function StrapiDemo() {
  const { loading, error, data } = useQuery(PROJECTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);
  return (
    <div>
      {data.project.map((project) => {
        <Box key={project.id}>
          <Typography>{project.id}</Typography>
          <Typography>{project.title}</Typography>
          <Typography>{project.isActive}</Typography>
          <Typography>{project.deadline}</Typography>
          <Typography>{project.startDate}</Typography>
          <Typography>{project.endDate}</Typography>
        </Box>;
      })}
    </div>
  );
}

export default StrapiDemo;
