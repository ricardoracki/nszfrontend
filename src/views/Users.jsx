import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Asidebar from '../components/Asidebar';
import ListItem from '../components/ListItem';
import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';

import userStyles from '../assets/styles/views/userStyles';
import api from '../services/api';

const useStyles = makeStyles(userStyles);

export default function User() {
    const classes = useStyles();

    const [_id, setId] = useState('');
    const [name, setName] = useState('');
    const [level, setLevel] = useState(1);
    const [password, setPassword] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        loadAllUsers();
    }, []);

    function loadAllUsers() {
        api.get('/users').then(resp => {
            const users = resp.data;
            setAllUsers(users);
            console.log(users)
        })
    }

    function handleDelete({ _id }) {
        api.delete('/users', { data: { _id } }).then(resp => {
            if (resp.data.success) {
                loadAllUsers();
                setAlert('Usuário excluído com sucesso');
            }
        })
    }

    function handleSetUpdate({ _id, name, password, level }) {
        setId(_id);
        setName(name);
        setPassword(password);
        setLevel(level);
    }

    function handleSetLevel(event) {
        setLevel(event.target.value);
    }

    function setAlert(message, type = "success") {
        setAlertMessage(message);
        setAlertType(type);
        if (type === 'success') setTimeout(() => { setAlertMessage('') }, 3000);
    }

    function updateOrCreate() {
        if (_id !== '') {
            api.put('/users', { _id, name, password, level }).then(resp => {
                setAlert('Usuário atualizado com sucesso!');
                loadAllUsers();
                setName('');
                setId('');
                setPassword('');
                setLevel(1);
            });
        } else {
            if (!name) return setAlert('Nome de Usuário não definido!', 'error');
            if (!password) return setAlert('Senha do Usuário não definida!', 'error');
            api.post('/users', { name, level, password }).then(resp => {
                if (resp.data._id) {
                    setAlert('Usuário criado com sucesso!');
                    loadAllUsers();
                    setName('');
                    setId('');
                    setPassword('');
                    setLevel(1);
                } else {
                    setAlert('ocorreu um erro');
                }
            }).catch(err => { setAlert('erro no server') })
        }
    }

    return (
        <div className={classes.typesContainer}>
            <CustomAlert close onButtonClick={() => setAlertMessage('')} alertType={alertType} alertMessage={alertMessage} />
            <Asidebar />
            <div className={classes.typesContent}>

                <Card className={classes.cardContainer}>
                    <Header title="Usuários" />
                    {allUsers.map(props => <ListItem
                        secondary={props.level == 2 ? <span style={{ color: "red" }}>{props.name}</span> : <span style={{ color: "green" }}>{props.name}</span>}
                        key={props._id}
                        _id={props._id}
                        /* name={props.name} */
                        password={props.password}
                        level={props.level}
                        edit={handleSetUpdate}
                        delete={handleDelete}
                        hideDelete={props.name === "Admin"}
                    />)}
                </Card>

                <Card className={classes.cardContainer}>
                    <Header title={_id !== '' ? 'Editar Usuário' : 'Criar Novo Usuário'} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="typeName"
                                name="typeName"
                                label={_id !== '' ? "Alterar Nome do Usuário" : "Nome do Usuário"}
                                fullWidth
                                autoComplete="typeName"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                            <TextField
                                required
                                id="typeName"
                                name="typeName"
                                label={_id !== '' ? "Alterar Senha do Usuário" : "Senha do Usuário"}
                                fullWidth
                                autoComplete="typeName"
                                value={password}
                                type='password'
                                onChange={event => setPassword(event.target.value)}
                            />
                            <RadioGroup className={classes.radioContainer} aria-label="gender" name="level" value={level} onChange={handleSetLevel}>
                                <FormControlLabel value={1} control={<Radio checked={level == 1} />} label="Usuário" />
                                <FormControlLabel value={2} control={<Radio checked={level == 2} />} label="Administrador" />
                            </RadioGroup>

                        </Grid>
                    </Grid>
                    <ButtonGroup className={classes.buttonGroup} disableElevation variant="contained" color="primary">
                        <Button onClick={updateOrCreate}>{_id !== '' ? 'Salvar Alterações' : 'Criar Novo'}</Button>
                        {_id !== '' && <Button onClick={() => {
                            setId('');
                            setName('');
                            setPassword('');
                            setLevel(1);
                        }}>Cancelar alterações</Button>}
                    </ButtonGroup>
                </Card>

            </div>
        </div>
    );
}