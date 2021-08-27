import React from "react";
import "./App.css";
import { PatientLogin } from "./components/patientlogin";
import { PatientRegistration } from "./components/patientregistration";
import { DoctorRegistration } from "./components/docreg";
import { DoctorLogin } from "./components/doctorlogin";
import MainDrawer from "./components/drawer";
import { PatientDashboard } from "./components/PatientDashboard";
import { ManageBP } from "./components/manageBloodPressure";
function App() {
  return (
    <div>
      <ManageBP />
    </div>
  );
}
// added some changes
// changes added by abdullah bin tahir
export default App;
