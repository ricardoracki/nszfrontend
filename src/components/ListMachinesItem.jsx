import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';

export default function index(props) {
    return <ListItem>
        <ListItemText
            primary={props.name || ''}
            secondary={props.secondary || ''}
        />
        <ListItemSecondaryAction>
            <IconButton
                onClick={() => props.edit(props)}
                edge="end"
                aria-label="Editar">
                <BorderColorIcon color='primary'/>
            </IconButton>
            {!props.hideDelete && <IconButton 
                onClick={() => props.delete(props)}
                edge="end"
                aria-label="Deletar">
                <DeleteIcon color='error' />
            </IconButton>}
        </ListItemSecondaryAction>
    </ListItem>
}