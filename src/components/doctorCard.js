import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import maleDoc from "../Assets/doctor_logo.svg";
import Appoint from "./doctorAppoint";

import * as apt from "../Services/appointment";

import { useSelector, useDispatch } from "react-redux";

import { setrequesteddoc, setdoctors } from "../pages/statesSlice";


const useStyles = makeStyles((theme) => ({
  marginbox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  infoGrid: {
    flexDirection: "column",
    marginTop: "10px",
    marginBottom: "20px",
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
  },
  innerGriditem: {
    padding: "20px 0px 0px 20px"
  },
  Profiletxt: {
    fontWeight: "bold",
    textAlign: "left",
    color: "#1061b0",
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inbutton: {
    borderRadius: "12px",
    background: "#3585da",
    boxshadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    color: "#fff",
    "&:hover": {
      background: "rgba(53,133,218,0.7)",
    }
  },
  inbuttoncancel: {
    borderRadius: "12px",
    background: "#FF0000",
    boxshadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    color: "#fff",
    "&:hover": {
      background: "rgba(255, 0, 0, 0.7)",
    }
  },
  docIcon: {
    width: 70,
    height: 70,
    // position: "absolute",
  },
  appointdocgrid: {
    margin: "auto",
    background: "transparent",
  },
  modalcenter: {
    alignItems: "center",
    marginTop: "10%",
    borderRadius: 15
  }
}));

export default function DoctorCard({ name, id, requested }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const p_id = useSelector((state) => state.states.user._id);
  const token = useSelector((state) => state.states.token);
  const dispatch = useDispatch();

  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(50%, -50%)",
    margin: "auto"
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
                    // setstate({ ...state, doctor: data, requested: response.data.data })
                  } else {
                    dispatch(setdoctors(data))
                    dispatch(setrequesteddoc([]))
                    // setstate({ ...state, doctor: xdata, requested: [] })
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
    <Grid container className={classes.marginbox}>
      <Grid item className={classes.textBackground}>
        <Grid item className={classes.innerGrid}>
          <Grid container>
            <Avatar
              src={maleDoc}
              alt="Male Doctor Avatar"
              className={classes.docIcon}
            />
            <Grid item className={classes.innerGriditem}>
              <Typography
                variant="body1"
                display="block"
                className={classes.Profiletxt}
              >
                DR {name}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                className={classes.Profiletxt}
              >
                Senior Doctor
              </Typography>
            </Grid>
          </Grid>
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
            10 YEARS of experience in treating disease related to opthamology
          </Typography>
        </Grid>
        <Grid container className={classes.button}>
          <Button
            variant="contained"
            disableElevation
            className={requested ? classes.inbuttoncancel : classes.inbutton}
            onClick={handleOpen}
          >
            {requested ? "CANCEL REQUEST" : "APPOINT DOCTOR"}
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Grid item xs={10} sm={3} className={modalStyle}>
              <Appoint name={name} id={id} onClose={handleClose} />
            </Grid>
          </Modal>
        </Grid>
      </Grid>
    </Grid>
  );
}
