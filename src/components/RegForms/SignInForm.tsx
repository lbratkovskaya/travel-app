import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Modal,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import { IAppState } from '../../store/types';
import { signInUser } from '../../controller/handlers';

interface ISignInProps {
  isOpen: boolean,
  handleClose: () => void;
  handleShowSignUpForm: () => void;
}

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#fff',
  },
  paper: {
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 0',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '8px',
  },
  submit: {
    margin: '24px 0 16px 0',
  },
  link: {
    color: 'blue',
  },
  button: {
    '&:hover': {
      border: 'none',
      outline: 'none',
      textDecoration: 'underline',
    },
    '&:focus': {
      border: 'none',
      outline: 'none',
    },
    '&:active': {
      border: 'none',
      outline: 'none',
    },
    color: 'blue',
    backgroundColor: '#fff',
    border: 'none',
  },
  spinner: {
    margin: '15px 0px',
  },
}));

const SignInForm: React.FC<ISignInProps> = (props: ISignInProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userNameEmpty, setUserNameEmpty] = React.useState(false);
  const [passwordEmpty, setPasswordEmpty] = React.useState(false);
  const isLoggedIn = useSelector((state: IAppState) => state.loggedIn);
  const isFailedAttempt = useSelector((state: IAppState) => state.failedAttempt);
  const isLoading = useSelector((state: IAppState) => state.isLoading);
  const { t } = useTranslation();

  const handleClose = () => {
    setPasswordEmpty(false);
    dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: false } });
    props.handleClose();
  };

  const handleSubmit = () => {
    if (!userName.length) {
      setUserNameEmpty(true);
    } else if (!password.length) {
      setPasswordEmpty(true);
    } else {
      dispatch(signInUser(userName, password));
    }
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      handleClose();
    }
  }, [isLoggedIn]);

  return (
    <Modal
      open={props.isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      onClose={() => {
        handleClose();
      }}
      onSubmit={(event) => {
        if (!isLoggedIn) {
          event.preventDefault();
        }
      }}
    >
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {t('sign_in')}
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label={t('name')}
              name="name"
              autoComplete={t('name')}
              error={userNameEmpty || isFailedAttempt}
              helperText={(userNameEmpty && t('name_empty')) || (isFailedAttempt && '')}
              onChange={(event) => {
                setUserName(event.currentTarget.value);
              }}
              onFocus={() => {
                setUserNameEmpty(false);
                dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: false } });
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('password')}
              type="password"
              id="password"
              autoComplete={t('password')}
              error={passwordEmpty || isFailedAttempt}
              helperText={(passwordEmpty && t('password_empty'))
                          || (isFailedAttempt && t('sign_in_eror'))}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
              onFocus={() => {
                setPasswordEmpty(false);
                dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: false } });
              }}
            />
            {isLoading ? <CircularProgress className={classes.spinner} />
              : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {t('sign_in')}
                </Button>
              )}
            <Grid container justify="flex-end">
              <Grid item>
                <button
                  className={classes.button}
                  type="button"
                  onClick={() => {
                    props.handleClose();
                    props.handleShowSignUpForm();
                  }}
                >
                  {t('sign_up_form_switcher')}
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Modal>
  );
};

export default SignInForm;
