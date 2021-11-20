import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { validationSchemePatientBasic, validationSchemaForgotPassword } from "../Services/validations";
import * as auth from "../Services/auth";
import { setuser } from "../pages/statesSlice";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles({
  DialogBox: {
    width: "100%",
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sameinfont: {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  DEDialogBox: {
    width: "100%",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    padding: "20px",
    marginTop: "10px",
  },
  DEDial: {
    width: "100%",
    borderRadius: "20px",
    background: "#3585da",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    color: "white",
    marginTop: "10px",
    "&:hover": {
      background: "rgba(53,133,218,0.7)",
    }
  },
  Glucoselevel: { width: "100%" },
  radiopos: {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
  },
  radiosize: {
    marginTop: "16px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  radiogrp: { display: "flex", flexDirection: "row" },
  DEDialpos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export function UserSettings() {

  const classes = useStyles();
  const user = useSelector((state) => state.states.user);
  const token = useSelector((state) => state.states.token);
  const dispatch = useDispatch();
  const [snackbar, setsnackbar] = React.useState({
    open: false,
    msg: "",
    type: ""
  })
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbar({ ...snackbar, open: false });
  };

  const formikBasicInfo = useFormik({
    initialValues: {
      fname: user.fname,
      lname: user.lname,
      gender: user.gender,
      dob: user.dob.split("T")[0],
    },
    validationSchema: validationSchemePatientBasic,
    onSubmit: (values) => {
      alert(JSON.stringify(values))
      auth.update_basic(token, values)
        .then(res => {
          if (res.data.success) {
            setsnackbar({
              ...snackbar,
              open: true,
              msg: res.data.message,
              type: "success"
            })
            dispatch(setuser(res.data.user))
          } else {
            setsnackbar({
              ...snackbar,
              open: true,
              msg: res.data.message,
              type: "error"
            })
          }
        })
    }

  })

  const formikchangepass = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: validationSchemaForgotPassword,
    onSubmit: (values) => {
      auth.change_password(token, values)
        .then(res => {
          formikchangepass.resetForm()
          if (res.data.success) {
            setsnackbar({
              ...snackbar,
              open: true,
              msg: res.data.message,
              type: "success"
            })
          } else {
            setsnackbar({
              ...snackbar,
              open: true,
              msg: res.data.message,
              type: "error"
            })
          }
        })
    }

  })


  return (
    <div className="dashdiv">
      <Grid item xs={12} className={classes.DialogBox}>
        <Typography style={{ fontSize: "30px" }} className={classes.sameinfont}>
          USER SETTINGS
        </Typography>
        <Typography style={{ fontSize: "28px", width: "100%", textAlign: "left" }} className={classes.sameinfont}>
          BASIC PROFILE
        </Typography>
        <Grid item xs={12} className={classes.DEDialogBox}>
          <form onSubmit={formikBasicInfo.handleSubmit}>
            <Grid container className={classes.DEDialpos}>
              <Grid item xs={11} md={2} style={{ marginTop: "5px" }}>
                <TextField
                  label="First Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.Glucoselevel}
                  name="fname"
                  value={formikBasicInfo.values.fname}
                  onChange={formikBasicInfo.handleChange}
                  error={formikBasicInfo.touched.fname && Boolean(formikBasicInfo.errors.fname)}
                  helperText={formikBasicInfo.touched.fname && formikBasicInfo.errors.fname}
                />
              </Grid>
              <Grid item xs={11} md={2} style={{ marginTop: "5px" }}>
                <TextField
                  label="Last Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.Glucoselevel}
                  name="lname"
                  value={formikBasicInfo.values.lname}
                  onChange={formikBasicInfo.handleChange}
                  error={formikBasicInfo.touched.lname && Boolean(formikBasicInfo.errors.lname)}
                  helperText={formikBasicInfo.touched.lname && formikBasicInfo.errors.lname}
                />
              </Grid>
              <Grid item xs={11} md={2} style={{ marginTop: "5px" }}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.Glucoselevel}
                  name="dob"
                  value={formikBasicInfo.values.dob}
                  onChange={formikBasicInfo.handleChange}
                  error={formikBasicInfo.touched.dob && Boolean(formikBasicInfo.errors.dob)}
                  helperText={formikBasicInfo.touched.dob && formikBasicInfo.errors.dob}
                />
              </Grid>
              <Grid item xs={11} md={3} className={classes.radiopos}>
                <FormControl component="fieldset" className={classes.radiosize}>
                  <FormLabel component="legend" style={{ fontSize: "12px" }}>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    className={classes.radiogrp}
                    value={formikBasicInfo.values.gender}
                    onChange={formikBasicInfo.handleChange}
                    error={formikBasicInfo.touched.gender && Boolean(formikBasicInfo.errors.gender)}
                    helperText={formikBasicInfo.touched.gender && formikBasicInfo.errors.gender}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Button
                  className={classes.DEDial}
                  type="submit"
                >UPDATE</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid container style={{ marginTop: "50px" }}>
          <Typography
            style={{ fontSize: "28px" }}
            className={classes.sameinfont}
          >
            CHANGE PASSWORD
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.DEDialogBox}>
          <form onSubmit={formikchangepass.handleSubmit}>
            <Grid container className={classes.DEDialpos}>
              <Grid item xs={11} md={3} style={{ marginTop: "5px" }}>
                <TextField
                  label="Old Password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.Glucoselevel}
                  type="password"
                  name="oldpassword"
                  value={formikchangepass.values.oldpassword}
                  onChange={formikchangepass.handleChange}
                  error={formikchangepass.touched.oldpassword && Boolean(formikchangepass.errors.oldpassword)}
                  helperText={formikchangepass.touched.oldpassword && formikchangepass.errors.oldpassword}
                />
              </Grid>
              <Grid item xs={11} md={3} style={{ marginTop: "5px" }}>
                <TextField
                  label="New Password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.Glucoselevel}
                  type="password"
                  name="newpassword"
                  value={formikchangepass.values.newpassword}
                  onChange={formikchangepass.handleChange}
                  error={formikchangepass.touched.newpassword && Boolean(formikchangepass.errors.newpassword)}
                  helperText={formikchangepass.touched.newpassword && formikchangepass.errors.newpassword}
                />
              </Grid>
              <Grid item xs={11} md={3} style={{ marginTop: "5px" }}>
                <TextField
                  label="Confirm New Password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.Glucoselevel}
                  type="password"
                  name="confirmpassword"
                  value={formikchangepass.values.confirmpassword}
                  onChange={formikchangepass.handleChange}
                  error={formikchangepass.touched.confirmpassword && Boolean(formikchangepass.errors.confirmpassword)}
                  helperText={formikchangepass.touched.confirmpassword && formikchangepass.errors.confirmpassword}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <Button className={classes.DEDial} type="submit">UPDATE</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Snackbar open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={snackbar.type}>
          {snackbar.msg}
        </Alert>
      </Snackbar>

    </div>
  );
}

        // <Grid container style={{ marginTop: "50px" }}>
        //   <Typography
        //     style={{ fontSize: "28px" }}
        //     className={classes.sameinfont}
        //   >
        //     CHANGE EMAIL
        //   </Typography>
        // </Grid>
        // <Grid item xs={12} className={classes.DEDialogBox}>
        //   <Grid container className={classes.DEDialpos}>
        //     <Grid item xs={11} md={5} style={{ marginTop: "5px" }}>
        //       <TextField
        //         label="New Email Address"
        //         InputLabelProps={{
        //           shrink: true,
        //         }}
        //         className={classes.Glucoselevel}
        //       />
        //     </Grid>
        //     <Grid item xs={11} md={4} style={{ marginTop: "5px" }}>
        //       <TextField
        //         label="Confirm Email Address"
        //         InputLabelProps={{
        //           shrink: true,
        //         }}
        //         className={classes.Glucoselevel}
        //       />
        //     </Grid>
        //     <Grid item xs={6} sm={2}>
        //       <Button className={classes.DEDial}>UPDATE</Button>
        //     </Grid>
        //   </Grid>
        // </Grid>
