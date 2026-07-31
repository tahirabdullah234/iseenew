import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import PeopleOutline from "@material-ui/icons/PeopleOutline";
import NotificationsNone from "@material-ui/icons/NotificationsNone";
import EventNote from "@material-ui/icons/EventNote";
import Today from "@material-ui/icons/Today";

import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import { setrecivedreq, setappointments } from "../pages/statesSlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from '@material-ui/core/Modal';

import * as apt from "../Services/appointment";
import { getpatientactivity } from "../Services/graphsdata";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  DialogBox: {
    width: "100%",
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 8px 24px rgba(16, 97, 176, 0.08)",
    padding: "20px",
    boxSizing: "border-box",
    minHeight: "calc(100vh - 130px)",
  },
  welcomeBanner: {
    width: "100%",
    borderRadius: 16,
    background: "linear-gradient(135deg, #1061b0 0%, #59c1e8 100%)",
    padding: "28px 32px",
    boxSizing: "border-box",
    marginBottom: 24,
    "@media (max-width: 600px)": {
      padding: "20px 16px",
    },
  },
  welcomeTitle: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 26,
    color: "#fff",
    "@media (max-width: 600px)": {
      fontSize: 20,
    },
  },
  welcomeSubtitle: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },
  panel: {
    width: "100%",
    borderRadius: 16,
    background: "#fff",
    border: "1px solid #eef1f6",
    boxShadow: "0 6px 20px rgba(16, 97, 176, 0.06)",
    padding: "20px",
    boxSizing: "border-box",
    height: "100%",
    maxHeight: 270,
    display: "flex",
    flexDirection: "column",
  },
  panelTitle: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    color: "#3585da",
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  panelBar: {
    display: "inline-block",
    width: 5,
    height: 22,
    borderRadius: 3,
    background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
  },
  statCard: {
    width: "100%",
    borderRadius: 16,
    background: "#fff",
    border: "1px solid #eef1f6",
    boxShadow: "0 6px 20px rgba(16, 97, 176, 0.06)",
    padding: "18px 20px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
    color: "#fff",
    flexShrink: 0,
  },
  statValue: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 24,
    color: "#1061b0",
    lineHeight: 1.1,
  },
  statLabel: {
    fontFamily: "Montserrat",
    fontSize: 13,
    fontWeight: 600,
    color: "#8e9bb0",
    marginTop: 2,
  },
  apptRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderRadius: 10,
    background: "#f7fafd",
    marginBottom: 10,
    gap: 12,
  },
  apptDate: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 14,
    color: "#3585da",
  },
  apptName: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 14,
    color: "#2b3a55",
    textAlign: "right",
  },
  reqRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    borderRadius: 10,
    background: "#f7fafd",
    marginBottom: 10,
  },
  reqName: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 14,
    color: "#2b3a55",
  },
  reqMsg: {
    fontFamily: "Montserrat",
    fontSize: 12,
    color: "#8e9bb0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginTop: 2,
  },
  activityRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "12px 16px",
    borderRadius: 10,
    background: "#f7fafd",
    marginBottom: 10,
  },
  activityName: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 14,
    color: "#2b3a55",
  },
  activityMeta: {
    fontFamily: "Montserrat",
    fontSize: 12,
    fontWeight: 600,
    color: "#3585da",
    textAlign: "right",
  },
  scrollList: {
    flex: 1,
    minHeight: 200,
    overflowY: "auto",
    paddingRight: 4,
    "&::-webkit-scrollbar": { width: 4 },
    "&::-webkit-scrollbar-thumb": { background: "#dbe4ee", borderRadius: 4 },
  },
  appointmentTable: {
    borderCollapse: "separate",
    borderSpacing: "0 4px",
    minWidth: 500,
  },
  appointmentTableContainer: {
    width: "100%",
    flex: 1,
    minHeight: 200,
    overflowY: "auto",
    overflowX: "auto",
    "&::-webkit-scrollbar": { width: 4 },
    "&::-webkit-scrollbar-thumb": { background: "#dbe4ee", borderRadius: 4 },
  },
  appointmentTableHeadRow: {
    "& th": {
      background: "linear-gradient(45deg,#59c1e8 0%, #3585da 100%)",
      color: "#fff",
      fontWeight: "bold",
      fontFamily: "Montserrat",
      fontSize: 16,
      padding: "12px 16px",
      borderBottom: "none",
      textAlign: "center",
    },
    "& th:first-child": {
      borderTopLeftRadius: 28,
      borderBottomLeftRadius: 28,
    },
    "& th:last-child": {
      borderTopRightRadius: 28,
      borderBottomRightRadius: 28,
    },
  },
  appointmentTableBodyRow: {
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
    borderRadius: 8,
    "& td": {
      background: "#fff",
      color: "#444",
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: 15,
      padding: "10px 16px",
      borderBottom: "none",
      textAlign: "center",
    },
    "& td:first-child": {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    "& td:last-child": {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    "&:hover td": {
      background: "#f0f7fc",
    },
  },
  detailsLink: {
    fontFamily: "Montserrat",
    fontSize: 13,
    fontWeight: 700,
    color: "#444",
    cursor: "pointer",
    textAlign: "center",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  acceptBtn: {
    background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
    textTransform: "none",
    borderRadius: 8,
    padding: "6px 14px",
    boxShadow: "0 4px 12px rgba(53, 133, 218, 0.3)",
    "&:hover": {
      background: "linear-gradient(45deg, #2b74c4 0%, #49a9d6 100%)",
    },
  },
  emptyText: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: "#8e9bb0",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    borderRadius: 16,
    background: "#fff",
    padding: "24px",
    boxSizing: "border-box",
    boxShadow: "0 20px 50px rgba(2, 32, 71, 0.3)",
    outline: "none",
  },
  modalTitle: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 20,
    color: "#3585da",
    marginBottom: 20,
  },
  modalField: {
    width: "100%",
    marginBottom: 16,
  },
  modalInput: {
    fontFamily: "Montserrat",
  },
  modalBtn: {
    width: "100%",
    height: 46,
    borderRadius: 10,
    background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: 1,
    textTransform: "none",
    marginTop: 8,
    boxShadow: "0 6px 18px rgba(53, 133, 218, 0.35)",
    "&:hover": {
      background: "linear-gradient(45deg, #2b74c4 0%, #49a9d6 100%)",
    },
  },
});

