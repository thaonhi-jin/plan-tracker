import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./dbSkeleton.css";

function DashBoardSkeleton() {
  return (
    <div className="home-page">
      <Skeleton variant="rectangular" width={250} sx={{ height: "100%" }} />
      <div className="dashboard">
        <div className="header">
          <div className="greeting">
            <Skeleton variant="rectangular" width={352} height={78} />
          </div>
          <div className="dateBox">
            <Skeleton variant="rectangular" width={180} height={32} />
            <Skeleton variant="circular" width={30} height={30} />
          </div>
        </div>
        <div className="overview">
          <div className="feature">
            <div className="widgets">
              <Skeleton variant="rectangular" width={220} height={90} />
              <Skeleton variant="rectangular" width={220} height={90} />
              <Skeleton variant="rectangular" width={220} height={90} />
            </div>
            <div className="chart">
              <Skeleton variant="rectangular" width={750} height={300} />
            </div>
          </div>
          <div className="notification">
            <Skeleton variant="rectangular" width={340} height={443} />
          </div>
        </div>
        <div className="taskList">
          <Skeleton variant="rectangular" width={350} height={470} />
          <Skeleton variant="rectangular" width={350} height={470} />
          <Skeleton variant="rectangular" width={350} height={470} />
        </div>
      </div>
    </div>
  );
}

export default DashBoardSkeleton;
