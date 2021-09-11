import React from "react";
import "./App.css";

// import { PatientLogin } from "./components/patientlogin";
// import { PatientRegistration } from "./components/patientregistration";
// import { DoctorRegistration } from "./components/docreg";
// import { DoctorLogin } from "./components/doctorlogin";
// import MainDrawer from "./components/drawer";
// import { PatientDashboard } from "./components/PatientDashboard";
import { ManageBP as BP } from "./components/manageBloodPressure";
// import DoctorCard from "./components/doctorCard";
// import { Header } from "./components/header";
import { ManageGL } from "./components/manageGlucoseLevel";
// import { RetinaScan } from "./components/Retinascan";
// import { UserSettings } from "./components/usersettings";
// import { Reports } from "./components/reports";
// import { DoctorDashboard } from "./components/doctorDashboard";

// import BP from "./pages/bloodpressure";
// import BP from "./components/idcTemplate";

import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat", 
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BP />
    </ThemeProvider>
  );
}
// <Drawer />
// added some changes
// changes added by abdullah bin tahir
export default App;