function AcceptModal({ data, open, onClose, onAccepted }) {
  const classes = useStyles();
  const token = useSelector((state) => state.states.token);
  const dispatch = useDispatch();
  const [date, setdate] = React.useState('');
  const [time, settime] = React.useState('');

  const handleAccept = () => {
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
          apt.get_apponitment(token)
            .then(res => {
              if (res.data.success) {
                const apt_data = res.data.data ? res.data.data : []
                apt.recieved_req(token)
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
    onClose();
    if (onAccepted) onAccepted();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Grid item xs={11} sm={6} md={4}>
        <Card variant="outlined" className={classes.modalCard}>
          <Typography className={classes.modalTitle}>Schedule Appointment</Typography>
          <TextField
            className={classes.modalField}
            label="Appointment Date"
            InputLabelProps={{ shrink: true }}
            InputProps={{ classes: { input: classes.modalInput } }}
            type="date"
            value={date}
            onChange={e => setdate(e.target.value)}
          />
          <TextField
            className={classes.modalField}
            label="Appointment Time"
            InputLabelProps={{ shrink: true }}
            InputProps={{ classes: { input: classes.modalInput } }}
            type="time"
            value={time}
            onChange={e => settime(e.target.value)}
          />
          <Button variant="contained" disableElevation className={classes.modalBtn} onClick={handleAccept}>
            Accept Request
          </Button>
        </Card>
      </Grid>
    </Modal>
  );
}

function PatientRequest({ data, onAccepted }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow className={classes.appointmentTableBodyRow}>
        <TableCell>{data.p_id.slice(0, 10)}</TableCell>
        <TableCell>{data.name}</TableCell>
        <TableCell>
          <Typography
            className={classes.detailsLink}
            onClick={() => history.push({ pathname: '/userinfo', state: { id: data.p_id } })}
          >
            DETAILS
          </Typography>
        </TableCell>
        <TableCell>
          <Button className={classes.acceptBtn} onClick={() => setOpen(true)}>
            ACCEPT
          </Button>
        </TableCell>
      </TableRow>
      <AcceptModal data={data} open={open} onClose={() => setOpen(false)} onAccepted={onAccepted} />
    </React.Fragment>
  );
}

function RecentRequestItem({ data, onAccepted }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.reqRow}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Typography className={classes.reqName}>{data.name}</Typography>
        <Typography className={classes.reqMsg}>{data.msg}</Typography>
      </div>
      <Button className={classes.acceptBtn} onClick={() => setOpen(true)}>
        ACCEPT
      </Button>
      <AcceptModal data={data} open={open} onClose={() => setOpen(false)} onAccepted={onAccepted} />
    </div>
  );
}

