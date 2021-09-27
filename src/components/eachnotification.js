import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Bellicon from "../Assets/bell.svg";
import { Typography } from "@material-ui/core";
export function Each() {
  const useStyles = makeStyles({
    NotificationsFont: {
      color: "#fff",
    },
    BellIcon: {
      width: "50%",
      justifyContent: "flex-start",
    },
    notifications: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.notifications}>
      <Grid item xs={2} md={1}>
        <div className="logoDiv">
          <img
            src={Bellicon}
            className={classes.BellIcon}
            alt="error found"
          ></img>
        </div>
      </Grid>
      <Typography className={classes.NotificationsFont}>
        10:25 AM : Your last reports are ready.
      </Typography>
      <Typography
        className={classes.NotificationsFont}
        style={{ textDecorationLine: "underline" }}
      >
        Dismiss
      </Typography>
    </div>
  );
}
