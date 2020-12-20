import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/alert';
import Card from '@material-ui/core/Card';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Asidebar from '../components/Asidebar';
import ListItem from '../components/ListItem';

import CustomAlert from '../components/CustomAlert';
import Header from '../components/Header';

import api from '../services/api';
import findMachineStyles from '../assets/styles/views/findMachineStyles';

import { userIsAdmin } from '../services/user';

const useStyles = makeStyles(findMachineStyles);

export default function FindMachine() {
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [machinesResult, setMachinesResult] = useState([]);
    const [selectedMachine, selectMachine] = useState({});
    const [hideMachinesList, setHideMachinesList] = useState(false);

    useEffect(() => {
        api.get(`/find?${query.toString()}`).then(resp => {
            setMachinesResult(resp.data);
        })
    });

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    function handleSelectMachine(mac) {
        selectMachine(mac);
        setHideMachinesList(true);
    }

    function setAlert(message, type = "success") {
        setAlertMessage(message);
        setAlertType(type);
        if (type === 'success') {
            setTimeout(() => { setAlertMessage('') }, 3000);
        }
    }

    function handleDelete(props) {
        console.log(props)
        api.delete('/machines', { data: { _id: props._id } }).then(resp => {
            setAlert('Maquina excluida com sucesso!');
        })
    }

    return (
        <div className={classes.typesContainer}>
            <Asidebar />
            <CustomAlert close onButtonClick={() => setAlertMessage('')} alertMessage={alertMessage} alertType={alertType} />
            <div className={classes.typesContent}>
                <Card className={classes.cardContainer}>
                    <Header title={hideMachinesList ? "Informações do Equipamento" : "Máquinas encontradas"} />
                    {machinesResult.length === 0 && <Alert severity='error'> Nenhuma máquina encontrada </Alert>}
                    {machinesResult && !hideMachinesList && machinesResult.map(machine => <ListItem
                        name={machine.serialNumber}
                        hideDelete={!userIsAdmin()}
                        secondary={machine.typeId.name}
                        {...machine}
                        edit={handleSelectMachine}
                        delete={handleDelete}
                    />)}

                    {hideMachinesList && <div className={classes.infoMachineContainer}>
                        <div className={classes.infoMachineItem}><strong>Número de Série: </strong>{selectedMachine.serialNumber}</div>
                        <div className={classes.infoMachineItem}><strong>Cliente:</strong> {selectedMachine.clientId.name}</div>
                        <div className={classes.infoMachineItem}><strong>Categoria:</strong> {selectedMachine.typeId.name}</div>
                        <div className={classes.infoMachineItem}><strong>Criado em:</strong> {`${new Date(selectedMachine.createdAt).getDate()}-${new Date(selectedMachine.createdAt).getMonth() + 1}-${new Date(selectedMachine.createdAt).getFullYear()}`}</div>
                        <div className={classes.infoMachineItem}><strong>Descrição:</strong> {selectedMachine.description}</div>
                        {selectedMachine.imagesURL.length > 0 && <div className={classes.infoMachineItem}><strong>Imagens:</strong>
                            <div className={classes.imagesContainer}>
                                {selectedMachine.imagesURL.map(a => <a key={a.url} href={a.url} target="_blank">
                                    <img src={a.url} key={a.url} />
                                </a>)}
                            </div>
                        </div>}
                        <ButtonGroup className={classes.buttonGroup} disableElevation variant="contained" color="primary">
                            <Button onClick={() => { setHideMachinesList(false) }}>Voltar</Button>
                        </ButtonGroup>
                    </div>}
                </Card>
            </div>
        </div>
    );
}