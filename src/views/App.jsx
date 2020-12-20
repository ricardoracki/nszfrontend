import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Asidebar from '../components/Asidebar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Header from '../components/Header';

import api from '../services/api';
import appStyles from '../assets/styles/views/appStyles';

const useStyles = makeStyles(appStyles);

export default function Clients() {
    const classes = useStyles();
    const [allClients, setAllClients] = useState([]);
    const [allTypes, setAllTypes] = useState([]);


    useEffect(() => {
        api.get('/clients').then(resp => {
            const clients = resp.data;
            setAllClients(clients);
        })
        api.get('/types').then(resp => {
            const types = resp.data;
            setAllTypes(types);
        })
    }, []);

    return (
        <div className={classes.typesContainer}>
            <Asidebar />
            <div className={classes.typesContent}>
                <Card className={classes.cardContainer}>
                    <form action="/find" method='get'>
                        <Header title='Pesquisar Máquinas' subtitle='Selecione os Filtros da pesquisa' />
                        
                        <Grid container spacing={3} className={classes.marginTop}>
                            <Grid item xs={12} sm={6} direction='column' style={{ display: 'flex' }}>
                                <TextField
                                    id="serialNumber"
                                    name="ns"
                                    label='Número de Série'
                                    fullWidth
                                    autoComplete="serialNumber"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.marginTop}>
                                    Categoria
                                </InputLabel>
                                <Select
                                    labelId="typeId"
                                    label="Categoria"
                                    id="selectType"
                                    name="typeId"
                                    displayEmpty
                                    defaultValue=''
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    <MenuItem key="default type" value="" className={classes.selectItemDefault}>Não especificado</MenuItem>
                                    {allTypes.map(type => <MenuItem key={type._id} value={type._id}>{type.name}</MenuItem>)}
                                </Select>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.marginTop}>
                                    Cliente
                                </InputLabel>
                                <Select

                                    labelId="clientId"
                                    id="selectClient"
                                    name="clientId"
                                    displayEmpty
                                    defaultValue=''
                                >
                                    <MenuItem key="default client" value="" className={classes.selectItemDefault}>Não especificado</MenuItem>
                                    {allClients.map(client => <MenuItem key={client._id} value={client._id}>{client.name}</MenuItem>)}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} direction='column' style={{ display: 'flex' }}>
                                <TextField
                                    id="date"
                                    label="De:"
                                    name="initialDate"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                />
                                <TextField
                                    className={classes.marginTop}
                                    id="ate"
                                    label="Até:"
                                    name="finalDate"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            className={classes.marginTop}
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}>
                            Buscar
                        </Button>

                    </form>
                </Card>

            </div>
        </div>
    );
}