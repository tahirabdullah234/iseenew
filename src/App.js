import React from "react";
import "./App.css";

// import { PatientLogin } from "./components/patientlogin";
// import { PatientRegistration } from "./components/patientregistration";
// import { DoctorRegistration } from "./components/docreg";
// import { DoctorLogin } from "./components/doctorlogin";
// import Drawer from './components/drawer'
// import Drawer from './components/idcDrawer'
// import Drawer from './components/doctorCard'
import Drawer from './components/doctorAppoint'

import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Drawer />
      </div>
    </ThemeProvider>
  );
}
// <Drawer />
// added some changes
// changes added by abdullah bin tahir
export default App;
