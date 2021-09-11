import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const useStyles = makeStyles({
  DialogBox: {
    width: "100%",
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "20px",
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
    marginTop: "13px",
  },
  TDialogbox: {
    width: "900px",
    background: "#fff",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    borderRadius: "12px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "35px",
  },
  GLGDialogbox: {
    width: "100%",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    borderRadius: "12px",

    padding: "10px",
    marginTop: "35px",
  },
  Tablecontentbox: {
    width: "100%",
    borderRadius: "28px",
    background: "linear-gradient(#abd7ec 0%, #88ceea 50.42%, #59c1e8 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "30px",
    padding: "12px",
  },
  TableContentFont: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#fff",
  },
  BPGTitle: {
    fontWeight: "bold",
    fontSize: "23px",
    color: "#3585da",
  },
  DEDialpos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
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
  Gridadjust: {
    display: "flex",
    alignItems: "center",
  },
  GridAdjust: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
function Glucoselevelrecord() {
  const classes = useStyles();
  return (
    <Grid item xs={11} className={classes.Tablecontentbox}>
      <Typography className={classes.TableContentFont}>210</Typography>
      <Typography className={classes.TableContentFont}>mg/dl</Typography>
      <Typography className={classes.TableContentFont}>Fasting</Typography>
      <Typography className={classes.TableContentFont}>10:37:51 PM</Typography>
      <Typography className={classes.TableContentFont}>21/08/2021</Typography>
    </Grid>
  );
}
export function ManageGL() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#3585da",
      },
    },
  });
  const [GLunit, setGLunit] = React.useState("");

  const handleChange = (event) => {
    setGLunit(event.target.value);
  };
  const [value, setValue] = React.useState("female");
  const handleChang = (event) => {
    setValue(event.target.value);
  };
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className="dashdiv">
        <Grid item xs={11} className={classes.DialogBox}>
          <Typography
            style={{ fontSize: "32px" }}
            className={classes.sameinfont}
          >
            MANAGE GLUCOSE LEVEL
          </Typography>
          <Grid item xs={11} md={10} className={classes.DEDialogBox}>
            <Grid container className={classes.DEDialpos}>
              <Grid item xs={9} md={3}>
                <TextField
                  label="GLUCOSE LEVEL"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.Glucoselevel}
                ></TextField>
              </Grid>
              <Grid item xs={9} md={3}>
                <FormControl
                  className={classes.formControl}
                  style={{ marginTop: "16px", width: "100%" }}
                >
                  <Select value={GLunit} onChange={handleChange} displayEmpty>
                    <MenuItem value="">
                      <em>mg/dl</em>
                    </MenuItem>
                    <MenuItem value={10}>mmol/L</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={11} md={3} className={classes.radiopos}>
                <FormControl component="fieldset" className={classes.radiosize}>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChang}
                    className={classes.radiogrp}
                  >
                    <FormControlLabel
                      value="Random"
                      control={<Radio />}
                      label="Random"
                    />
                    <FormControlLabel
                      value="Fasting"
                      control={<Radio />}
                      label="Fasting"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={5} sm={2}>
                <Button className={classes.DEDial}>ADD</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={11} md={10} className={classes.Gridadjust}>
            <Grid container className={classes.GridAdjust}>
              <Grid item xs={12} md={7} className={classes.TDialogbox}>
                <Typography
                  style={{ fontSize: "23px" }}
                  className={classes.sameinfont}
                >
                  GLUCOSE LEVEL TABLE
                </Typography>
                <Glucoselevelrecord />
                <Glucoselevelrecord />
                <Glucoselevelrecord />
                <Glucoselevelrecord />
                <Grid
                  container
                  style={{ marginBottom: "30px", justifyContent: "center" }}
                >
                  <Glucoselevelrecord />
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} className={classes.GLGDialogbox}>
                <Typography className={classes.BPGTitle}>
                  GLUCOSE LEVEL GRAPH
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
