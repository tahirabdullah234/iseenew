import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

import PatientLogin from "../pages/patientlogin";
import PatientRegistration from "../pages/patientregistration";
import DoctorLogin from "../pages/doctorlogin";
import DoctorRegistration from "../pages/docreg";
import DoctorFP from "../pages/DoctorForgetPassword";
import PatientFP from "../pages/PatientForgetPassword";

import Patient from "../pages/patient";
import Appoint from "../pages/appointDoctor";
import BG from "../pages/bloodglocuse";
import BP from "../pages/bloodpressure";
import Reports from "../pages/drReports";
import Settings from "../pages/UserSettings";
import Scan from "../pages/checkdisease";
import Result from "../pages/results";
import UserInfo from "../pages/userinfo";
import Chat from "../pages/chat";
import Doctor from "../pages/doctor";

export default function Main() {
    const islogin = useSelector((state) => state.states.islogin)
    const isdoctor = useSelector((state) => state.states.isdoctor)
    const history = useHistory();
    // used redux to manage routing in our web application

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
                        <Route path="/forgotpassword">
                            {isdoctor ? <DoctorFP /> : <PatientFP />}
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
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
            <Route path="/result">
                <Result />
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
            <Route path="/messages">
                <Chat />
            </Route>
            <Route path="*">
                <Redirect to="/" />
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
            <Route path="/userinfo">
                <UserInfo />
            </Route>
            <Route path="/result">
                <Result />
            </Route>
            <Route path="/messages">
                <Chat />
            </Route>
            <Route path="*">
                <Redirect to="/" />
            </Route>
        </Switch>
    )
}
