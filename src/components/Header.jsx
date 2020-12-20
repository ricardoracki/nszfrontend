import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

export default function Header(props) {
    return (<div class="container" style={{margimBottom: 10}}>
        <Typography variant="h5" component="h2">
            {props.title}
        </Typography>
        {props.subtitle && <Typography variant="h8" component="h6">
            {props.subtitle}
        </Typography>}
        <hr />
    </div>)
}