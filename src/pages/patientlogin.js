import React from "react";
import "./style.css";
import { Header } from "../components/header";
import patientlogo from "../Assets/patientlogo.png";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";

import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const useStyles = makeStyles({
  border: {
    marginTop: "111px",
    border: "6px solid  #59C1E8",
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
    marginBottom: "20px",
    fontSize: "24px",
    textDecorationLine: "underline",
  },
  setemail: { marginBottom: "10px", width: "75%" },
  setpassword: { marginBottom: "40px", width: "75%" },
  loginbutton: {
    width: "38%",
    borderRadius: "15px",
    background: "#3585da",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    margin: "auto",
    color: "#fff",
    "&:hover": {
      background: "rgba(53,133,)",
    }
  },
});

export function PatientLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const classes = useStyles();
  return (
    <div className="container">
      <Header />
      <Grid item md={6} sm={5} xs={9} className={classes.border}>
        <Grid container className={classes.dialogbox}>
          <Grid item md={6} sm={6} xs={5} className={classes.setpatientlogo}>
            <img
              src={patientlogo}
              className="patientlogo"
              alt="Error found"
            ></img>
          </Grid>
          <Grid item md={6} sm={12} xs={12} className={classes.loginbox}>
            <header className={classes.loginboxheader}>PATIENT LOGIN</header>
            <form>
              <TextField
                label="Email Address"
                id="email"
                name="email"
                className={classes.setemail}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                className={classes.setpassword}
                InputLabelProps={{
                  shrink: true,
                }}
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
              <Button type="submit" className={classes.loginbutton}>
                login
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
