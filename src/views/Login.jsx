import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import api from '../services/api';
import loginStyles from '../assets/styles/views/loginStyles';

import {login} from '../services/user';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(loginStyles);

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorUser, setErrorUser] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    function onSubmit(event) {
        event.preventDefault();

        setErrorUser(false);
        setErrorPassword(false);
        api.post('/signin', {name, password})
            .then(resp => {
                console.log(resp);
                if (resp.data.success) {
                    login(resp.data.user);
                    history.push('/');
                } else {
                    if (resp.data.message === "Senha errada"){
                        setErrorPassword(true);
                    } else {
                        setErrorUser(true);
                    }
                }
            }).catch(err => {
                if (err) console.log(err);
            }) 
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
        </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={errorUser}
                        required
                        fullWidth
                        id="name"
                        label="Usuário"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={errorPassword}
                        required
                        fullWidth
                        name="senha"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Lembrar Senha"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
          </Button>

                </form>
            </div>

        </Container>
    );
}