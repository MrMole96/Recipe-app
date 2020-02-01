import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import { SnackBarWrapper } from '../../components/snackBarWrapper/SnackBarWrapper'
import { connect } from 'react-redux'
import { closeSnackBar } from '../../actions/snackBarActions';

class SnackBar extends Component {

    closeSnackBar() {
        console.log("CLOSE")
        this.props.dispatch(closeSnackBar())
    }

    render() {
        console.log('this.props.snackBar', this.props.snackBar)
        return (
            <Snackbar
                open={this.props.snackBar.open}
                onClose={() => this.closeSnackBar()}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            //autoHideDuration={6000}
            >
                <SnackBarWrapper
                    variant={this.props.snackBar.variant}
                    message={this.props.snackBar.message}
                    onClose={() => this.closeSnackBar()} />
            </Snackbar >
        )
    }
}
function mapStateToProps(state) {
    console.log('state', state)
    return { snackBar: state.snackBar }
}

export default connect(mapStateToProps)(SnackBar)
