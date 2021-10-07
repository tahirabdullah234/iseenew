import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
export function Notifications() {
  const useStyles = makeStyles({
    sameinfont: {
      fontWeight: "bold",
      color: "#fff",
      textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
      textAlign: "start",
    },
  });
  const classes = useStyles();
  return (
    <div>
      <Typography
        variant="h4"
        style={{ marginBottom: "10px" }}
        className={classes.sameinfont}
      >
        Notifications
      </Typography>
    </div>
  );
}
