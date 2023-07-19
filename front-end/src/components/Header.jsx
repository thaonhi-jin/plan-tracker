import * as React from "react";
import { AppBar, Toolbar, Container } from "@mui/material";

import { useSelector } from "react-redux";

function Header() {
  const projects = useSelector((state) => state.projects);
  const activeProject = projects.find((board) => board.isActive);

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // backgroundColor: "#73C2FB",
          backgroundColor: "#fff",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters></Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
