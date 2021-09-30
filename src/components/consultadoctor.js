import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import DoctorCard from "./doctorCard";

import * as apt from "../Services/appointment";
import { useSelector } from "react-redux";

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
  const token = useSelector((state) => state.states.token);

  const [state, setstate] = React.useState({
    doctor: null
  })

  React.useEffect(() => {
    apt.get_doctors(token)
      .then(res => {
        console.log(res.data)
        setstate({ ...state, doctor: res.data })
      })
  }, [])

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
          {
            state.doctor ?
              state.doctor.map((item, index) => {
                return (
                  <Grid item xs={11} sm={5} className={classes.appointdocgrid}>
                    <DoctorCard />
                  </Grid>
                )
              })
              :
              <CircularProgress
                style={{ marginRight: "20px", width: "103px", height: "101px" }}
              />
          }
        </Grid>
      </Grid>
    </Grid>
  );
}
