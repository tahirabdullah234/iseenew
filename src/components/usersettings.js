import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  validationSchemePatientBasic,
  validationSchemaForgotPassword,
  validationSchemaChangeEmail,
} from "../Services/validations";
import * as auth from "../Services/auth";
import { setuser } from "../pages/statesSlice";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  DialogBox: {
    width: "100%",
    borderRadius: 20,
    background: "#fff",
    boxShadow: "0 12px 30px rgba(16, 97, 176, 0.12)",
    padding: "32px 32px 40px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    "@media (max-width: 600px)": {
      padding: "24px 16px",
    },
  },
  pageTitle: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 26,
    color: "#3585da",
    textDecoration: "underline",
  },
  pageSubtitle: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: "#8e9bb0",
    marginTop: 4,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    color: "#3585da",
    marginBottom: 16,
  },
  sectionCard: {
    width: "100%",
    borderRadius: 14,
    background: "#fff",
    border: "1px solid #eef1f6",
    boxShadow: "0 4px 16px rgba(16, 97, 176, 0.08)",
    padding: "24px",
    boxSizing: "border-box",
    marginBottom: 28,
    "@media (max-width: 600px)": {
      padding: "16px",
    },
  },
  field: {
    width: "100%",
  },
  inputRoot: {
    fontFamily: "Montserrat",
  },
  genderLabel: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: "#8e9bb0",
    marginBottom: 4,
  },
  radiogrp: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
    boxShadow: "0 6px 18px rgba(53, 133, 218, 0.35)",
    color: "#fff",
    fontWeight: 700,
    fontFamily: "Montserrat",
    letterSpacing: 1,
    textTransform: "none",
    "&:hover": {
      background: "linear-gradient(45deg, #2b74c4 0%, #49a9d6 100%)",
      boxShadow: "0 8px 22px rgba(53, 133, 218, 0.45)",
    },
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
    type: "",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
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
      alert(JSON.stringify(values));
      auth.update_basic(token, values).then((res) => {
        if (res.data.success) {
          setsnackbar({
            ...snackbar,
            open: true,
            msg: res.data.message,
            type: "success",
          });
          dispatch(setuser(res.data.user));
        } else {
          setsnackbar({
            ...snackbar,
            open: true,
            msg: res.data.message,
            type: "error",
          });
        }
      });
    },
  });

  const formikchangepass = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: validationSchemaForgotPassword,
    onSubmit: (values) => {
      auth.change_password(token, values).then((res) => {
        formikchangepass.resetForm();
        if (res.data.success) {
          setsnackbar({
            ...snackbar,
            open: true,
            msg: res.data.message,
            type: "success",
          });
        } else {
          setsnackbar({
            ...snackbar,
            open: true,
            msg: res.data.message,
            type: "error",
          });
        }
      });
    },
  });

  const formikEmail = useFormik({
    initialValues: {
      email: user.username || "",
    },
    validationSchema: validationSchemaChangeEmail,
    onSubmit: (values) => {
      auth.update_email(token, { email: values.email }).then((res) => {
        if (res.data.success) {
          dispatch(setuser(res.data.user));
          setsnackbar({
            ...snackbar,
            open: true,
            msg: "Email updated successfully",
            type: "success",
          });
        } else {
          setsnackbar({
            ...snackbar,
            open: true,
            msg: res.data.err || res.data.message || "Could not update email",
            type: "error",
          });
        }
      });
    },
  });

  return (
    <div className="dashdiv">
      <Grid item xs={12} className={classes.DialogBox}>
        <Typography className={classes.pageTitle}>
          USER SETTINGS
        </Typography>
        <Typography className={classes.pageSubtitle}>
          Manage your personal information and account security.
        </Typography>
        <Grid item xs={12} className={classes.sectionCard}>
          <Typography className={classes.sectionTitle}>
            BASIC PROFILE
          </Typography>
          <form onSubmit={formikBasicInfo.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ classes: { input: classes.inputRoot } }}
                  className={classes.field}
                  name="fname"
                  value={formikBasicInfo.values.fname}
                  onChange={formikBasicInfo.handleChange}
                  error={formikBasicInfo.touched.fname && Boolean(formikBasicInfo.errors.fname)}
                  helperText={formikBasicInfo.touched.fname && formikBasicInfo.errors.fname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ classes: { input: classes.inputRoot } }}
                  className={classes.field}
                  name="lname"
                  value={formikBasicInfo.values.lname}
                  onChange={formikBasicInfo.handleChange}
                  error={formikBasicInfo.touched.lname && Boolean(formikBasicInfo.errors.lname)}
                  helperText={formikBasicInfo.touched.lname && formikBasicInfo.errors.lname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ classes: { input: classes.inputRoot } }}
                  className={classes.field}
                  name="dob"
                  value={formikBasicInfo.values.dob}
                  onChange={formikBasicInfo.handleChange}
                  error={formikBasicInfo.touched.dob && Boolean(formikBasicInfo.errors.dob)}
                  helperText={formikBasicInfo.touched.dob && formikBasicInfo.errors.dob}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset" style={{ width: "100%", marginTop: 8 }}>
                  <FormLabel component="legend" className={classes.genderLabel}>Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    className={classes.radiogrp}
                    value={formikBasicInfo.values.gender}
                    onChange={formikBasicInfo.handleChange}
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button className={classes.button} variant="contained" disableElevation type="submit" style={{ width: 200 }}>
                    UPDATE
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.sectionCard}>
          <Typography className={classes.sectionTitle}>
            CHANGE PASSWORD
          </Typography>
          <form onSubmit={formikchangepass.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Old Password"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ classes: { input: classes.inputRoot } }}
                  className={classes.field}
                  type="password"
                  name="oldpassword"
                  value={formikchangepass.values.oldpassword}
                  onChange={formikchangepass.handleChange}
                  error={formikchangepass.touched.oldpassword && Boolean(formikchangepass.errors.oldpassword)}
                  helperText={formikchangepass.touched.oldpassword && formikchangepass.errors.oldpassword}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="New Password"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ classes: { input: classes.inputRoot } }}
                  className={classes.field}
                  type="password"
                  name="newpassword"
                  value={formikchangepass.values.newpassword}
                  onChange={formikchangepass.handleChange}
                  error={formikchangepass.touched.newpassword && Boolean(formikchangepass.errors.newpassword)}
                  helperText={formikchangepass.touched.newpassword && formikchangepass.errors.newpassword}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm New Password"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ classes: { input: classes.inputRoot } }}
                  className={classes.field}
                  type="password"
                  name="confirmpassword"
                  value={formikchangepass.values.confirmpassword}
                  onChange={formikchangepass.handleChange}
                  error={formikchangepass.touched.confirmpassword && Boolean(formikchangepass.errors.confirmpassword)}
                  helperText={formikchangepass.touched.confirmpassword && formikchangepass.errors.confirmpassword}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button className={classes.button} variant="contained" disableElevation type="submit" style={{ width: 200 }}>
                    UPDATE
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.sectionCard}>
          <Typography className={classes.sectionTitle}>
            CHANGE EMAIL
          </Typography>
          <form onSubmit={formikEmail.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="New Email Address"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ classes: { input: classes.inputRoot } }}
                  className={classes.field}
                  name="email"
                  value={formikEmail.values.email}
                  onChange={formikEmail.handleChange}
                  error={formikEmail.touched.email && Boolean(formikEmail.errors.email)}
                  helperText={formikEmail.touched.email && formikEmail.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button className={classes.button} variant="contained" disableElevation type="submit" style={{ width: 200 }}>
                    UPDATE
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={snackbar.type}>{snackbar.msg}</Alert>
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
