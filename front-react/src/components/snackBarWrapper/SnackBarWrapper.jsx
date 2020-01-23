import React from '../../../node_modules/react';
import clsx from '../../../node_modules/clsx';
import CheckCircleIcon from '../../../node_modules/@material-ui/icons/CheckCircle';
import ErrorIcon from '../../../node_modules/@material-ui/icons/Error';
import InfoIcon from '../../../node_modules/@material-ui/icons/Info';
import CloseIcon from '../../../node_modules/@material-ui/icons/Close';
import { amber, green } from '../../../node_modules/@material-ui/core/colors';
import IconButton from '../../../node_modules/@material-ui/core/IconButton';
import SnackbarContent from '../../../node_modules/@material-ui/core/SnackbarContent';
import WarningIcon from '../../../node_modules/@material-ui/icons/Warning';
import { makeStyles } from '../../../node_modules/@material-ui/core/styles';


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const SnackBarWrapper = (props) => {
    const classes = useStyles();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}         
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    )
}

export default SnackBarWrapper
