import React from "react";
import "./style.css";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import iseelogo from "../Assets/logofilled.png";
import patientlogo from "../Assets/patientlogo.png";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

export function PatientRegistration() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
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
        item
        md={9}
        sm={6}
        xs={8}
        style={{
          border: "6px solid  #59C1E8",
        }}
      >
        <Grid
          container
          md={12}
          sm={12}
          xs={12}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background: "#fff",
            boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.16)",
            Border: "6px",
          }}
        >
          <Grid
            item
            md={6}
            sm={12}
            xs={12}
            style={{
              display: "flex",

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={patientlogo} className="patientlogo"></img>
          </Grid>

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
          </div>
          <Grid
            style={{
              width: "38%",
              height: "42px",
              borderRadius: "10px",
              background: "#3585da",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
            }}
          >
            <Button style={{ color: "white" }}>login</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
