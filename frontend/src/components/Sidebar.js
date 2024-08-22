import React from "react";
import { List, ListItem, ListItemText, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import strings from "../strings";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      PaperProps={{ style: { width: 240 } }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary={strings.persons} />
        </ListItem>
        <ListItem button component={Link} to="/archive">
          <ListItemText primary={strings.archive} />
        </ListItem>
        <ListItem button component={Link} to="/calls-log">
          <ListItemText primary={strings.callsLog} />
        </ListItem>
        <ListItem button component={Link} to="/dispatch">
          <ListItemText primary={strings.dispatch} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
