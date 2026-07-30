import React from "react";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import Drawer from "../components/drawer";
import { UserSettings } from "../components/usersettings";

const drawerCollapsed = 97;
const drawerExpanded = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg,#f9f9f9 0%, #e8e8e8 100%)",
    minHeight: "100vh",
    overflowX: "hidden",
    display: "flex",
  },
  drawerWrapper: {
    flexShrink: 0,
    transition: "width 0.3s ease",
  },
  content: {
    flex: 1,
    minWidth: 0,
    transition: "max-width 0.3s ease",
    margin: "auto",
  },
}));

export default function Settings() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const current = drawerOpen ? drawerExpanded : drawerCollapsed;
  return (
    <Box className={classes.root}>
      <Box
        className={classes.drawerWrapper}
        style={{ width: current }}
        onMouseEnter={() => setDrawerOpen(true)}
        onMouseLeave={() => setDrawerOpen(false)}
      >
        <Drawer />
      </Box>
      <Box className={classes.content} style={{ maxWidth: `calc(100% - ${current}px)` }}>
        <UserSettings />
      </Box>
    </Box>
  );
}
