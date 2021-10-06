import React from "react";
import "./style.css";
import iseelogo from "../Assets/logofilled.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
export function Header() {
  const useStyles = makeStyles({
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });
  const classes = useStyles();
  return (
    <div>
      <AppBar color="inherit">
        <Toolbar>
          <Grid container className={classes.header}>
            <Grid item xs={3} sm={2} md={1}>
              <div className="logoDiv">
                <img src={iseelogo} alt="isee logo" className="logo" />
              </div>
            </Grid>
            <Grid item xs={12} sm={10} md={11}>
              <div className="logoTextDiv">
                <p className="logoTextSlash">|</p>
                <p className="logoText">Diabetic Retinopathy Detection System</p>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
