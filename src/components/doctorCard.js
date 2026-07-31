import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import CancelIcon from "@material-ui/icons/Cancel";

import maleDoc from "../Assets/doctor_logo.svg";
import photo1 from "../Assets/user1-photo.png";
import photo2 from "../Assets/user2-photo.png";
import photo3 from "../Assets/user3-photo.png";
import photo4 from "../Assets/user4-photo.png";
import photo5 from "../Assets/user5-photo.png";
import Appoint from "./doctorAppoint";

import * as apt from "../Services/appointment";

import { useSelector, useDispatch } from "react-redux";

import { setrequesteddoc, setdoctors } from "../pages/statesSlice";

const userPhotos = [null, photo1, photo2, photo3, photo4, photo5];


const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 4px 16px rgba(16,97,176,0.12)",
    border: "1px solid #eef2f6",
    display: "flex",
    flexDirection: "column",
  },
  banner: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "20px 20px",
    background: "linear-gradient(45deg,#1061b0 0%, #4eb2df 100%)",
    color: "#fff",
  },
  docIcon: {
    width: 64,
    height: 64,
    background: "rgba(255,255,255,0.2)",
    border: "2px solid rgba(255,255,255,0.6)",
    fontSize: 24,
  },
  docName: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    color: "#fff",
    lineHeight: 1.3,
    "@media (max-width: 700px)": {
      fontSize: 16,
    },
  },
  docRole: {
    fontFamily: "Montserrat",
    fontSize: 18,
    color: "rgba(255,255,255,0.85)",
    marginTop: 2,
    "@media (max-width: 700px)": {
      fontSize: 15,
    },
  },
  body: {
    padding: "16px 20px 20px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    marginBottom: 16,
  },
  infoLabel: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 18,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    "@media (max-width: 700px)": {
      fontSize: 15,
    },
  },
  infoText: {
    fontFamily: "Montserrat",
    fontSize: 18,
    color: "#333",
    lineHeight: 1.5,
    textAlign: "left",
    "@media (max-width: 700px)": {
      fontSize: 15,
    },
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "auto",
    paddingTop: 8,
  },
  inbutton: {
    borderRadius: "12px",
    background: "#3585da",
    boxShadow: "0 3px 8px rgba(53,133,218,0.35)",
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    textTransform: "none",
    padding: "10px 18px",
    "@media (max-width: 700px)": {
      fontSize: 15,
    },
    "&:hover": {
      background: "#2b74c4",
    }
  },
  inbuttoncancel: {
    borderRadius: "12px",
    background: "#e53935",
    boxShadow: "0 3px 8px rgba(229,57,53,0.35)",
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    textTransform: "none",
    padding: "10px 18px",
    "@media (max-width: 700px)": {
      fontSize: 15,
    },
    "&:hover": {
      background: "#c62828",
    }
  },
}));

export default function DoctorCard({ name, id, requested, photo }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const p_id = useSelector((state) => state.states.user._id);
  const token = useSelector((state) => state.states.token);
  const dispatch = useDispatch();

  const modalStyle = {
    outline: "none",
    overflowY: "auto",
    maxHeight: "90vh",
  }

  const handleOpen = () => {
    if (requested) {
      const query = "/" + p_id + "/" + id
      apt.delete_request(token, query)
        .then(res => {
          console.log(res.data)
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
        })
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item className={classes.card}>
        <div className={classes.banner}>
          <Avatar
            src={photo && photo >= 1 && photo <= 5 ? userPhotos[photo] : maleDoc}
            alt="Male Doctor Avatar"
            className={classes.docIcon}
          />
          <div>
            <Typography className={classes.docName}>
              DR {name}
            </Typography>
            <Typography className={classes.docRole}>
              Senior Doctor
            </Typography>
          </div>
        </div>
        <div className={classes.body}>
          <div className={classes.infoItem}>
            <Typography className={classes.infoLabel}>Specialty</Typography>
            <Typography className={classes.infoText}>
              MBBS, MRCCGO
            </Typography>
          </div>
          <div className={classes.infoItem}>
            <Typography className={classes.infoLabel}>Experience</Typography>
            <Typography className={classes.infoText}>
              10 years of experience in treating disease related to opthamology
            </Typography>
          </div>
          <div className={classes.button}>
            <Button
              variant="contained"
              disableElevation
              startIcon={requested ? <CancelIcon /> : <EventAvailableIcon />}
              className={requested ? classes.inbuttoncancel : classes.inbutton}
              onClick={handleOpen}
            >
              {requested ? "CANCEL REQUEST" : "APPOINT DOCTOR"}
            </Button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Grid item xs={11} sm={7} md={5} lg={4} style={modalStyle}>
              <Appoint name={name} id={id} onClose={handleClose} />
            </Grid>
          </Modal>
        </div>
      </Grid>
    </Grid>
  );
}
