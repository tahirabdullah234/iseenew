import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import DoctorCard from "./doctorCard";

import * as apt from "../Services/appointment";
import { useSelector, useDispatch } from "react-redux";

import { setrequesteddoc, setdoctors } from "../pages/statesSlice";

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
  const [req, setreq] = React.useState(false);

  // const [state, setstate] = React.useState({
  //   doctor: null,
  //   requested: null
  // })

  const doctor = useSelector((state) => state.states.doctors)
  const requested = useSelector((state) => state.states.requesteddocs)

  const dispatch = useDispatch();


  React.useEffect(() => {
    apt.get_doctors(token)
      .then(res => {
        const data = res.data
        console.log(data)
        apt.get_requests(token)
          .then(response => {
            if (response.data.success) {
              console.log(response.data)
              dispatch(setdoctors(data))
              dispatch(setrequesteddoc(response.data.data))
              // setstate({ ...state, doctor: data, requested: response.data.data })
            } else {
              dispatch(setdoctors(data))
              dispatch(setrequesteddoc([]))
              // setstate({ ...state, doctor: xdata, requested: [] })
            }
          })
      })
  }, [dispatch, token])

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
          {req ? "REQUESTS STATUS" : "CONSULT A DOCTOR"}
        </Typography>
        <Button
          style={{
            fontSize: "20px",
            selfAlign: "left"
          }}
          className={classes.sameinfont}
          onClick={() => setreq(!req)}
        >
          {!req ? "VIEW REQUEST STATUS" : "CONSULT A DOCTOR"}
        </Button>
        <Grid container className={classes.AllGridsAdjust}>
          {
            doctor ?
              (requested.length | !req) > 0 ?
                doctor.map((item, index) => {
                  if (req) {
                    if (!requested.includes(item._id)) {
                      return;
                    } else
                      return (
                        <Grid item xs={11} md={5} className={classes.appointdocgrid} key={index}>
                          <DoctorCard
                            name={item.userid.fname.toUpperCase() + " " + item.userid.lname.toUpperCase()}
                            id={item._id}
                            requested={true}
                          />
                        </Grid>
                      )
                  }
                  else {
                    if (requested.includes(item._id)) {
                      return;
                    } else
                      return (
                        <Grid item xs={11} md={5} className={classes.appointdocgrid} key={index}>
                          <DoctorCard
                            name={item.userid.fname.toUpperCase() + " " + item.userid.lname.toUpperCase()}
                            id={item._id}
                          />
                        </Grid>
                      )
                  }
                })
                :
                <Grid item xs={11} md={5} className={classes.appointdocgrid}>
                  <Typography variant="body1" className={classes.sameinfont}> No Record Found</Typography>
                </Grid>
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
