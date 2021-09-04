import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import maleDoc from "../Assets/doctor_logo.svg";
// import femaleDoc from '../Assets/doctor-female.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#fff",
  },
  docIcon: {
    width: 70,
    height: 70,
    position: "absolute",
  },
  textBackground: {
    // background: "linear-gradient(180deg, #fff 1%, rgba(128,128,128,0.1) 20%)",
    backgroundColor: "rgba(128,128,128,0.09)",
    padding: 10,
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
  },
  innerGrid: {
    flexDirection: "row",
    marginLeft: 60,
  },
  infoGrid: {
    flexDirection: "column",
    marginTop: "10px",
    marginBottom: "20px",
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  drDesc: {
    bottom: 35,
  },
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
  inbutton: {
    borderRadius: "12px",
    background: "#3585da",
    boxshadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    color: "#fff",
  },
  Profiletxt: {
    fontWeight: "bold",
    textAlign: "left",
    color: "#1061b0",
  },
  AllGridsAdjust: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  marginbox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

export default function DoctorCard() {
  const classes = useStyles();

  return (
    <Grid container className="dashdiv1">
      <Grid item md={10} sm={11} className={classes.DialogBox}>
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
          <Grid item sm={5} className={classes.marginbox}>
            <Grid>
              <Avatar
                src={maleDoc}
                alt="Male Doctor Avatar"
                className={classes.docIcon}
              />
            </Grid>
            <Grid item className={classes.textBackground}>
              <Grid item className={classes.innerGrid}>
                <Typography
                  variant="body1"
                  display="block"
                  className={classes.Profiletxt}
                >
                  DR FAISAL JAWED
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  className={classes.Profiletxt}
                >
                  Senior Doctor
                </Typography>
              </Grid>
              <Grid container className={classes.infoGrid}>
                <Typography
                  variant="body2"
                  align="left"
                  className={classes.Profiletxt}
                  style={{ marginBottom: "10px" }}
                >
                  MBBS, MRCCGO
                </Typography>
                <Typography variant="body2" className={classes.Profiletxt}>
                  10 YEARS of experience in treating disease related to
                  opthamology
                </Typography>
              </Grid>
              <Grid container className={classes.button}>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.inbutton}
                >
                  APPOINT DOCTOR
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={5} className={classes.marginbox}>
            <Grid>
              <Avatar
                src={maleDoc}
                alt="Male Doctor Avatar"
                className={classes.docIcon}
              />
            </Grid>
            <Grid item className={classes.textBackground}>
              <Grid item className={classes.innerGrid}>
                <Typography
                  variant="body1"
                  display="block"
                  className={classes.Profiletxt}
                >
                  DR FAISAL JAWED
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  className={classes.Profiletxt}
                >
                  Senior Doctor
                </Typography>
              </Grid>
              <Grid container className={classes.infoGrid}>
                <Typography
                  variant="body2"
                  align="left"
                  className={classes.Profiletxt}
                  style={{ marginBottom: "10px" }}
                >
                  MBBS, MRCCGO
                </Typography>
                <Typography variant="body2" className={classes.Profiletxt}>
                  10 YEARS of experience in treating disease related to
                  opthamology
                </Typography>
              </Grid>
              <Grid container className={classes.button}>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.inbutton}
                >
                  APPOINT DOCTOR
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={5} className={classes.marginbox}>
            <Grid>
              <Avatar
                src={maleDoc}
                alt="Male Doctor Avatar"
                className={classes.docIcon}
              />
            </Grid>
            <Grid item className={classes.textBackground}>
              <Grid item className={classes.innerGrid}>
                <Typography
                  variant="body1"
                  display="block"
                  className={classes.Profiletxt}
                >
                  DR FAISAL JAWED
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  className={classes.Profiletxt}
                >
                  Senior Doctor
                </Typography>
              </Grid>
              <Grid container className={classes.infoGrid}>
                <Typography
                  variant="body2"
                  align="left"
                  className={classes.Profiletxt}
                  style={{ marginBottom: "10px" }}
                >
                  MBBS, MRCCGO
                </Typography>
                <Typography variant="body2" className={classes.Profiletxt}>
                  10 YEARS of experience in treating disease related to
                  opthamology
                </Typography>
              </Grid>
              <Grid container className={classes.button}>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.inbutton}
                >
                  APPOINT DOCTOR
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={5} className={classes.marginbox}>
            <Grid>
              <Avatar
                src={maleDoc}
                alt="Male Doctor Avatar"
                className={classes.docIcon}
              />
            </Grid>
            <Grid item className={classes.textBackground}>
              <Grid item className={classes.innerGrid}>
                <Typography
                  variant="body1"
                  display="block"
                  className={classes.Profiletxt}
                >
                  DR FAISAL JAWED
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  className={classes.Profiletxt}
                >
                  Senior Doctor
                </Typography>
              </Grid>
              <Grid container className={classes.infoGrid}>
                <Typography
                  variant="body2"
                  align="left"
                  className={classes.Profiletxt}
                  style={{ marginBottom: "10px" }}
                >
                  MBBS, MRCCGO
                </Typography>
                <Typography variant="body2" className={classes.Profiletxt}>
                  10 YEARS of experience in treating disease related to
                  opthamology
                </Typography>
              </Grid>
              <Grid container className={classes.button}>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.inbutton}
                >
                  APPOINT DOCTOR
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
