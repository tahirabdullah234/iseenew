import React from "react";

import { Bar as Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import * as getdata from "../Services/graphsdata";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function GraphGlocuse({ userId }) {
    const token = useSelector((state) => state.states.token);
    const [data, setdata] = React.useState(null);

    const [snackbar, setsnackbar] = React.useState({
        open: false,
        msg: "",
        type: ""
    })
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setsnackbar({ ...snackbar, open: false });
    };


    React.useEffect(() => {
        setTimeout(
            () =>
                getdata.getglocusedatauser(token, userId)
                    .then(res => {
                        if (res.data.success) {
                            console.log(res.data)
                            setdata(res.data.record)
                        } else {
                            setdata(res.data.record)
                            setsnackbar({
                                ...snackbar,
                                open: true,
                                msg: "No Blood Glocuse Data Found",
                                type: "info"
                            })
                        }
                    })
            , 150)
    }, [])

    return (
        <div style={{ margin: "auto" }}>
            {
                data ?
                    <Grid item xs={12}>
                        <Line
                            data={
                                {
                                    labels: data.fdates,
                                    datasets: [
                                        {
                                            label: 'FASTING LEVEL',
                                            backgroundColor: 'rgba(20, 122, 214, 0.3)',
                                            borderColor: 'rgba(20, 122, 214, 0.5)',
                                            borderWidth: 2,
                                            data: data.fasting
                                        },
                                        {
                                            label: 'RANDOM LEVEL',
                                            backgroundColor: 'rgba(121, 210, 222, 0.3)',
                                            borderColor: 'rgba(121, 210, 222, 0.5)',
                                            borderWidth: 2,
                                            data: data.random
                                        },
                                    ]
                                }
                            }
                            height={300}
                            options={{
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true,
                                            },
                                        },
                                    ],
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            fontSize: 25,
                                        },
                                        position: "bottom"
                                    },
                                    fullSize: true
                                },
                            }}
                        />
                    </Grid>
                    :
                    <CircularProgress
                        style={{ marginRight: "20px", width: "103px", height: "101px" }}
                    />
            }
            <Snackbar open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity={snackbar.type}>
                    {snackbar.msg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export function GraphBp({ userId }) {
    const token = useSelector((state) => state.states.token);
    const [data, setdata] = React.useState(null);

    const [snackbar, setsnackbar] = React.useState({
        open: false,
        msg: "",
        type: ""
    })
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setsnackbar({ ...snackbar, open: false });
    };


    React.useEffect(() => {
        setTimeout(
            () =>
                getdata.getglocusedatauser(token, userId)
                    .then(res => {
                        if (res.data.success) {
                            console.log(res.data)
                            setdata(res.data.record)
                        } else {
                            setdata(res.data.record)
                            setsnackbar({
                                ...snackbar,
                                open: true,
                                msg: "No Blood Pressure Data Found",
                                type: "info"
                            })
                        }
                    })
            , 50)
    }, [token])
    // systolic upper - 120 ideal
    // distlic lower - 80 ideal

    return (
        <div style={{ margin: "auto" }}>
            {
                data ?
                    <Grid item xs={12}>
                        <Line
                            data={
                                {
                                    labels: data.dates,
                                    datasets: [
                                        {
                                            label: 'SYSTOLIC LEVEL',
                                            backgroundColor: 'rgba(20, 122, 214, 0.3)',
                                            borderColor: 'rgba(20, 122, 214, 0.5)',
                                            borderWidth: 2,
                                            data: data.systolic
                                        },
                                        {
                                            label: 'DISTOLIC LEVEL',
                                            backgroundColor: 'rgba(236, 102, 102, 0.3)',
                                            borderColor: 'rgba(236, 102, 102, 0.5)',
                                            borderWidth: 2,
                                            data: data.dystolic
                                        },
                                    ]
                                }
                            }
                            height={300}
                            options={{
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true,
                                            },
                                        },
                                    ],
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            fontSize: 25,
                                        },
                                        position: "bottom"
                                    },
                                    fullSize: true
                                },
                            }}
                        />
                    </Grid>
                    :
                    <CircularProgress
                        style={{ marginRight: "20px", width: "103px", height: "101px" }}
                    />
            }
            <Snackbar open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity={snackbar.type}>
                    {snackbar.msg}
                </Alert>
            </Snackbar>
        </div>
    )
}
