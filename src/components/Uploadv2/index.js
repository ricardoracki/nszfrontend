import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import { DropContainer, UploadMessage } from './styles';


export default class Upload extends Component{
    state={
    
    }

    componentDidMount = () => {
        const date = new Date();

        this.setState({form: {
            dataFabricacao: date,
            
        }})
    }

    renderDragMessage = (isDragActive, isDragReject) => {
        if (!isDragActive) {
            return <UploadMessage>Arraste imagens aqui...</UploadMessage>
        }
        
        if (isDragReject) {
            return <UploadMessage type='error'>Arquivo não suportado</UploadMessage>
        }

        return <UploadMessage type='success'>Solte os imagens aqui</UploadMessage>
    }

    render() {
        const { onUpload } = this.props
        return (
            
            <Dropzone accept="image/*" onDropAccepted={onUpload}>
                { ( {getRootProps, getInputProps, isDragActive, isDragReject} ) => (
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()}/>
                        {this.renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>   
                ) }
            </Dropzone>
        
        )
    }
}