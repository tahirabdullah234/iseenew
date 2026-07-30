import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 700,
    fontSize: 32,
    color: "#fff",
    textShadow: "0 2px 4px rgba(0,0,0,0.12)",
    marginBottom: 8,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: { fontSize: 22 },
  },
}));

export function Notifications() {
  const classes = useStyles();
  return (
    <Typography variant="h5" className={classes.title}>
      Notifications
    </Typography>
  );
}
