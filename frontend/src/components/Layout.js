import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flexGrow: 1, paddingRight: 240 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">My Database Management App</Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: "2rem", overflowY: "auto" }}>{children}</div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Layout;
