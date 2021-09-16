import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DoctorCard from "./doctorCard";
// import femaleDoc from '../Assets/doctor-female.png';

const useStyles = makeStyles((theme) => ({
  DialogBox: {
    width: "100%",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
  },
  sameinfont: {
    textDecorationLine: "underline",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  AllGridsAdjust: {
    justifyContent: "space-around",
    height: "70vh",
    overflowY: "scroll",
  },
  appointdocgrid: {
    margin: 10,
  }
}));

export default function ConsultDoctor() {
  const classes = useStyles();

  return (
    <Grid container className="dashdiv1">
      <Grid item xs={12} className={classes.DialogBox}>
        <Typography
          style={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
          className={classes.sameinfont}
        >
          CONSULT A DOCTOR
        </Typography>
        <Typography
          style={{
            textAlign: "end",
            fontSize: "20px",
          }}
          className={classes.sameinfont}
        >
          REQUEST STATUS
        </Typography>
        <Grid container className={classes.AllGridsAdjust}>
          <Grid item xs={11} sm={5} className={classes.appointdocgrid}>
            <DoctorCard />
          </Grid>
          <Grid item xs={11} sm={5} className={classes.appointdocgrid}>
            <DoctorCard />
          </Grid>
          <Grid item xs={11} sm={5} className={classes.appointdocgrid}>
            <DoctorCard />
          </Grid>
          <Grid item xs={11} sm={5} className={classes.appointdocgrid}>
            <DoctorCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
