import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { makeStyles } from '@material-ui/core';

import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';


const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 20,
        "& li": {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#444',
            "& + li": {
                marginTop: 15
            }
        }
    },
    fileInfo: {
        display: 'flex',
        alignItems: 'center',
        "& div": {
            display: 'flex',
            flexDirection: 'column',
            "& span": {
                fontSize: 120,
                color: '#999',
                marginTop: '5px',
                "& button": {
                    border: 0,
                    background: 'transparent',
                    color: '#e5e5e5',
                    marginLeft: '5',
                    cursor: 'pointer',
                }
            }

        }
    },
    preview: {
        width: 36,
        height: 36,
        borderRadius: 5,
        //backgroundImage: url(${props => props.src}),
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        marginRight: 10,
    }
}))

export default function FileList({ files, onDelete }) {
    const classes = useStyles();

    return <div className={classes.container}>
        {files.map(uploadedFile => (
            <li key={uploadedFile.id}>
                <div className={classes.fileInfo}>
                    <div className={classes.preview} style={{backgroundImage: uploadedFile.preview }} />
                    <div>
                        <strong>{uploadedFile.name}</strong>
                        <span>
                            {uploadedFile.readableSize}
                            {uploadedFile.url &&
                                <button onClick={() => onDelete(uploadedFile.deletehash)}>Excluir</button>
                            }
                        </span>
                    </div>
                </div>
                <div>
                    {!uploadedFile.uploaded && !uploadedFile.error && (
                        <CircularProgressbar
                            styles={{
                                root: { width: 24 },
                                path: { stroke: '#7159c1' }
                            }}
                            strokeWidth={10}
                            maxValue={100}
                            value={uploadedFile.progress}
                        />
                    )}

                    {uploadedFile.url && (
                        <a href={uploadedFile.url}
                            target="_blank"
                            rel="noopener noreferrer">
                            <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                        </a>
                    )}

                    {uploadedFile.uploaded && <MdCheckCircle size={24} color='#78e5d5' />}
                    {uploadedFile.error && <MdError size={24} color='#e57878' />}


                </div>
            </li>
        ))}
    </div>
}
