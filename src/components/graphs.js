import React from "react";

import { Bar as Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import * as getdata from "../Services/graphsdata";

import Grid from "@material-ui/core/Grid";

export default function Graph() {
    const token = useSelector((state) => state.states.token);
    const [data, setdata] = React.useState(null);
    React.useEffect(() => {
        console.log(token)
        getdata.getglocusedata(token)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    setdata(res.data.record)
                }
            })
    }, [token])

    return (
        <div>
            {
                data ?
                    <Grid item xs={12}>
                        <Line
                            data={
                                {
                                    labels: data.fdates,
                                    datasets: [
                                        {
                                            label: 'FASTING SUGAR LEVELS',
                                            backgroundColor: 'rgba(20, 122, 214, 0.3)',
                                            borderColor: 'rgba(20, 122, 214, 0.5)',
                                            borderWidth: 2,
                                            data: data.fasting
                                        },
                                        {
                                            label: 'RANDOM SUGAR LEVELS',
                                            backgroundColor: 'rgba(121, 210, 222, 0.3)',
                                            borderColor: 'rgba(121, 210, 222, 0.5)',
                                            borderWidth: 2,
                                            data: data.random
                                        },
                                    ]
                                }
                            }
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
                                legend: {
                                    labels: {
                                        fontSize: 25,
                                    },
                                    position: "bottom"
                                },
                                elements: {
                                    line: {
                                        tension: 0.4,
                                    }
                                }
                            }}
                        />
                    </Grid>
                    : <Grid item xs={1} />

            }
        </div>
    )
}