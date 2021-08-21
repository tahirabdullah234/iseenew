import React from "react";
import "./style.css";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import iseelogo from "../Assets/logofilled.png";
import patientreglogo from "../Assets/patientregistration.png";
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
import { Header } from "./header";
import { green, blue } from "@material-ui/core/colors";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
export function PatientRegistration() {
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const useStyles = makeStyles({
    border: {
      marginTop: "111px",
      border: "6px solid  #59C1E8",
    },
    dialogbox: {
      width: "100%",
      height: "100%",
      display: "flex",

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
    regbutton: {
      width: "38%",
      height: "42px",
      borderRadius: "10px",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "auto",
      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    },
    setpatientreglogo: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    registrationheader: {
      marginBottom: "20px",
      fontSize: "24px",
      textDecorationLine: "underline",
      justifyContent: "center",
      alignItems: "center",
    },
    starttextfielddiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: "8px",
    },
    textfield: {
      display: "flex",
      width: "45%",
      color: "black",
      "&:hover": {
        color: "white",
      },
    },
    endtextfield: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: "7px",
    },
    radiobutton: {
      display: "flex",
      flexDirection: "row",

      marginTop: "7px",
    },
  });
  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: "#3585da",
      },
    },
  });
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showPassword);
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Header />

        <Grid container md={5} sm={9} xs={11} className={classes.border}>
          <Grid container md={12} sm={12} xs={12} className={classes.dialogbox}>
            <Grid
              item
              md={12}
              sm={12}
              xs={12}
              className={classes.setpatientreglogo}
            >
              <img
                src={patientreglogo}
                className="patientregistrationlogo"
              ></img>

              <header className={classes.registrationheader}>
                PATIENT REGISTRATION
              </header>
            </Grid>
            <Grid md={12} sm={12} xs={12}>
              <div className={classes.starttextfielddiv}>
                <TextField
                  className={classes.textfield}
                  label="First name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
                <TextField
                  className={classes.textfield}
                  label="Last name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div className={classes.endtextfield}>
                <TextField
                  className={classes.textfield}
                  label="Email Address"
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
                <TextField
                  className={classes.textfield}
                  label="Date of Birth"
                  type="date"
                  defaultValue="2000-05-24"
                  style={{ color: "white" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div className={classes.endtextfield}>
                <TextField
                  className={classes.textfield}
                  label="Password"
                  InputLabelProps={{
                    shrink: true,
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
                ></TextField>
                <TextField
                  className={classes.textfield}
                  label="Confirm Password"
                  InputLabelProps={{
                    shrink: true,
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
                ></TextField>
              </div>
              <div className={classes.radiobutton}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" style={{ fontSize: "12px" }}>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange}
                    label="Other"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>

            <Button
              className={classes.regbutton}
              style={{ background: "#3585da", color: "white" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