function ActivityItem({ data }) {
  const classes = useStyles();
  const parts = [];
  if (data.bp) parts.push("BP " + data.bp.systolic + "/" + data.bp.dystolic);
  if (data.bg) parts.push("BG " + data.bg.value);
  return (
    <div className={classes.activityRow}>
      <Typography className={classes.activityName}>{data.name}</Typography>
      <Typography className={classes.activityMeta}>
        {parts.length > 0 ? parts.join(" • ") : "No readings yet"}
      </Typography>
    </div>
  );
}

function Appointments({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.apptRow}>
      <Typography className={classes.apptDate}>
        {data.date.split('T')[0]} @ {data.time}
      </Typography>
      <Typography className={classes.apptName}>{data.name}</Typography>
    </div>
  );
}

export function DoctorDashboard() {
  const classes = useStyles();
  const name = useSelector((state) => state.states.name)
  const token = useSelector((state) => state.states.token)
  const requests = useSelector((state) => state.states.recieved_requests)
  const appointments = useSelector((state) => state.states.appointments)

  const dispatch = useDispatch()
  const [activity, setActivity] = React.useState(null);
  const [todayAppointments, setTodayAppointments] = React.useState(null);

  const loadActivity = React.useCallback(() => {
    getpatientactivity(token)
      .then(res => {
        if (res.data.success) setActivity(res.data.data || []);
        else setActivity([]);
      })
      .catch(() => setActivity([]));
  }, [token]);

  React.useEffect(() => {
    loadActivity();
    apt.get_today_appointments(token)
      .then(res => {
        if (res.data.success) setTodayAppointments(res.data.data || []);
        else setTodayAppointments([]);
      })
      .catch(() => setTodayAppointments([]));
    apt.get_apponitment(token)
      .then(res => {
        var apt_data = []
        if (res.data.success) {
          // alert(JSON.stringify(res.data))
          apt_data = res.data.data ? res.data.data : []
        }
        apt.recieved_req(token)
          .then(res => {
            if (res.data.success) {
              dispatch(setappointments(apt_data))
              dispatch(setrecivedreq(res.data.requests))
            } else {
              dispatch(setappointments(apt_data))
              dispatch(setrecivedreq([]))
            }
          })

      })
  }, [token, loadActivity])

  const totalPatients = React.useMemo(() => {
    const ids = new Set();
    (requests || []).forEach(r => ids.add(String(r.p_id)));
    (appointments || []).forEach(a => ids.add(String(a.p_id)));
    return ids.size;
  }, [requests, appointments]);

  const todaysAppointments = todayAppointments ? todayAppointments.length : 0;

  const todaysList = (todayAppointments || [])
    .sort((a, b) => String(a.time).localeCompare(String(b.time)));

  const pendingRequests = requests ? requests.length : 0;
  const upcomingAppointments = appointments ? appointments.length : 0;

  return (
    <div className="dashdiv">
      <Grid container className={classes.DialogBox}>
        <div className={classes.welcomeBanner}>
          <Typography className={classes.welcomeTitle}>
            WELCOME, Dr. {name}
          </Typography>
          <Typography className={classes.welcomeSubtitle}>
            Here's what's happening with your patients today.
          </Typography>
        </div>
        <Grid container spacing={3} style={{ marginBottom: 24 }}>
          <Grid item md={3} sm={6} xs={12}>
            <div className={classes.statCard}>
              <div className={classes.statIcon}>
                <PeopleOutline fontSize="large" />
              </div>
              <div>
                <Typography className={classes.statValue}>{totalPatients}</Typography>
                <Typography className={classes.statLabel}>Total Patients</Typography>
              </div>
            </div>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <div className={classes.statCard}>
              <div className={classes.statIcon}>
                <NotificationsNone fontSize="large" />
              </div>
              <div>
                <Typography className={classes.statValue}>{pendingRequests}</Typography>
                <Typography className={classes.statLabel}>Pending Requests</Typography>
              </div>
            </div>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <div className={classes.statCard}>
              <div className={classes.statIcon}>
                <EventNote fontSize="large" />
              </div>
              <div>
                <Typography className={classes.statValue}>{upcomingAppointments}</Typography>
                <Typography className={classes.statLabel}>Upcoming Appointments</Typography>
              </div>
            </div>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <div className={classes.statCard}>
              <div className={classes.statIcon}>
                <Today fontSize="large" />
              </div>
              <div>
                <Typography className={classes.statValue}>{todaysAppointments}</Typography>
                <Typography className={classes.statLabel}>Today's Appointments</Typography>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ marginBottom: 24 }}>
          <Grid item md={4} sm={12} xs={12}>
            <div className={classes.panel}>
              <Typography className={classes.panelTitle}>
                <span className={classes.panelBar} />
                TODAY'S SCHEDULE
              </Typography>
              <div className={classes.scrollList}>
                {
                  todaysList.length > 0 ?
                    todaysList.map((item) => {
                      return (
                        <div className={classes.apptRow} key={item._id || item.date}>
                          <Typography className={classes.apptDate}>{item.time}</Typography>
                          <Typography className={classes.apptName}>{item.name}</Typography>
                        </div>
                      )
                    })
                    :
                    (todayAppointments && todayAppointments.length === 0) ?
                      <Typography className={classes.emptyText}>
                        No Appointments Today
                      </Typography>
                      :
                      <div className={classes.loader}>
                        <CircularProgress
                          style={{ width: "50px", height: "50px", color: "#3585da" }}
                        />
                      </div>
                }
              </div>
            </div>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <div className={classes.panel}>
              <Typography className={classes.panelTitle}>
                <span className={classes.panelBar} />
                RECENT REQUESTS
              </Typography>
              <div className={classes.scrollList}>
                {
                  requests && requests.length > 0 ?
                    requests.slice(0, 4).map((item) => {
                      return (
                        <RecentRequestItem data={item} key={item._id} onAccepted={loadActivity} />
                      )
                    })
                    :
                    (requests && requests.length === 0) ?
                      <Typography className={classes.emptyText}>
                        No Pending Requests
                      </Typography>
                      :
                      <div className={classes.loader}>
                        <CircularProgress
                          style={{ width: "50px", height: "50px", color: "#3585da" }}
                        />
                      </div>
                }
              </div>
            </div>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <div className={classes.panel}>
              <Typography className={classes.panelTitle}>
                <span className={classes.panelBar} />
                PATIENT ACTIVITY
              </Typography>
              <div className={classes.scrollList}>
                {
                  activity && activity.length > 0 ?
                    activity.map((item) => {
                      return (
                        <ActivityItem data={item} key={item.patient} />
                      )
                    })
                    :
                    (activity && activity.length === 0) ?
                      <Typography className={classes.emptyText}>
                        No Patient Activity
                      </Typography>
                      :
                      <div className={classes.loader}>
                        <CircularProgress
                          style={{ width: "50px", height: "50px", color: "#3585da" }}
                        />
                      </div>
                }
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={5} xs={12}>
            <div className={classes.panel}>
              <Typography className={classes.panelTitle}>
                <span className={classes.panelBar} />
                UPCOMING APPOINTMENTS
              </Typography>
              <div className={classes.scrollList}>
                {
                  appointments && appointments.length > 0 ?
                    appointments.map((item) => {
                      return (
                        <Appointments data={item} key={item._id || item.date} />
                      )
                    })
                    :
                    (appointments && appointments.length === 0) ?
                      <Typography className={classes.emptyText}>
                        No Upcoming Appointments
                      </Typography>
                      :
                      <div className={classes.loader}>
                        <CircularProgress
                          style={{ width: "50px", height: "50px", color: "#3585da" }}
                        />
                      </div>
                }
              </div>
            </div>
          </Grid>
          <Grid item md={7} xs={12}>
            <div className={classes.panel}>
              <Typography className={classes.panelTitle}>
                <span className={classes.panelBar} />
                APPOINTMENT REQUESTS
              </Typography>
              <TableContainer className={classes.appointmentTableContainer}>
                <Table className={classes.appointmentTable}>
                  <TableHead>
                    <TableRow className={classes.appointmentTableHeadRow}>
                      <TableCell>ID</TableCell>
                      <TableCell>PATIENT NAME</TableCell>
                      <TableCell>DETAILS</TableCell>
                      <TableCell>ACTION</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      requests && requests.length > 0 ?
                        requests.map((item) => {
                          return (
                            <PatientRequest data={item} key={item._id} onAccepted={loadActivity} />
                          )
                        })
                        :
                        (requests && requests.length === 0) ?
                          <TableRow>
                            <TableCell colSpan={4} align="center" style={{ border: "none", background: "transparent" }}>
                              <Typography className={classes.emptyText}>
                                No Pending Requests
                              </Typography>
                            </TableCell>
                          </TableRow>
                          :
                          <TableRow>
                            <TableCell colSpan={4} align="center" style={{ border: "none", background: "transparent" }}>
                              <div className={classes.loader}>
                                <CircularProgress
                                  style={{ width: "50px", height: "50px", color: "#3585da" }}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div >
  );
}
