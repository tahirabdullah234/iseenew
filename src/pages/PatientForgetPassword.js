import React from "react";
import "./style.css";
import { Header } from "../components/header";
import doctorlogo from "../Assets/Doclogo.png";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useFormik } from "formik";
import * as auth from "../Services/auth";
import { useDispatch } from "react-redux";
import { login, setuser, settoken } from "./statesSlice";
import * as yup from "yup";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  border: {
    marginTop: "111px",
    border: "6px solid  #59C1E8",
  },
  extratxt: {
    textDecoration: "underline",
    marginBottom: 10,
    marginTop: 10,
    width: "75%",
    margin: "auto",
    fontWeight: "bold",
  },
  dialogbox: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    background: "#fff",
    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.16)",
    Border: "6px",
  },
  setpatientlogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginbox: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "270px",
    height: "350px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
  },
  loginboxheader: {
    marginBottom: "30px",
    fontSize: "24px",
    textDecorationLine: "underline",
  },
  setemail: { marginBottom: "10px", width: "75%" },
  setpassword: { marginBottom: "40px", width: "75%" },
  loginbutton: {
    borderRadius: "10px",
    background: "#3585da",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    marginTop: "25px",
    color: "#fff",
    "&:hover": {
      background: "rgba(53,133,218,0.8)",
    },
    fontWeight: "bold",
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const validationSchema = yup.object({
  username: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),

})


export default function PatientFP() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [snackbar, setsnackbar] = React.useState({
    open: false,
    msg: "",
    type: "",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setsnackbar({ ...snackbar, open: false });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      auth
        .login(values)
        .then((res) => {
          if (res.data.success && res.data.user.isDoctor) {
            setsnackbar({
              ...snackbar,
              open: true,
              msg: "Login Successfull",
              type: "success",
            });
            setTimeout(() => {
              dispatch(login());
              dispatch(setuser(res.data.user));
              dispatch(settoken(res.data.token));
            }, 1000);
          } else if (!res.data.user.isDoctor && res.data.success) {
            setsnackbar({
              ...snackbar,
              open: true,
              msg: "You are not A Doctor",
              type: "error",
            });
          } else {
            setsnackbar({
              ...snackbar,
              open: true,
              msg: "Invalid Credentials",
              type: "error",
            });
          }
        })
        .catch((err) => {
          setsnackbar({
            ...snackbar,
            open: true,
            msg: "Invalid Credentials",
            type: "error",
          });
        });
    },
  });

  const classes = useStyles();
  return (
    <div className="container">
      <Header />
      <Grid item md={6} sm={5} xs={9} className={classes.border}>
        <Grid container className={classes.dialogbox}>
          <Grid item md={6} sm={6} xs={5} className={classes.setpatientlogo}>
            <img src={doctorlogo} className="doctorlogo" alt="error found" />
          </Grid>
          <Grid item md={6} sm={12} xs={12} className={classes.loginbox}>
            <header className={classes.loginboxheader}>FORGET PASSWORD</header>
            <form onSubmit={formik.handleSubmit}>
              <Grid container style={{ justifyContent: "center" }}>
                <TextField
                  label="Email Address"
                  id="username"
                  name="username"
                  className={classes.setemail}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />

                <Button type="submit" className={classes.loginbutton}>
                  RESET PASSWORD
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={snackbar.type}>{snackbar.msg}</Alert>
      </Snackbar>
    </div>
  );
}
