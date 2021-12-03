import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Notifications } from "./Notification";
import { Each } from "./eachnotification";
import { Message } from "./message";

import { setrecivedreq, setappointment } from "../pages/statesSlice";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as apt from "../Services/appointment";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  DialogBox: {
    width: "100%",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  bloodpressuretableitem: {
    margin: "auto",
  },
  DashboardHead: {
    width: "100%",
    borderRadius: "12px",
    background: "linear-gradient(#3585da 0%, #59c1e8 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
  },
  sameinfont: {
    fontWeight: "bold",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  sameinfont1: { color: "#1061B0", fontWeight: "bold", fontSize: "19px" },
  sameinfont2: {
    color: "#1061B0",
    fontSize: "19px",
    textDecorationLine: "underline",
  },
  sameinfont3: {
    fontWeight: "bold",
    color: "#fff",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    textAlign: "start",
  },
  NotificationsFont: {
    fontSize: "15px",
    color: "#fff",
  },
  BellIcon: {
    width: "50%",
    justifyContent: "flex-start",
  },
  notifications: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1px",
  },
  Tablecontentbox: {
    width: "100%",
    borderRadius: "10px",
    background: "linear-gradient(45deg,#59c1e8 0%, #59c1e8 100%)",
    filter: "drop-shadow(6px 6px 10px rgba(0, 0, 0, 0.16))",
    display: "flex",
    marginTop: "30px",
    padding: "10px",
  },
  Reportheader: {
    width: "100%",
    borderRadius: "12px",
    background: "linear-gradient(45deg,#59c1e8 0%, #3585da 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    display: "flex",
    marginTop: "30px",
    padding: "10px",
  },
  TableContentFont: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#fff",
    textAlign: "start",
  },
  appmsg: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  },
  fonttxt: {
    fontWeight: "bold",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  messageDisplay: {
    width: "100%",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "5px",
  },
  AllGridsAdjust: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  AppAdjust: {
    display: "flex",
    flexDirection: "column",
  },
  AppAdjust1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  Apptxt: { display: "flex", textAlign: "start" },
});

function PatientRequest({ data }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid item xs={12} className={classes.Tablecontentbox}>
      <Grid container>
        <Grid item xs={4} sm={3} className={classes.TableContentFont}>
          <Typography>{data.p_id.slice(0, 10)}</Typography>
        </Grid>
        <Grid item xs={5} sm={4} className={classes.TableContentFont}>
          <Typography>{data.name}</Typography>
        </Grid>
        <Grid item xs={4} sm={2}
          className={classes.TableContentFont}
          style={{ cursor: "pointer" }}
          onClick={() => history.push({ pathname: '/userinfo', state: { id: data.p_id } })}
        >
          <Typography>DETAILS</Typography>
        </Grid>
        <Grid item xs={8} sm={2} className={classes.TableContentFont} style={{ cursor: "pointer" }}>
          <Typography>ACCEPT</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

function Appointments() {
  const classes = useStyles();
  return (
    <Grid container className={classes.AppAdjust1}>
      <Grid item xs={4} className={classes.Apptxt}>
        <Typography className={classes.sameinfont1}>
          AUG 22 2021 3:15 PM
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={classes.sameinfont1}>ALEEM KHAN</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={classes.sameinfont2}>MEETING LINK</Typography>
      </Grid>
    </Grid>
  );
}

export function DoctorDashboard() {
  const classes = useStyles();
  const name = useSelector((state) => state.states.name)
  const token = useSelector((state) => state.states.token)
  const requests = useSelector((state) => state.states.recieved_requests)

  const dispatch = useDispatch()
  React.useEffect(() => {
    apt.recieved_req(token)
      .then(res => {
        // const requests = res.data.requests
        if (res.data.success) {
          apt.get_apponitment(token)
          dispatch(setrecivedreq(res.data.requests))
        } else {
          dispatch(setrecivedreq(['No Requests Found']))
        }
      })
  }, [token])
  return (
    <div className="dashdiv">
      <Typography style={{ fontSize: "30px" }} className={classes.sameinfont1}>
        WELCOME, {name}
      </Typography>
      <Grid container className={classes.AllGridsAdjust}>
        <Grid
          item
          md={7}
          xs={11}
          style={{ marginTop: "10px", padding: "10px" }}
          className={classes.DialogBox}
        >
          <Typography
            style={{ fontSize: "26px" }}
            className={classes.sameinfont}
          >
            APPOINTMENTS
          </Typography>
          <Grid
            item
            className={classes.AppAdjust}
            style={{ height: "40vh", overflowY: "scroll" }}
          >
            <Grid container style={{ marginTop: "10px" }}>
              <Appointments />
            </Grid>
            <Grid container style={{ marginTop: "20px" }}>
              <Appointments />
            </Grid>
            <Grid container style={{ marginTop: "20px" }}>
              <Appointments />
            </Grid>
            <Grid container style={{ marginTop: "20px" }}>
              <Appointments />
            </Grid>
            <Grid container style={{ marginTop: "20px" }}>
              <Appointments />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={4}
          xs={11}
          style={{ marginTop: "10px", padding: "10px" }}
          className={classes.DashboardHead}
        >
          <Notifications />
          <Grid
            container
            style={{ height: "40vh", overflowY: "scroll" }}
          >
            <Each />
            <Each />
            <Each />
            <Each />
          </Grid>
        </Grid>
        <Grid
          item
          md={7}
          xs={11}
          className={classes.DialogBox}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <Grid item xs={11} className={classes.Reportheader}>
            <Grid container>
              <Grid item xs={4} sm={3} className={classes.TableContentFont}>
                <Typography>ID</Typography>
              </Grid>
              <Grid item xs={5} sm={4} className={classes.TableContentFont}>
                <Typography>PATIENT NAME</Typography>
              </Grid>
              <Grid item xs={4} sm={2} className={classes.TableContentFont}>
                <Typography>DETAILS</Typography>
              </Grid>
              <Grid item xs={8} sm={2} className={classes.TableContentFont}>
                <Typography>ACTION</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            style={{ marginBottom: "10px", height: "40vh", overflowY: "scroll" }}
          >
            {
              requests ?
                requests.map((item) => {
                  return (
                    <Grid item xs={11} style={{ margin: "auto" }}>
                      <PatientRequest data={item} key={item._id} />
                    </Grid>
                  )
                })
                :
                (requests && requests.length === 0) ?
                  <Typography vairant='body1'>No Pending Requests</Typography>
                  :
                  <CircularProgress
                    style={{ marginRight: "20px", width: "100px", height: "100px", margin: "auto" }}
                  />

            }
          </Grid>
        </Grid>
        <Grid
          item
          md={4}
          xs={11}
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "15px",
          }}
          className={classes.DialogBox}
        >
          <Typography
            style={{ fontSize: "23px", textAlign: "center" }}
            className={classes.fonttxt}
          >
            MESSAGES
          </Typography>
          <Grid
            container
            style={{ marginBottom: "10px", justifyContent: "center", height: "40vh", overflowY: "scroll" }}
          >
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
