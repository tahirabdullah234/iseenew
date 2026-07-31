import React from "react";
import "./style.css";
import patientreglogo from "../Assets/Docreg.png";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import { Header } from "../components/header";
import Typography from "@material-ui/core/Typography";

import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import { useFormik } from 'formik';

import { validationSchemaSignup as validationSchema } from "../Services/validations";
import * as auth from "../Services/auth";
import { useHistory } from "react-router";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles({
  card: {
    display: "flex",
    width: "min(900px, 94%)",
    marginTop: 96,
    marginBottom: 48,
    background: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(2, 32, 71, 0.35)",
    "@media (max-width: 600px)": {
      width: "96%",
    },
  },
  banner: {
    flex: "0 0 34%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    padding: 40,
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #1061b0 0%, #59c1e8 100%)",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  bannerIcon: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 12px 30px rgba(0, 30, 70, 0.3)",
  },
  bannerImg: {
    width: "55%",
  },
  bannerText: {
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    textAlign: "center",
  },
  bannerSub: {
    fontFamily: "Montserrat",
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  formPanel: {
    flex: "1 1 66%",
    padding: "40px 36px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
    "@media (max-width: 600px)": {
      padding: "28px 16px",
      alignItems: "center",
      textAlign: "center",
    },
  },
  formTitle: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 24,
    color: "#1061b0",
  },
  formSubtitle: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: "#8e9bb0",
    marginTop: 4,
    marginBottom: 20,
  },
  fieldRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
  },
  textfield: {
    width: "48%",
    minWidth: 0,
    fontFamily: "Montserrat",
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 12,
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
      boxShadow: "0 8px 22px rgba(53, 133, 218, 0.45)",
    },
  },
  link: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: 600,
    color: "#3585da",
    cursor: "pointer",
    marginTop: 14,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  font: {
    fontFamily: "Montserrat",
  },
});

