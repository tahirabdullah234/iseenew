import React from "react";
import "./style.css";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Header } from "./header";
import patientlogo from "../Assets/patientlogo.png";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
export function DoctorLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
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
    },
  });
  const classes = useStyles();
  return (
    <div className="container">
      <Header />
      <Grid container md={6} sm={5} xs={9} className={classes.border}>
        <Grid container md={12} sm={12} xs={12} className={classes.dialogbox}>
          <Grid item md={6} sm={6} xs={5} className={classes.setpatientlogo}>
            <img src={patientlogo} className="patientlogo"></img>
          </Grid>
          <Grid item md={6} sm={12} xs={12} className={classes.loginbox}>
            <header className={classes.loginboxheader}>DOCTOR LOGIN</header>
            <div>
              <TextField
                label="Email Address"
                className={classes.setemail}
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>
              <TextField
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
              />
            </div>

            <Button
              className={classes.loginbutton}
              style={{ background: "#3585da", color: "white" }}
            >
              login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
