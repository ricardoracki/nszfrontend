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
import typesStyles from '../assets/styles/views/typesStyles';

import {userIsAdmin} from '../services/user';

const useStyles = makeStyles(typesStyles);

export default function Types() {
    const classes = useStyles();
    const [_id, setId] = useState('');
    const [name, setName] = useState('');
    const [allTypes, setAlltypes] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        loadAllTypes();
    });

    function loadAllTypes() {
        api.get('types').then(resp => {
            const types = resp.data;
            setAlltypes(types);
        })
    }

    function handleDelete({_id}) {
        api.delete('/types', {data:{_id}}).then(resp => {
            if (resp.data.success) {
                loadAllTypes();
                setAlert('Tipo excluído com sucesso');
            }
        })
    }

    function handleSetUpdate({_id, name}) {
        setId(_id);
        setName(name);
    }

    function setAlert(message, type="success") {
        setAlertMessage(message);
        setAlertType(type);
        if (type === 'success') {
            setTimeout(() => { setAlertMessage('') }, 3000);
        }
    }

    function updateOrCreate() {
        if (_id !== '') {
            api.put('/types', { _id, name }).then(resp => {
                loadAllTypes();
                setName('');
                setId('');
                setAlert('Tipo atualizado com sucesso!');
            });
        } else {
            //validate
            if (!name) return setAlert('Nome não definido', 'error');
            api.post('/types', { name, machine: [] }).then(resp => {
                if (resp.data._id) {
                    setAlert('Tipo criado com sucesso!');
                    loadAllTypes();
                    setName('');
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
                    <Header title="Categorias" subtitle="Tipos de Máquinas"/>
                    {allTypes.map(props => <ListItem
                        key={props._id}
                        _id={props._id}
                        name={props.name}
                        hideDelete={!userIsAdmin()}
                        edit={handleSetUpdate}
                        delete={handleDelete}
                    />)}
                </Card>

                <Card className={classes.cardContainer}>
                    <Typography variant="h6" gutterBottom>
                        <Header title= {_id !== '' ? 'Editar Categoria de Máquina' : 'Criar Nova Categoria de Máquina'}
                            subtitle={_id !== '' ? 'Faça a alteração' : 'Defina um Nome'} />
                       
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="typeName"
                                name="typeName"
                                label={ _id !== '' ? "Alterar Nome da Categoria" : "Nome da Nova Categoria"}
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