const theme = createTheme({
  palette: {
    secondary: {
      main: "#3585da",
    },
  },
  props: {
    MuiTextField: {
      variant: "outlined",
    },
    MuiButton: {
      disableElevation: true,
    },
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function DoctorRegistration() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const classes = useStyles();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const [snackbar, setsnackbar] = React.useState({
    open: false,
    msg: "",
    type: ""
  })
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackbar({ ...snackbar, open: false });
  };


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmpassword: '',
      firstname: '',
      lastname: '',
      dob: '',
      pmdcid: '',
      specialization: '',
      experience: '',
      city: '',
      gender: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values = { ...values, isDoctor: true }
      auth.signup(values)
        .then(res => {
          if (res.data.success) {
            auth.doctor_register({ ...values, id: res.data.id, isVerified: true })
              .then(res => {
                if (res.data.success) {
                  setsnackbar({
                    ...snackbar,
                    open: true,
                    msg: "Registration Successfull",
                    type: "success"
                  })
                  setTimeout(() => history.push('/'), 1000)
                } else {
                  setsnackbar({
                    ...snackbar,
                    open: true,
                    msg: "Registration Not Successfull",
                    type: "error"
                  })
                }
              })
          } else {
            setsnackbar({
              ...snackbar,
              open: true,
              msg: "Registration Not Successfull",
              type: "error"
            })
          }
        })

    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Header />
        <div className={classes.card}>
          <div className={classes.banner}>
            <div className={classes.bannerIcon}>
              <img
                src={patientreglogo}
                className={classes.bannerImg}
                alt="Doctor Registration"
              />
            </div>
            <Typography className={classes.bannerText}>Join ISEE</Typography>
            <Typography className={classes.bannerSub}>
              Connect with patients and grow your practice.
            </Typography>
          </div>
          <div className={classes.formPanel}>
            <Typography className={classes.formTitle}>Doctor Registration</Typography>
            <Typography className={classes.formSubtitle}>
              Create your account to get started
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid item xs={12}>
                <div className={classes.fieldRow}>
                  <TextField
                    className={classes.textfield}
                    label="First name"
                    id="firstname"
                    name="firstname"
                    InputLabelProps={{
                      className: classes.font,
                      shrink: true,
                    }}
                    inputProps={{
                      className: classes.font
                    }}
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}
                  />
                  <TextField
                    className={classes.textfield}
                    label="Last name"
                    id="lastname"
                    name="lastname"
                    InputLabelProps={{
                      className: classes.font,
                      shrink: true,
                    }}
                    inputProps={{
                      className: classes.font
                    }}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}
                  />
                </div>
                <div className={classes.fieldRow}>
                  <TextField
                    className={classes.textfield}
                    label="Email Address"
                    id="username"
                    name="username"
                    InputLabelProps={{
                      className: classes.font,
                      shrink: true,
                    }}
                    inputProps={{
                      className: classes.font
                    }}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                  />
                  <TextField
                    className={classes.textfield}
                    label="Date of Birth"
                    id="dob"
                    name="dob"
                    type="date"
                    InputLabelProps={{
                      className: classes.font,
                      shrink: true,
                    }}
                    inputProps={{
                      className: classes.font
                    }}
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                    helperText={formik.touched.dob && formik.errors.dob}
                  />
                </div>
                <div className={classes.fieldRow}>
                  <TextField
                    className={classes.textfield}
                    label="Password"
                    id="password"
                    name="password"
                    InputLabelProps={{
                      className: classes.font,
                      shrink: true,
                    }}
                    inputProps={{
                      className: classes.font
                    }}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                  <TextField
                    className={classes.textfield}
                    label="Confirm Password"
                    id="confirmpassword"
                    name="confirmpassword"
                    InputLabelProps={{
                      className: classes.font,
                      shrink: true,
                    }}
                    inputProps={{
                      className: classes.font
                    }}
                    type={showConfirmPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                    helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                  />
                </div>
                <div className={classes.fieldRow}>
                  <TextField
                    className={classes.textfield}
                    label="PMDC ID"
                    id="pmdcid"
                    name="pmdcid"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formik.values.pmdcid}
                    onChange={formik.handleChange}
                    error={formik.touched.pmdcid && Boolean(formik.errors.pmdcid)}
                    helperText={formik.touched.pmdcid && formik.errors.pmdcid}
                  ></TextField>
                  <TextField
                    className={classes.textfield}
                    label="Specialization"
                    id="specialization"
                    name="specialization"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formik.values.specialization}
                    onChange={formik.handleChange}
                    error={formik.touched.specialization && Boolean(formik.errors.specialization)}
                    helperText={formik.touched.specialization && formik.errors.specialization}
                  />
                </div>
                <div className={classes.fieldRow}>
                  <TextField
                    className={classes.textfield}
                    label="Experience"
                    id="experience"
                    name="experience"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                    error={formik.touched.experience && Boolean(formik.errors.experience)}
                    helperText={formik.touched.experience && formik.errors.experience}
                  />
                  <TextField
                    className={classes.textfield}
                    label="Current City"
                    id="city"
                    name="city"
                    InputLabelProps={{
                      className: classes.font,
                      shrink: true,
                    }}
                    inputProps={{
                      className: classes.font
                    }}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </div>
                <div className={classes.fieldRow}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" style={{ fontSize: "12px" }}>
                      Gender
                    </FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      id="gender"
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      error={formik.touched.gender && Boolean(formik.errors.gender)}
                      label="Other"
                      style={{ display: "flex", flexDirection: "row" }}
                      helperText={formik.touched.gender && formik.errors.gender}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              <Button type="submit" variant="contained" className={classes.button}>
                Register
              </Button>
              <Typography
                variant="body2"
                className={classes.link}
                onClick={() => history.push('/')}
              >
                Already have An Account? SignIn Here
              </Typography>
            </form>
          </div>
        </div>
        <Snackbar open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert severity={snackbar.type} className={classes.snack}>
            {snackbar.msg}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}
