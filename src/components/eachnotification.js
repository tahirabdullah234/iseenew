import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Bellicon from "../Assets/bell.svg";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles({
  text: {
    color: "#fff",
    fontSize: 22,
    lineHeight: 1.4,
  },
  icon: {
    width: 28,
    height: 28,
    filter: "brightness(0) invert(1)",
    opacity: 0.85,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
    padding: "4px 0",
  },
  emptyText: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 22,
    fontStyle: "italic",
  },
});

export function Each({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.row}>
      <img src={Bellicon} className={classes.icon} alt="Bell" />
      {data ? (
        <Typography className={classes.text}>
          Upcoming Appointment @ {data.date.split('T')[0]} {data.time}.
        </Typography>
      ) : (
        <Typography className={classes.emptyText}>
          No New Notifications.
        </Typography>
      )}
    </div>
  );
}
