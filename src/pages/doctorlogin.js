import React from "react";
import "./style.css";
import { Header } from "../components/header";
import doctorlogo from "../Assets/Doclogo.png";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";

import { useFormik } from 'formik';
import { validationSchemaLogin as validationSchema } from "../Services/validations";
import * as auth from "../Services/auth";

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
    height: "42px",
    borderRadius: "10px",
    background: "#3585da",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    margin: "auto",
    color: "#fff",
    "&:hover": {
      background: "rgba(53,133,218,0.8)",
    },
    fontWeight: "bold"
  },
});

export default function DoctorLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      auth.login(values)
        .then(res => alert(JSON.stringify(res)))
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
            <header className={classes.loginboxheader}>DOCTOR LOGIN</header>
            <form onSubmit={formik.handleSubmit}>
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
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
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
                LOGIN
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
