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

import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

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
    background: "#3585da",
    color: "#fff",
    "&:hover": {
      background: "rgba(53,133,218,0.8)",
    },
    fontWeight: "bold"
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
    fontFamily: "Montserrat",
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
    justifyContent: "space-between",
  },
  font: {
    fontFamily: "Montserrat",
  }
});

const theme = createTheme({
  palette: {
    secondary: {
      main: "#3585da",
    },
  },
});


export default function DoctorRegistration() {
  const [value, setValue] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const classes = useStyles();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Header />

        <Grid item md={4} sm={6} xs={10} className={classes.border}>
          <Grid container className={classes.dialogbox}>
            <Grid item className={classes.setpatientreglogo}>
              <img
                src={patientreglogo}
                className="docreglogo"
                alt="error found"
              ></img>

              <header className={classes.registrationheader}>
                DOCTOR REGISTRATION
              </header>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.starttextfielddiv}>
                <TextField
                  className={classes.textfield}
                  label="First name"
                  InputLabelProps={{
                    className: classes.font,
                    shrink: true,
                  }}
                  inputProps={{
                    className: classes.font
                  }}
                />
                <TextField
                  className={classes.textfield}
                  label="Last name"
                  InputLabelProps={{
                    className: classes.font,
                    shrink: true,
                  }}
                  inputProps={{
                    className: classes.font
                  }}
                />
              </div>
              <div className={classes.endtextfield}>
                <TextField
                  className={classes.textfield}
                  label="Email Address"
                  InputLabelProps={{
                    className: classes.font,
                    shrink: true,
                  }}
                  inputProps={{
                    className: classes.font
                  }}
                />
                <TextField
                  className={classes.textfield}
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{
                    className: classes.font,
                    shrink: true,
                  }}
                  inputProps={{
                    className: classes.font
                  }}
                />
              </div>
              <div className={classes.endtextfield}>
                <TextField
                  className={classes.textfield}
                  label="Password"
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
                />
                <TextField
                  className={classes.textfield}
                  label="Confirm Password"
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
                />
              </div>
              <div className={classes.endtextfield}>
                <TextField
                  className={classes.textfield}
                  label="PMDC ID"
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
                <TextField
                  className={classes.textfield}
                  label="Specialization"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
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
                <TextField
                  className={classes.textfield}
                  label="Current City"
                  InputLabelProps={{
                    className: classes.font,
                    shrink: true,
                  }}
                  inputProps={{
                    className: classes.font
                  }}
                />
              </div>
            </Grid>

            <Button type="submit" className={classes.regbutton}>
              Register
            </Button>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
