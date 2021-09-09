import React from 'react';

import Drawer from "../components/drawer";
import { ManageBP as MBP } from "../components/manageBloodPressure";

export default function BP() {
    return (
        <div>
            <Drawer />
            <MBP />
        </div>
    )
}

