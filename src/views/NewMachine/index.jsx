import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Paper from '@material-ui/core/Paper';
import { uniqueId } from 'lodash';
import filesize from 'filesize';


import Asidebar from '../../components/Asidebar';
import ListItem from '../../components/ListItem';
import Upload from '../../components/Uploadv2';
import ListUploadImages from '../../components/FileList';
import CustomAlert from '../../components/CustomAlert';
import Header from '../../components/Header';

import api from '../../services/api';
import { getUser } from '../../services/user';

import { TypesContainer, TypesContent, SelectContainer } from './styled';

export default class NewMachine extends React.Component {
    state = {
        //Send To Backend
        _id: '',
        serialNumber: '',
        description: '',
        clientId: '',
        typeId: '',
        //images
        imagesToUpload: [],

        //Load on Did Mount
        allClients: [],
        allTypes: [],

        //Message Interface
        alertMessage: '',
        alertType: ''
    }

    cleanState = () => {
        this.setState({
            _id: '',
            serialNumber: '',
            description: '',
            clientId: '',
            typeId: '',
            imagesToUpload: [],
            allClients: [],
            allTypes: [],
            alertMessage: '',
            alertType: ''
        })
    }

    updateState = (newData) => {
        this.setState({ ...this.state, ...newData })
    }

    componentDidMount = () => {
        //load all types
        api.get('/types').then(resp => {
            const allTypes = resp.data;
            this.updateState({ allTypes });

        })

        //load all clients
        api.get('/clients').then(resp => {
            const allClients = resp.data;
            this.updateState({ allClients });
        })
    }

    setAlert = (alertMessage, alertType = 'success') => {
        this.updateState({ alertMessage, alertType });
        if (alertType === 'success') setTimeout(() => { this.updateState({ alertMessage: '' }) }, 3000);
    }

    handleUpload = (files) => {
        const uploadedFiles = files.map(file => {
            return {
                file,
                id: uniqueId(),
                name: file.name,
                readableSize: filesize(file.size),
                preview: URL.createObjectURL(file),
                progress: 0,
                uploaded: false,
                error: false,
                url: null,
                deletehash: null
            }
        })

        this.updateState({ imagesToUpload: uploadedFiles });
        uploadedFiles.forEach(this.processUpload)
    }

    processUpload = (uploadedFile) => {

        const data = new FormData();
        data.append('image', uploadedFile.file);

        api.post('/upload', data, {
            onUploadProgress: e => {
                const progress = parseInt(Math.round(e.loaded * 100 / e.total));
                this.updateFile(uploadedFile.id, {
                    progress,
                })
            }
        }).then(response => {
            this.updateFile(uploadedFile.id, {
                uploaded: true,
                url: response.data.link,
                deletehash: response.data.deletehash
            })
        }).catch(e => {
            this.updateFile(uploadedFile.id, {
                error: true
            })
        })
    }

    updateFile = (id, data) => {
        const newImages = this.state.imagesToUpload.map(imageUploaded => {
            return id === imageUploaded.id ? { ...imageUploaded, ...data } : imageUploaded
        })
        this.updateState({ imagesToUpload: newImages })
    }

    handleDeleteImage = (deletehash) => {
        this.setAlert('Removendo Imagem!', 'info');
        api.delete(`/image/${deletehash}`).then(resp => {
            //removendo da lista
            if (resp.data.success) {
                this.setAlert('Imagem removida com Sucesso!')
                const newImages = this.state.imagesToUpload.filter(image => image.deletehash !== deletehash);
                this.updateState({ imagesToUpload: newImages });
            } else {
                this.setAlert(`Erro ao remover a imagem\n${resp.data.error}`, 'error');
            }
        })
    }

