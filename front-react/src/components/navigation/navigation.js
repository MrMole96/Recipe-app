import React from 'react'
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
}));


const Navigation = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/products"><Button color="inherit">Products</Button></Link>

        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/"><Button color="inherit">Home</Button></Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
