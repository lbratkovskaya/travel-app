import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../controller/handlers';
import { IAppState } from '../../store/types';

interface ISignUpProps {
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
  avatar: {
    // backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },
  userImage: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpForm: React.FC<ISignUpProps> = (props:ISignUpProps) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordMissmatch, setPasswordMissmatch] = React.useState(false);
  const [passwordTooShort, setPasswordTooShort] = React.useState(false);
  const [emailInvalid, setEmailInvalid] = React.useState(false);
  const [userNameEmpty, setUserNameEmpty] = React.useState(false);
  const [userEmailEmpty, setUserEmailEmpty] = React.useState(false);

  const [userImageToUpload, setUserImageToUpload] = React.useState<string | ArrayBuffer>();

  const isRegistred = useSelector((state: IAppState) => state.registred);
  const isFailedAttempt = useSelector((state: IAppState) => state.failedAttempt);

  const handleClose = () => {
    setEmailInvalid(false);
    setUserEmailEmpty(false);
    setPasswordMissmatch(false);
    setUserNameEmpty(false);
    setPasswordTooShort(false);
    setUserName('');
    setUserEmail('');
    setPassword('');
    setConfirmPassword('');
    dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: false } });
    props.handleClose();
  };

  React.useEffect(() => {
    if (isRegistred) {
      handleClose();
    }
  }, [isRegistred]);

  return (
    <Modal
      open={props.isOpen}
      onClose={() => {
        handleClose();
      }}
      onSubmit={(event) => {
        if (!isRegistred) {
          event.preventDefault();
        }
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              style={{ display: 'none' }}
              onChange={(event) => {
                if (event.currentTarget.files) {
                  const reader = new FileReader();
                  reader.readAsDataURL(event.currentTarget.files[0]);
                  reader.onloadend = () => {
                    if (reader.result) {
                      setUserImageToUpload(reader.result);
                    }
                  };
                }
              }}
            />
            <label htmlFor="contained-button-file">
              {userImageToUpload === undefined
                ? <LockOutlinedIcon />
                : <Avatar className={classes.userImage} src={userImageToUpload.toString()} />}
            </label>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={() => {
              // setIsRegistred(false)
              if (!userName.length) {
                setUserNameEmpty(true);
              } else if (!userEmail.length) {
                setUserEmailEmpty(true);
              } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
                setEmailInvalid(true);
              } else if (password.length < 6) {
                setPasswordTooShort(true);
              } else if (password !== confirmPassword) {
                setPasswordMissmatch(true);
              } else {
                dispatch(signUpUser(userName, userEmail, password, userImageToUpload));
              }
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  error={userNameEmpty || isFailedAttempt}
                  helperText={(userNameEmpty && 'enter name')
                              || (isFailedAttempt && 'name is already taken')}
                  onChange={(event) => {
                    setUserName(event.currentTarget.value);
                    dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: false } });
                  }}
                  onFocus={() => {
                    setUserNameEmpty(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  error={userEmailEmpty || emailInvalid}
                  helperText={(userEmailEmpty && 'enter email')
                              || (emailInvalid && 'email is invalid')}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setUserEmail(event.currentTarget.value);
                  }}
                  onFocus={() => {
                    setEmailInvalid(false);
                    setUserEmailEmpty(false);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={passwordTooShort}
                  helperText={passwordTooShort && 'password length should be more than 6 symbols'}
                  autoComplete="current-password"
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                  onFocus={() => {
                    setPasswordTooShort(false);
                    setPasswordMissmatch(false);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm password"
                  type="password"
                  error={passwordMissmatch}
                  helperText={passwordMissmatch && 'does not match'}
                  id="confirm_password password"
                  autoComplete="current-password"
                  onChange={(event) => {
                    setConfirmPassword(event.currentTarget.value);
                  }}
                  onFocus={() => {
                    setPasswordMissmatch(false);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                {/* <label onClick={() => { props.handleClose(); }}>
                  Already have an account? Sign in
                </label> */}
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Modal>
  );
};

export default SignUpForm;
