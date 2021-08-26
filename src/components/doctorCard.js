import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import maleDoc from '../Assets/doctor-male.png';
import femaleDoc from '../Assets/doctor-female.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

export default function DoctorCard() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar>
                <img src={maleDoc} alt='Male Doctor Avatar' style={{ width: '100%', height: '100%' }} />
            </Avatar>
            <Avatar>
                <img src={femaleDoc} alt='Female Doctor Avatar' style={{ width: '100%', height: '100%' }} />
            </Avatar>
        </div>
    )
}