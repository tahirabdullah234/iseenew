import React from 'react';

import Drawer from "../components/drawer";
import { ManageBP as MBP } from "../components/manageBloodPressure";
import Grid from "@material-ui/core/grid";
export default function BP() {
    return (
        <Grid item xs={12}>
            <Grid item>
                <MBP />
            </Grid>
        </Grid>
    )
}

