import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Messageicon from "../Assets/messageIcon.svg";
export function Message() {
  const useStyles = makeStyles({
    messageBox: {
      display: "flex",
      alignItems: "center",
    },
    msgimg: {
      width: "100%",
      height: "28px",
      display: "flex",
    },
    messageDisplay: {
      width: "100%",
      borderRadius: "10px",
      background: "#fff",
      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
      padding: "5px",
      display: "flex",
    },
    msg: {
      fontWeight: "bold",
      fontSize: "19px",
      textAlign: "start",
      color: "#3585da",
      textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    },
    readnow: {
      fontWeight: "bold",
      fontSize: "13px",
      textAlign: "end",
      color: "#3585da",
      textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
      textDecorationLine: "underline",
    },
  });
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      style={{ marginTop: "10px" }}
      className={classes.messageDisplay}
    >
      <Grid container>
        <Grid item xs={2} md={1}>
          <img
            src={Messageicon}
            className={classes.msgimg}
            alt="error occured"
          />
        </Grid>
        <Grid item xs={10} md={6}>
          <Typography className={classes.msg}>A.ASLAM:</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography className={classes.msg}>Please review ...</Typography>
        </Grid>
        <Grid container direction="row-reverse">
          <Typography className={classes.readnow}>READ NOW</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
