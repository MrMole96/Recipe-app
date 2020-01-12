import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import './ModalWrapper.css';

const ModalWrapper = (props) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));


    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <div className='recipe__details__property'>
                        <h4>{props.recipe.difficulty}</h4>
                        <span>amount</span>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className='recipe__details__property'>
                        <h4>{props.recipe.numberOfPersons}</h4>
                        <span>calories</span>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className='recipe__details__property'>
                        <h4>1500</h4>
                        <span>unit</span>
                    </div>
                </Grid>
            </React.Fragment>
        );
    }
    let products = [];
    let steps = [];
    if (props.recipe.listOfProducts) {
        products = props.recipe.listOfProducts.map((item, index) => {
            return <li key={item.name + index}>{item.name} {index}{item.unit}</li>
        })
    }
    if (props.recipe.description) {
        steps = props.recipe.description.map((step, index) => {
            return <li className='steps-item' key={step + index}>{index}. {step}</li>
        })
    }

    return (



        <div>
            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                onClose={props.handleClose}
                fullWidth
                maxWidth='md'
            >
                <DialogTitle>{props.recipe.name}</DialogTitle>
                <DialogContent style={{ overflow: 'hidden' }}>
                    <Grid container spacing={3}>
                        <Grid item container xs={12} justify='space-between'>
                            <FormRow />
                        </Grid>
                        <Grid item container spacing={3}>
                            <Grid item xs={6}>
                                <img alt="ssss" width="260" src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
                                <ul className={'products'}>
                                    {products}
                                </ul>
                            </Grid>
                            <Grid item xs={6}>
                                <h4>Kroki:</h4>
                                <ul className={'steps'}>
                                    {steps}
                                </ul>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary" autoFocus>
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ModalWrapper
