import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
const useStyles = makeStyles({
  DialogBox: {
    width: "100%",
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sameinfont: {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  DEDialogBox: {
    width: "100%",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    padding: "20px",
    marginTop: "10px",
  },
  DEDial: {
    width: "100%",
    borderRadius: "20px",
    background: "#3585da",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    color: "white",
    marginTop: "10px",
  },
  Glucoselevel: { width: "100%" },
  radiopos: {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
  },
  radiosize: {
    marginTop: "16px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  radiogrp: { display: "flex", flexDirection: "row" },
  DEDialpos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export function UserSettings() {
  const [value, setValue] = React.useState("female");
  const handleChang = (event) => {
    setValue(event.target.value);
  };
  const classes = useStyles();
  return (
    <div className="dashdiv">
      <Grid item xs={11} className={classes.DialogBox}>
        <Typography style={{ fontSize: "30px" }} className={classes.sameinfont}>
          REPORTS
        </Typography>
        <Grid item xs={12} className={classes.DEDialogBox}>
          <Grid container className={classes.DEDialpos}>
            <Grid item xs={11} md={2} style={{ marginTop: "5px" }}>
              <TextField
                label="First Name"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.Glucoselevel}
              ></TextField>
            </Grid>
            <Grid item xs={11} md={2} style={{ marginTop: "5px" }}>
              <TextField
                label="Last Name"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.Glucoselevel}
              ></TextField>
            </Grid>
            <Grid item xs={11} md={2} style={{ marginTop: "5px" }}>
              <TextField
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.Glucoselevel}
              ></TextField>
            </Grid>
            <Grid item xs={11} md={3} className={classes.radiopos}>
              <FormControl component="fieldset" className={classes.radiosize}>
                <FormLabel component="legend" style={{ fontSize: "12px" }}>
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={handleChang}
                  className={classes.radiogrp}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Button className={classes.DEDial}>UPDATE</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: "50px" }}>
          <Typography
            style={{ fontSize: "28px" }}
            className={classes.sameinfont}
          >
            CHANGE EMAIL
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.DEDialogBox}>
          <Grid container className={classes.DEDialpos}>
            <Grid item xs={11} md={5} style={{ marginTop: "5px" }}>
              <TextField
                label="Email Address"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.Glucoselevel}
              ></TextField>
            </Grid>
            <Grid item xs={11} md={4} style={{ marginTop: "5px" }}>
              <TextField
                label="Confirm Email Address"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.Glucoselevel}
              ></TextField>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Button className={classes.DEDial}>UPDATE</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: "50px" }}>
          <Typography
            style={{ fontSize: "28px" }}
            className={classes.sameinfont}
          >
            CHANGE PASSWORD
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.DEDialogBox}>
          <Grid container className={classes.DEDialpos}>
            <Grid item xs={11} md={3} style={{ marginTop: "5px" }}>
              <TextField
                label="New Password"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.Glucoselevel}
              ></TextField>
            </Grid>
            <Grid item xs={11} md={3} style={{ marginTop: "5px" }}>
              <TextField
                label="Previous Password"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.Glucoselevel}
              ></TextField>
            </Grid>
            <Grid item xs={11} md={3} style={{ marginTop: "5px" }}>
              <TextField
                label="Confirm New Password"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.Glucoselevel}
              ></TextField>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Button className={classes.DEDial}>UPDATE</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
