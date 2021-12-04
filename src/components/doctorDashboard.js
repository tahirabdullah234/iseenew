import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import { setrecivedreq, setappointments } from "../pages/statesSlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from '@material-ui/core/Modal';

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
  card_root: {
    flexGrow: 1,
    background: '#fff',
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
  textfield: {
    display: "flex",
    width: "80%",
    color: "black",
    margin: "auto",
    "&:hover": {
      color: "white",
    },
    fontFamily: "Montserrat",
    marginTop: 10,
    marginBottom: 10,
  },
  font: {
    fontFamily: "Montserrat",
  },
});

function PatientRequest({ data }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [date, setdate] = React.useState('');
  const [time, settime] = React.useState('');
  const token = useSelector((state) => state.states.token);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAccept = () => {
    const new_data = {
      p_id: data.p_id,
      d_id: data.d_id,
      date: date,
      time: time,
      name: data.name,
    }
    apt.accept_req(token, new_data)
      .then(res => {
        if (res.data.success) {
          apt.get_apponitment(token, data.d_id)
            .then(res => {
              if (res.data.success) {
                console.log(res.data)
                const apt_data = res.data.data ? res.data.data : []
                apt.get_requests(token)
                  .then(res => {
                    if (res.data.success) {
                      dispatch(setappointments(apt_data))
                      dispatch(setrecivedreq(res.data.requests))
                    } else {
                      dispatch(setrecivedreq([]))
                    }
                  })
              }
            })
        }
      })
  }

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
        <Grid item xs={8} sm={2}
          className={classes.TableContentFont}
          style={{ cursor: "pointer" }}
          onClick={handleOpen}
        >
          <Typography>ACCEPT</Typography>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Grid item xs={10} sm={5} style={{ margin: "auto", marginTop: "15%" }}>
          <Card variant="outlined" className={classes.cardroot}>
            <Grid container>
              <TextField
                className={classes.textfield}
                label="Appointment Date"
                id="Appointment Date"
                InputLabelProps={{
                  className: classes.font,
                  shrink: true,
                }}
                inputProps={{
                  className: classes.font
                }}
                type="date"
                name="Appointment Date"
                value={date}
                onChange={e => setdate(e.target.value)}
              />
            </Grid>
            <Grid container>
              <TextField
                className={classes.textfield}
                label="Appointment Time"
                id="Appointment Date"
                InputLabelProps={{
                  className: classes.font,
                  shrink: true,
                }}
                inputProps={{
                  className: classes.font
                }}
                type="time"
                name="Appointment Date"
                value={time}
                onChange={e => settime(e.target.value)}
              />
            </Grid>
            <Grid container>
              <Button onClick={onAccept}>Accept Request</Button>
            </Grid>
          </Card>
        </Grid>
      </Modal>
    </Grid >
  );
}

function Appointments({ data }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.AppAdjust1}>
      <Grid item xs={6} className={classes.Apptxt}>
        <Typography className={classes.sameinfont1}>
          {data.date.split('T')[0] + " " + data.time}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className={classes.sameinfont1}>{data.name}</Typography>
      </Grid>
    </Grid>
  );
}

export function DoctorDashboard() {
  const classes = useStyles();
  const name = useSelector((state) => state.states.name)
  const token = useSelector((state) => state.states.token)
  const requests = useSelector((state) => state.states.recieved_requests)
  const appointments = useSelector((state) => state.states.appointments)

  const dispatch = useDispatch()
  React.useEffect(() => {
    apt.get_apponitment(token)
      .then(res => {
        if (res.data.success) {
          // alert(JSON.stringify(res.data))
          const apt_data = res.data.data ? res.data.data : []
          dispatch(setappointments(apt_data))
          apt.get_requests(token)
            .then(res => {
              if (res.data.success) {
                dispatch(setrecivedreq(res.data.requests))
              } else {
                dispatch(setrecivedreq([]))
              }
            })
        }
      })
  }, [token])
  return (
    <div className="dashdiv">
      <Grid container className={classes.DialogBox} style={{ padding: "15px" }}>
        <Typography style={{ fontSize: "30px", testAlign: "center", width: "100%" }} className={classes.sameinfont1}>
          WELCOME, Dr. {name}
        </Typography>
        <Grid container className={classes.AllGridsAdjust}>
          <Grid
            item
            md={5}
            xs={11}
            style={{ marginTop: "10px", padding: "10px" }}
            className={classes.DialogBox}
          >
            <Typography
              style={{ fontSize: "26px" }}
              className={classes.sameinfont}
            >
              UPCOMING APPOINTMENTS
            </Typography>
            <Grid
              item
              className={classes.AppAdjust}
              style={{ height: "40vh", overflowY: "scroll" }}
            >
              {
                appointments && appointments.length > 0 ?
                  appointments.map((item) => {
                    return (
                      <Grid container style={{ marginTop: "20px", margin: "auto" }}>
                        <Appointments data={item} />
                      </Grid>
                    )
                  })
                  :
                  (appointments && appointments.length === 0) ?
                    <Grid container className={classes.AppAdjust1}>
                      <Grid item xs={6} className={classes.Apptxt}>
                        <Typography className={classes.sameinfont1}>
                          No Upcoming Appointments
                        </Typography>
                      </Grid>
                    </Grid>
                    :
                    <CircularProgress
                      style={{ width: "50px", height: "50px", margin: "auto" }}
                    />
              }
            </Grid>
          </Grid>
          <Grid
            item
            md={6}
            xs={11}
            className={classes.DialogBox}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "20px",
              padding: "10px"
            }}
          >
            <Typography
              style={{ fontSize: "26px" }}
              className={classes.sameinfont}
            >
              APPOINTMENT REQUESTS
            </Typography>
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
              style={{ height: "40vh", overflowY: "scroll" }}
            >
              {
                requests && requests.length > 0 ?
                  requests.map((item) => {
                    return (
                      <Grid item xs={11} style={{ margin: "auto" }}>
                        <PatientRequest data={item} key={item._id} />
                      </Grid>
                    )
                  })
                  :
                  (requests && requests.length === 0) ?
                    <Grid item xs={11} className={classes.Tablecontentbox} style={{ margin: "auto" }}>
                      <Grid container className={classes.TableContentFont}>
                        <Typography variant="h6" align="center">No Pending Requests</Typography>
                      </Grid>
                    </Grid>
                    :
                    <CircularProgress
                      style={{ width: "50px", height: "50px", margin: "auto" }}
                    />

              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div >
  );
}
