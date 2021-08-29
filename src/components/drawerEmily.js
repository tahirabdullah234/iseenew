import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import logo from "../emily/logo.svg";
import dashboard from "../emily/dashboard.svg";
import report from "../emily/report.svg";
import logout from "../emily/logout.svg";
import setting from "../emily/setting.svg";
import user from "../emily/user.svg";

import { Grid, Typography } from "@material-ui/core";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerClose: {
    background: "#1061b0",
    color: "#fff",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(12) + 1,
    },
    "&:hover": {
      width: drawerWidth,
      backgroundColor: "linearGradient(#1061b0 0%, #003c72 100%)",
      color: "#fff",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  toolbar: {
    backgroundColor: "#3585da",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  imageIcon: {
    width: 50,
    height: 50,
    marginRight: 20,
    marginLeft: 10,
  },
  listItemTextStyle: {
    fontSize: 16,
    fontWeight: 600,
  },
  listItemLogo: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function MainDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{ paper: classes.drawerClose }}
        >
          <Grid item className={classes.toolbar}>
            <img
              src={logo}
              alt="EMILY Logo"
              style={{ width: "100%" }}
              onClick={handleDrawer}
            />
          </Grid>
          <Divider />
          <Grid container xs={12}>
            <List>
              <ListItem key={1} className={classes.listItemLogo}>
                <img src={logo} alt="Emily Logo" style={{ width: "150px" }} />
              </ListItem>
              <ListItem button key={11}>
                <ListItemIcon>
                  <img
                    src={dashboard}
                    alt="User Dashboard"
                    className={classes.imageIcon}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="p"
                      className={classes.listItemTextStyle}
                    >
                      DASHBOARD
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem button key={2}>
                <ListItemIcon>
                  <img
                    src={report}
                    alt="Reports"
                    className={classes.imageIcon}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="p"
                      className={classes.listItemTextStyle}
                    >
                      REPORTS
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem button key={3}>
                <ListItemIcon>
                  <img
                    src={setting}
                    alt="Settings"
                    className={classes.imageIcon}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="p"
                      className={classes.listItemTextStyle}
                    >
                      SETTINGS
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem button key={4}>
                <ListItemIcon>
                  <img src={user} alt="User" className={classes.imageIcon} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="p"
                      className={classes.listItemTextStyle}
                    >
                      ABDUL HADI
                      <br />
                      <Typography variant="subtitle2">PID: 12345678</Typography>
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem button key={8}>
                <ListItemIcon>
                  <img
                    src={logout}
                    alt="Logout"
                    className={classes.imageIcon}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="p"
                      className={classes.listItemTextStyle}
                    >
                      LOGOUT
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Drawer>
      </Grid>
    </div>
  );
}