    handleSave = () => {
        this.setAlert('AGUARDE - Salvando Máquina!', 'info');
        const { serialNumber, description, imagesToUpload, typeId, clientId } = this.state;

        const { _id: userId } = getUser();

        const data = {
            serialNumber,
            userId,
            description,
            imagesURL: imagesToUpload,
            typeId,
            clientId
        }
        //validação

        if (!data.serialNumber) return this.setAlert('Número de série não definido!', 'error');
        if (!data.typeId) return this.setAlert('Categoria de máquina não definido!', 'error');
        if (!data.clientId) return this.setAlert('Cliente não definido!', 'error');
        if (imagesToUpload.filter(image => !image.uploaded).length > 0) return this.setAlert('Aguarde até que as imagens tenham sido processadas!', 'info')
        
        api.post('/machines', data).then(resp => {
            if (resp.data._id) {
                this.setAlert('Máquina salva com sucesso');
                setTimeout(() => this.cleanState(), 3);
            } else this.setAlert('Aconteceu um erro inesperado', 'error')
        }).catch(err => this.setAlert(err, 'error'))
    }

    render = () => {
        return (
            <TypesContainer>
                <Asidebar />
            <CustomAlert close onButtonClick={() => this.setAlert('', this.state.alertType)} alertType={this.state.alertType} alertMessage={this.state.alertMessage} />           
                
                <TypesContent>
                    <Card style={{ padding: 10, marginBottom: 5 }}>
                            <Header title={this.state._id !== '' ? 'Editar Máquina' : 'Criar Nova Máquina'}
                                subtitle='Complete as Informações' />
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={5}>
                                <TextField
                                    required
                                    id="serialNumber"
                                    name="serialNumber"
                                    label={this.state._id !== '' ? "Alterar Número de Série" : "Nome Número de Série"}
                                    fullWidth
                                    autoComplete="serialNumber"
                                    value={this.state.serialNumber}
                                    onChange={event => this.updateState({ serialNumber: event.target.value })}
                                />
                                <SelectContainer>
                                    <Select
                                        style={{ marginTop: 10 }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.typeId}
                                        onChange={event => this.updateState({ typeId: event.target.value })}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>Categoria de Máquina</MenuItem>
                                        {this.state.allTypes.map(type => <MenuItem key={type._id} value={type._id}>{type.name}</MenuItem>)}
                                    </Select>
                                    <Select
                                        style={{ marginTop: 10 }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.clientId}
                                        onChange={event => this.updateState({ clientId: event.target.value })}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>Cliente</MenuItem>
                                        {this.state.allClients.map(type => <MenuItem key={type._id} value={type._id}>{type.name}</MenuItem>)}
                                    </Select>
                                </SelectContainer>
                                <Typography variant="h6" style={{ fontSize: 16, marginTop: 20 }} gutterBottom >
                                    Informações Adicionais
                            </Typography>
                                <TextareaAutosize
                                    style={{ height: 200, width: '100%' }}
                                    aria-label="minimum height"
                                    rowsMin={10}
                                    
                                    onChange={event => this.updateState({ description: event.target.value })}
                                    value={this.state.description} />

                            </Grid>
                            <Grid item xs={12} sm={2}></Grid>
                            <Grid item xs={12} sm={5}>
                                <Typography variant="h6" style={{ fontSize: 16, marginTop: 20 }} gutterBottom >
                                    Imagens
                            </Typography>
                                <Upload onUpload={files => this.handleUpload(files)} />

                                {this.state.imagesToUpload.length > 0 && <ListUploadImages files={this.state.imagesToUpload} onDelete={this.handleDeleteImage} />}
                            </Grid>
                        </Grid>
                        <ButtonGroup style={{ marginTop: 10 }} disableElevation variant="contained" color="primary">
                            <Button onClick={this.handleSave}>{this.state._id !== '' ? 'Salvar Alterações' : 'Criar Novo'}</Button>
                            {this.state._id !== '' && <Button onClick={() => {

                            }}>Cancelar alterações</Button>}
                        </ButtonGroup>
                    </Card>

                </TypesContent>
            </TypesContainer>
        );
    }
}