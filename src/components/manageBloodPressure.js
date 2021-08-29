import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  DialogBox: {
    width: "100%",
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontWeight: "bold",
    textDecoration: "underline",
    fontSize: "35px",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  DEDialogBox: {
    width: "100%",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "20px",
  },
  DEDial: {
    width: "100%",
    borderRadius: "20px",
    background: "#3585da",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    color: "white",
    marginTop: "10px",
  },
  TDialogbox: {
    width: "100%",
    background: "#fff",
    boxShadow: "(6px 6px 10px rgba(0, 0, 0, 0.16))",
    borderRadius: "12px",
  },
});
export function ManageBP() {
  const classes = useStyles();
  return (
    <div className="dashdiv">
      <Grid container xs={11} className={classes.DialogBox}>
        <Typography className={classes.header}>
          MANAGE BLOOD PRESSURE
        </Typography>
        <Grid container xs={11} md={10} className={classes.DEDialogBox}>
          <Grid item xs={9} sm={4} md={3}>
            <TextField
              label="Diastolic value"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginTop: "10px", width: "100%" }}
            ></TextField>
          </Grid>
          <Grid item xs={9} sm={4} md={3}>
            <TextField
              label="Systolic value"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginTop: "10px", width: "100%" }}
            ></TextField>
          </Grid>
          <Grid item xs={5} sm={2}>
            <Button className={classes.DEDial}>ADD</Button>
          </Grid>
        </Grid>
        <Grid
          container
          xs={11}
          md={10}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid container xs={7}>
            <Typography className={classes.TDialogbox}> Weekly</Typography>
          </Grid>
          <Grid container xs={4}>
            <Typography className={classes.TDialogbox}> Weekly</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
