import React from 'react';
import Dropzone from 'react-dropzone'
import { makeStyles } from '@material-ui/core';

const messageColors = {
    default: '#999',
    error: '#e57878',
    success: '#78e5d5'
};

const useStyles = makeStyles(theme => ({
    dragActive: {
        borderColor: '#78e5d5'
    },
    dragReject: {
        borderColor: '#e57878'
    },
    DropContainer: {
        border: '1px dashed #ddd',
        borderRadius: 4,
        cursor: 'pointer',
        padding: 5,
        transition: 'height 0.2s ease'
    },
    UploadMessage: {
        display: 'flex',
        color: messageColors.default,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px 0'
    }
}))

export default function Upload(props) {
    const classes = useStyles();

    function renderDragMessage(isDragActive, isDragReject) {
        if (!isDragActive) {
            return <p className={classes.UploadMessage} >Arraste imagens aqui...</p>
        }
        if (isDragReject) {
            return <p className={classes.UploadMessage} type='error'>Arquivo não suportado</p>
        }
        return <p className={classes.UploadMessage} type='success'>Solte os imagens aqui</p>
    }

    return (
        <Dropzone accept="image/*" onDropAccepted={props.onUpload}>
            { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                <div className={classes.DropContainer}
                    {...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
                >
                    <input {...getInputProps()} />
                    {renderDragMessage(isDragActive, isDragReject)}
                </div>
            )}
        </Dropzone>

    )
}
