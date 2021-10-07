import React from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

import Drawer from "../components/drawer";
import ReportTemplate from "../components/report_template";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg,#f9f9f9 0%, #e8e8e8 100%)",
  },
  rightgrid: {
    margin: "auto",
  },
  button: {
    width: "95%",
    background: "#003C72",
    marginBottom: 10,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  }
}));

export default function Result() {
  const classes = useStyles();
  const history = useHistory()
  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}>
        <Drawer />
      </Grid>
      <Grid item xs={8} className={classes.rightgrid}>
        <Grid container>
          <Grid item xs={2}>
            <Button
              variant="container"
              startIcon={<ArrowBackIcon />}
              className={classes.button}
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="container"
              startIcon={<SaveIcon />}
              className={classes.button}
            >
              Save Report
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <ReportTemplate />
        </Grid>
      </Grid>
    </Grid>
  );
}
