import React from "react";
import "./style.css";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import iseelogo from "../Assets/logofilled.png";
import patientlogo from "../Assets/patientlogin.png";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

export function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(45deg,#3585da 30%, #003C72 70%)",
      }}
    >
      <AppBar color="inherit">
        <Toolbar>
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} sm={2} md={1}>
              <div className="logoDiv">
                <img src={iseelogo} alt="isee logo" className="logo" />
              </div>
            </Grid>
            <Grid item xs={12} sm={10} md={11}>
              <div className="logoTextDiv">
                <p className="logoTextSlash">|</p>
                <p className="logoText">Blindness Detection System</p>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        container
        style={{
          height: "100vh",
          width: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        xs={12}
      >
        <Grid>
          <div className="baseContainer">
            <Grid>
              <div className="outerBox">
                <Grid spacing={3}>
                  <div className="dialogBox">
                    <div
                      className="loginBox"
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <header
                        style={{
                          marginBottom: "20px",
                          fontSize: "24px",
                          textDecorationLine: "underline",
                        }}
                      >
                        PATIENT LOGIN
                      </header>
                      <div style={{ justifyContent: "left" }}>
                        <TextField
                          label="Email Address"
                          style={{ marginBottom: "10px", width: "75%" }}
                        ></TextField>
                        <TextField
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          style={{ marginBottom: "40px", width: "75%" }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? (
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
                      <Button
                        style={{
                          width: "170px",
                          height: "43px",
                          borderRadius: "10px",
                          background: "#3585da",
                          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                          color: "white",
                        }}
                      >
                        login
                      </Button>
                    </div>
                    <div className="patientlogoDiv">
                      <img src={patientlogo} className="patientlogo"></img>
                    </div>
                  </div>
                </Grid>
              </div>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
