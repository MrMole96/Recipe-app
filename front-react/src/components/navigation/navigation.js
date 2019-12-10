import React from 'react'
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import { amber } from '@material-ui/core/colors';

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
const NavButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(amber[300]),
    margin: '0 5px',
    backgroundColor: amber[300],
    '&:hover': {
      backgroundColor: amber[700],
    },
  },
}))(Button);

const Navigation = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="primary"  elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>        
        <Typography variant="h6" className={classes.title}>
         Swiat przepisow
        </Typography>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/products"><NavButton>Products</NavButton></Link>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/recipes"><NavButton>Recipes</NavButton></Link>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/"><NavButton>Home</NavButton></Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
