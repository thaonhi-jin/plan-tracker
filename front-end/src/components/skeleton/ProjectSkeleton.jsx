import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./projectSkeleton.css";

function ProjectSkeleton() {
  return (
    <div>
      <div className="projectDetail">
        <Skeleton variant="rectangular" width={1270} height={200} />
        <div className="buttons">
          <Skeleton variant="rectangular" width={75} height={30} />
          <Skeleton variant="rectangular" width={75} height={30} />
        </div>
      </div>
    </div>
  );
}

export default ProjectSkeleton;
