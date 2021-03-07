import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../store/types';
import { signInUser } from '../../controller/handlers';

interface ISignInProps {
  isOpen: boolean,
  handleClose: ()=>void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInForm:React.FC<ISignInProps> = (props:ISignInProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userNameEmpty, setUserNameEmpty] = React.useState(false);
  const [passwordEmpty, setPasswordEmpty] = React.useState(false);
  const isLoggedIn = useSelector((state: IAppState) => state.loggedIn);
  const isFailedAttempt = useSelector((state: IAppState) => state.failedAttempt);

  const handleClose = () => {
    setPasswordEmpty(false);
    dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: false } });
    props.handleClose();
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
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={() => {
              if (!userName.length) {
                setUserNameEmpty(true);
              } else if (!password.length) {
                setPasswordEmpty(true);
              } else {
                dispatch(signInUser(userName, password));
              }
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Name"
              label="Name"
              name="name"
              autoComplete="name"
              error={userNameEmpty || isFailedAttempt}
              helperText={(userNameEmpty && 'enter name') || (isFailedAttempt && '')}
              autoFocus
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordEmpty || isFailedAttempt}
              helperText={(passwordEmpty && 'enter password')
                          || (isFailedAttempt && 'wrong name or password')}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
              onFocus={() => {
                setPasswordEmpty(false);
                dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: false } });
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                {/* <label onClick={() => { props.handleClose(); }}>
                  Don't have an account? Sign Up
                </label> */}
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Modal>
  );
};

export default SignInForm;
