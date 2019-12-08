import React from 'react'
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import './task.css'
const task = props => {
    return (
        <li className="task">
            {props.index+1}. {props.description}
            <IconButton aria-label="delete" onClick={()=>props.deleteHandler(props.index)} style={{borderRadius:'50%'}}>
                <HighlightOffOutlinedIcon color="secondary" style={{ fontSize: 30 }} />
            </IconButton>
        </li>
    )
}

export default task
