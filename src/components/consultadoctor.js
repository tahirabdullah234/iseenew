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
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 28,
    color: "#1061b0",
  },
  subtitle: {
    fontFamily: "Montserrat",
    fontSize: 18,
    color: "#777",
    marginTop: 4,
    "@media (max-width: 700px)": {
      fontSize: 15,
    },
  },
  toggleWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 24,
  },
  toggleBtn: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 18,
    textTransform: "none",
    borderRadius: 24,
    padding: "8px 24px",
    color: "#666",
    background: "#f0f4f8",
    boxShadow: "none",
    "@media (max-width: 700px)": {
      fontSize: 13,
    },
    "&:hover": {
      background: "#e3ebf2",
    },
  },
  toggleActive: {
    background: "linear-gradient(45deg,#3585da 0%, #59c1e8 100%)",
    color: "#fff",
    boxShadow: "0 3px 10px rgba(53,133,218,0.35)",
    "&:hover": {
      background: "linear-gradient(45deg,#3585da 0%, #59c1e8 100%)",
    },
  },
  AllGridsAdjust: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    height: "78vh",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { width: 5, height: 5 },
    "&::-webkit-scrollbar-track": { background: "transparent" },
    "&::-webkit-scrollbar-thumb": { background: "transparent", borderRadius: 4 },
    "&.scrolling": {
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(53, 133, 218, 0.55) transparent",
      "&::-webkit-scrollbar-thumb": { background: "rgba(53, 133, 218, 0.55)" },
    },
  },
  appointdocgrid: {
    display: "flex",
    justifyContent: "center",
    padding: "16px",
    boxSizing: "border-box",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    minHeight: 260,
  },
  emptyTitle: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 18,
    color: "#3585da",
    marginTop: 12,
  },
  emptyText: {
    fontFamily: "Montserrat",
    fontSize: 18,
    color: "#999",
    marginTop: 4,
    "@media (max-width: 700px)": {
      fontSize: 15,
    },
  },
  loader: {
    width: "100%",
    height: "100%",
    minHeight: 260,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ConsultDoctor() {
  const classes = useStyles();
  const token = useSelector((state) => state.states.token);
  const [req, setreq] = React.useState(false);

  const doctor = useSelector((state) => state.states.doctors)
  const requested = useSelector((state) => state.states.requesteddocs)

  const dispatch = useDispatch();
  const scrollTimer = React.useRef(null);

  const handleScroll = (e) => {
    const el = e.target;
    if (el.classList) {
      el.classList.add('scrolling');
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => el.classList.remove('scrolling'), 400);
    }
  };


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
            } else {
              dispatch(setdoctors(data))
              dispatch(setrequesteddoc([]))
            }
          })
      })
  }, [dispatch, token])

  let filteredDoctors = null
  if (doctor) {
    filteredDoctors = doctor.filter((item) => req ? requested.includes(item._id) : !requested.includes(item._id))
  }

  return (
    <div className="dashdiv">
      <div className={classes.DialogBox}>
        <div className={classes.header}>
          <Typography className={classes.title}>
            {req ? "Request Status" : "Consult a Doctor"}
          </Typography>
          <Typography className={classes.subtitle}>
            {req
              ? "Track the appointment requests you have sent to doctors."
              : "Choose a specialist and send an appointment request."}
          </Typography>
        </div>
        <div className={classes.toggleWrap}>
          <Button
            className={`${classes.toggleBtn} ${!req ? classes.toggleActive : ""}`}
            onClick={() => setreq(false)}
          >
            Find Doctors
          </Button>
          <Button
            className={`${classes.toggleBtn} ${req ? classes.toggleActive : ""}`}
            onClick={() => setreq(true)}
            style={{ marginLeft: 12 }}
          >
            Request Status
          </Button>
        </div>
        <Grid container className={classes.AllGridsAdjust} onScroll={handleScroll}>
          {
            filteredDoctors ?
              filteredDoctors.length > 0 ?
                filteredDoctors.map((item, index) => (
                  <Grid item xs={12} lg={6} xl={4} className={classes.appointdocgrid} key={index}>
                    <DoctorCard
                      name={item.userid.fname.toUpperCase() + " " + item.userid.lname.toUpperCase()}
                      id={item._id}
                      requested={req}
                      photo={item.userid.photo}
                    />
                  </Grid>
                ))
                :
                <div className={classes.emptyState}>
                  <Typography className={classes.emptyTitle}>
                    {req ? "No Requests Yet" : "No Doctors Available"}
                  </Typography>
                  <Typography className={classes.emptyText}>
                    {req
                      ? "Doctors you contact will appear here."
                      : "Please check back again later."}
                  </Typography>
                </div>
              :
              <div className={classes.loader}>
                <CircularProgress
                  style={{ width: "56px", height: "56px", color: "#3585da" }}
                />
              </div>
          }
        </Grid>
      </div>
    </div>
  );
}
