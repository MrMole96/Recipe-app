import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import "./Task.css";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
const task = props => {
  return (
    <ListItem className={"task"}>
      <ListItemIcon>
        <h3>{props.index + 1}.</h3>
      </ListItemIcon>
      <ListItemText
        style={{ wordWrap: "break-word", paddingRight: "45px" }}
        primary={props.description.text}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          onClick={() => props.showTaskHandler(props.description)}
        >
          <ZoomOutMapIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => props.deleteHandler(props.task, props.index)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default task;
