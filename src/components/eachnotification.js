import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Bellicon from "../Assets/bell.svg";
import { Typography } from "@material-ui/core";
export function Each({ data }) {
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
            alt="Notification Bell"
          ></img>
        </div>
      </Grid>
      {
        data ?

          <Typography className={classes.NotificationsFont}>
            Upcoming Appointment @ {" " + data.date.split('T')[0] + " " + data.time}.
          </Typography>
          :
          <Typography className={classes.NotificationsFont}>
            No New Notifications.
          </Typography>
      }
    </div>
  );
}
