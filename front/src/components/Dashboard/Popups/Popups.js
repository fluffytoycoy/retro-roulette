import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import './Popups.scss';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: "far fa-check-circle",
  error: 'fas fa-exclamation-triangle',
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: 'rgb(0, 189, 0)',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 16,
    width: 16
  },
  iconVariant: {
    fontSize: 16,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <i className={`${icon} ${clsx(classes.iconVariant)}`}></i>
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <i className={`fas fa-times close ${clsx(classes.icon)}`}></i>
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'success']).isRequired,
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles2();
  const variantMessage = {
    success: "Changes submited successfully!",
    error: 'There was an error submiting your changes!',
  };

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    props.setPopup(false);
  }



  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={props.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={props.popupStatus}
          message={variantMessage[props.popupStatus]}
        />
      </Snackbar>
    </div>
  );
}
