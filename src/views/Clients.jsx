import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

import Asidebar from '../components/Asidebar';
import ListItem from '../components/ListItem';
import CustomAlert from '../components/CustomAlert';
import Header from '../components/Header';

import api from '../services/api';
import clientStyles from '../assets/styles/views/clientsStyles';
import { getUser, userIsAdmin } from '../services/user';

const useStyles = makeStyles(clientStyles);

export default function Clients() {
    const classes = useStyles();
    const [_id, setId] = useState('');
    const [name, setName] = useState('');
    const [allClients, setAllClients] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        loadAllClients();
    });

    function loadAllClients() {
        api.get('/clients').then(resp => {
            const clients = resp.data;
            setAllClients(clients);
        })
    }

    function handleDelete({ _id }) {
        api.delete('/clients', { data: { _id } }).then(resp => {
            if (resp.data.success) {
                loadAllClients();
                setAlert('Cliente excluído com sucesso');
            }
        })
    }

    function handleSetUpdate({ _id, name }) {
        setId(_id);
        setName(name);
    }

    function setAlert(message, type = "success") {
        setAlertMessage(message);
        setAlertType(type);
        if (type === 'success') setTimeout(() => { setAlertMessage('') }, 3000);
    }

    function updateOrCreate() {
        if (_id !== '') {
            api.put('/clients', { _id, name }).then(resp => {
                loadAllClients();
                setName('');
                setId('');
                setAlert('Cliente atualizado com sucesso!');
            });
        } else {
            if (!name) return setAlert('Nome não definido', 'error');
            api.post('/clients', { name, createdBy: getUser() }).then(resp => {
                if (resp.data._id) {
                    setAlert('Cliente criado com sucesso!');
                    loadAllClients();
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
                    <Header title="Clientes" />
                    {allClients.map(props => <ListItem
                        key={props._id}
                        _id={props._id}
                        name={props.name}
                        hideDelete={!userIsAdmin()}
                        edit={handleSetUpdate}
                        delete={handleDelete}
                    />)}
                </Card>

                <Card className={classes.cardContainer}>
                    <Header title={_id !== '' ? 'Editar Cliente' : 'Criar Novo Cliente'}/>                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="typeName"
                                name="typeName"
                                label={_id !== '' ? "Alterar Nome" : "Nome"}
                                fullWidth
                                autoComplete="typeName"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <ButtonGroup className={classes.buttonGroup} disableElevation variant="contained" color="primary">
                        <Button onClick={updateOrCreate}>{_id !== '' ? 'Salvar Alterações' : 'Criar Novo'}</Button>
                        {_id !== '' && <Button onClick={() => {
                            setId('');
                            setName('');
                        }}>Cancelar alterações</Button>}
                    </ButtonGroup>
                </Card>

            </div>
        </div>
    );
}