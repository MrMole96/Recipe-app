import React from 'react'
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import './task.css'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
const task = props => {
    return (
        <ListItem className={'task'} key={props.key}>
            <ListItemIcon>
               <h3>{props.index+1}.</h3> 
            </ListItemIcon>
            <ListItemText style={{ wordWrap: 'break-word', paddingRight: '45px' }}
                primary={props.description}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => props.deleteHandler(props.index)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default task
