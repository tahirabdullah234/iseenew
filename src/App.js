import React from "react";
import "./App.css";

// import { PatientLogin } from "./components/patientlogin";
// import { PatientRegistration } from "./pages/patientregistration";
// import { DoctorRegistration } from "./components/docreg";
// import { DoctorLogin } from "./components/doctorlogin";
// import MainDrawer from "./components/drawer";
// import Patient from "./pages/patient";
// import { ManageBP as BP } from "./components/manageBloodPressure";
// import DoctorCard from "./components/doctorCard";
// import { Header } from "./components/header";
// import { ManageGL } from "./components/manageGlucoseLevel";
// import { RetinaScan } from "./components/Retinascan";
// import { UserSettings } from "./components/usersettings";
// import { Reports } from "./components/reports";
// import { DoctorDashboard } from "./components/doctorDashboard";

// import BP from "./pages/bloodpressure";
// import BG from "./pages/bloodglocuse";
// import Settings from "./pages/UserSettings";
// import Report from "./pages/drReports";
import Appoint from "./pages/appointDoctor";
// import Scan from "./pages/checkdisease";
// import { DoctorRegistration } from "./pages/docreg";
// import { DoctorLogin } from "./pages/doctorlogin";
// import Patient from "./pages/patient";
// import PatientLogin from "./pages/patientlogin";
// import DoctorLogin from "./pages/doctorlogin";
// import PatientRegistration from "./pages/patientregistration";
// import DoctorRegistration from "./pages/docreg";

// import Graph from "./components/graphs"

import Main from "./routes/main";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}
// <Drawer />
// added some changes
// changes added by abdullah bin tahir
export default App;
