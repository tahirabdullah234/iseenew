import React from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

import PatientLogin from "../pages/patientlogin";
import PatientRegistration from "../pages/patientregistration";
import DoctorLogin from "../pages/doctorlogin";
import DoctorRegistration from "../pages/docreg";

import Patient from "../pages/patient";
import Appoint from "../pages/appointDoctor";
import BG from "../pages/bloodglocuse";
import BP from "../pages/bloodpressure";
import Reports from "../pages/drReports";
import Settings from "../pages/UserSettings";
import Scan from "../pages/checkdisease";

import Doctor from "../pages/doctor";

export default function Main() {
    const islogin = useSelector((state) => state.states.islogin)
    const isdoctor = useSelector((state) => state.states.isdoctor)
    const history = useHistory();

    return (
        <Router history={history}>
            {
                islogin ?
                    isdoctor ? <DoctorRoutes /> : <UserRoutes />
                    :
                    <Switch>
                        <Route exact path="/">
                            {isdoctor ? <DoctorLogin /> : <PatientLogin />}
                        </Route>
                        <Route path="/register">
                            {isdoctor ? <DoctorRegistration /> : <PatientRegistration />}
                        </Route>
                    </Switch>
            }
        </Router>
    )
}


const UserRoutes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Patient />
            </Route>
            <Route path="/bloodpressure">
                <BP />
            </Route>
            <Route path="/bloodglocuse">
                <BG />
            </Route>
            <Route path="/reports">
                <Reports />
            </Route>
            <Route path="/appointdoctor">
                <Appoint />
            </Route>
            <Route path="/editprofile">
                <Settings />
            </Route>
            <Route path="/checkdisease">
                <Scan />
            </Route>
        </Switch>
    )
}

const DoctorRoutes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Doctor />
            </Route>
            <Route path="/checkdisease">
                <Scan />
            </Route>
            <Route path="/editprofile">
                <Settings />
            </Route>
        </Switch>
    )
}
