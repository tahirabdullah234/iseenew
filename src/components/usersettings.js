import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Avatar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import photo1 from "../Assets/user1-photo.png";
import photo2 from "../Assets/user2-photo.png";
import photo3 from "../Assets/user3-photo.png";
import photo4 from "../Assets/user4-photo.png";
import photo5 from "../Assets/user5-photo.png";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  validationSchemePatientBasic,
  validationSchemaForgotPassword,
  validationSchemaChangeEmail,
} from "../Services/validations";
import * as auth from "../Services/auth";
import { setuser, setphoto } from "../pages/statesSlice";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const userPhotos = [null, photo1, photo2, photo3, photo4, photo5];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initials = (fullName) =>
  fullName
    ? fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("")
    : "ISEE";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "28px 24px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: { padding: "20px 14px" },
  },
  profileCard: {
    width: "100%",
    borderRadius: 16,
    background: "linear-gradient(135deg, #1061b0 0%, #59c1e8 100%)",
    boxShadow: "0 8px 24px rgba(16, 97, 176, 0.25)",
    padding: "28px 32px",
    boxSizing: "border-box",
    marginBottom: 24,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    [theme.breakpoints.down("sm")]: { padding: "20px 16px", gap: 16 },
  },
  avatarBtn: {
    position: "relative",
    padding: 0,
    flexShrink: 0,
    "&:hover $avatarOverlay": {
      opacity: 1,
    },
  },
  avatar: {
    width: 96,
    height: 96,
    background: "#fff",
    color: "#1061B0",
    fontWeight: 700,
    fontSize: 34,
    border: "3px solid rgba(255,255,255,0.6)",
    [theme.breakpoints.down("sm")]: { width: 76, height: 76, fontSize: 28 },
  },
  avatarOverlay: {
    position: "absolute",
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s ease",
    cursor: "pointer",
  },
  profileName: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 28,
    color: "#fff",
    textShadow: "0 2px 4px rgba(0,0,0,0.15)",
    [theme.breakpoints.down("sm")]: { fontSize: 22 },
  },
  profileEmail: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginTop: 2,
  },
  roleBadge: {
    display: "inline-flex",
    alignItems: "center",
    marginTop: 10,
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.35)",
    color: "#fff",
    borderRadius: 999,
    padding: "4px 14px",
    fontFamily: "Montserrat",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  sectionCard: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    background: "#fff",
    border: "1px solid #eef1f6",
    boxShadow: "0 4px 16px rgba(16, 97, 176, 0.08)",
    padding: "24px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: { padding: "16px" },
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    color: "#3585da",
    marginBottom: 20,
  },
  sectionBar: {
    display: "inline-block",
    width: 5,
    height: 20,
    borderRadius: 3,
    background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
    marginRight: 10,
  },
  field: {
    width: "100%",
    marginBottom: 16,
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
}));

export function UserSettings() {
  const classes = useStyles();
  const user = useSelector((state) => state.states.user);
  const token = useSelector((state) => state.states.token);
  const isdoctor = useSelector((state) => state.states.isdoctor);
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
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

  const fullName = user.fname ? user.fname + " " + (user.lname || "") : "";
  const photoSrc =
    user && typeof user.photo === "string"
      ? user.photo
      : user && user.photo >= 1 && user.photo <= 5
        ? userPhotos[user.photo]
        : null;

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file || !user || !user._id) return;
    auth.upload_profile_picture(token, file)
      .then((res) => {
        if (res.data && res.data.filename) {
          dispatch(setphoto("/" + res.data.filename + "?t=" + Date.now()));
          setsnackbar({
            ...snackbar,
            open: true,
            msg: "Profile picture updated",
            type: "success",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const formikBasicInfo = useFormik({
    initialValues: {
      fname: user.fname,
      lname: user.lname,
      gender: user.gender,
      dob: user.dob ? user.dob.split("T")[0] : "",
    },
    validationSchema: validationSchemePatientBasic,
    onSubmit: (values) => {
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
    <div className={classes.root}>
      <div className={classes.profileCard}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />
        <IconButton
          className={classes.avatarBtn}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          {photoSrc ? (
            <Avatar src={photoSrc} className={classes.avatar} />
          ) : (
            <Avatar className={classes.avatar}>{initials(fullName)}</Avatar>
          )}
          <span className={classes.avatarOverlay}>
            <PhotoCameraIcon />
          </span>
        </IconButton>
        <Box>
          <Typography className={classes.profileName}>
            {fullName || "ISEE User"}
          </Typography>
          <Typography className={classes.profileEmail}>
            {user.username || ""}
          </Typography>
          <span className={classes.roleBadge}>
            {isdoctor ? "Doctor" : "Patient"}
          </span>
        </Box>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.sectionCard}>
            <Typography className={classes.sectionTitle}>
              <span className={classes.sectionBar} />
              Basic Profile
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
                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Button className={classes.button} variant="contained" disableElevation type="submit" style={{ width: 200 }}>
                      UPDATE
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className={classes.sectionCard}>
            <Typography className={classes.sectionTitle}>
              <span className={classes.sectionBar} />
              Change Password
            </Typography>
            <form onSubmit={formikchangepass.handleSubmit} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12} style={{ marginTop: "auto" }}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button className={classes.button} variant="contained" disableElevation type="submit" style={{ width: 200 }}>
                      UPDATE
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className={classes.sectionCard}>
            <Typography className={classes.sectionTitle}>
              <span className={classes.sectionBar} />
              Change Email
            </Typography>
            <form onSubmit={formikEmail.handleSubmit} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12} style={{ marginTop: "auto" }}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button className={classes.button} variant="contained" disableElevation type="submit" style={{ width: 200 }}>
                      UPDATE
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </div>
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
