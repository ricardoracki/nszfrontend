import React, { useState, useEffect } from 'react';
import {Alert} from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';

import customAlertStyles from '../assets/styles/components/customAlertStyles';

const useStyles = makeStyles(customAlertStyles);

export default function CustomAlert(props) {
    const classes = useStyles();
    const { alertType, alertMessage } = props;
    return <Alert
        style={{ opacity: alertMessage ? 1 : 0 }}
        className={classes.root}
        severity={alertType}
        action={
            props.close && <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={props.onButtonClick}
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
        }>
        <span className={classes.text}>{alertMessage}</span>



    </Alert>

}