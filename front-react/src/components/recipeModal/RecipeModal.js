import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import Task from "../task/Task";

import './RecipeModal.css';

const RecipeModal = (props) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const {
        name,
        difficulty,
        numberOfPersons,
        listOfProducts,
        description,
    } = props.recipe;


    const descriptionToRender = description.map((task, index) => {
        console.log('TASK',task)
        return <Task key={index} index={index} description={task} showImg />;
    });

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth='md'
        >
            <DialogTitle>{name}</DialogTitle>
            <DialogContent>
                <Grid container justify="center" item spacing={3}>
                    <Grid item container>
                        <Grid item container justify="center" xs={12} sm={6}>
                            <img src="https://via.placeholder.com/300" width="300" />
                            {/* Zdjecie finalne i lista produktow */}
                        </Grid>
                        <Grid item container xs={12} sm={6}>
                            <Grid item container spacing={0} justify="space-around">
                                <Grid item>
                                    <div className="summary-header">
                                        <p>
                                            Stopien trudnosci: <b>{difficulty}</b>
                                        </p>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div className="summary-header">
                                        <p>
                                            Ilosc porcji: <b>{numberOfPersons}</b>
                                        </p>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div className="summary-header">
                                        <p>
                                            Szacowana ilosc kalorii:
                  <b>
                                                {" "}
                                                {listOfProducts.reduce((acc, obj) => acc + obj.calories, 0)}
                                            </b>
                                        </p>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <ul className="list-of-products">
                                    {listOfProducts.map((x, i) => (
                                        <li key={i}>
                                            {x.name} {x.quantity}
                                            {x.unit}
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <List style={{ width: "100%" }} dense>
                            {descriptionToRender}
                        </List>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary" autoFocus>
                    Zamknij
                    </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RecipeModal
