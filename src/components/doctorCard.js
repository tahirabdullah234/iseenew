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
    marginLeft: 60,
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
  },
  docIcon: {
    width: 70,
    height: 70,
    position: "absolute",
  },
  appointdocgrid: {
    margin: "auto",
    background: "transparent",
  },
}));
export default function DoctorCard() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container className={classes.marginbox}>
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
            10 YEARS of experience in treating disease related to opthamology
          </Typography>
        </Grid>
        <Grid container className={classes.button}>
          <Button
            variant="contained"
            disableElevation
            className={classes.inbutton}
            onClick={handleOpen}
          >
            APPOINT DOCTOR
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Grid item xs={10} sm={6} className={classes.appointdocgrid}>
              <Appoint />
            </Grid>
          </Modal>
        </Grid>
      </Grid>
    </Grid>
  );
}
