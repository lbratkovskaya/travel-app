import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { IAppState } from '../../store/types';
import { signUpUser } from '../../controller/handlers';

interface ISignUpProps {
  isOpen: boolean,
  handleClose: () => void;
  handleSnowSignInForm: () => void;
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
  avatar: {
    marginBottom: '8px',
  },
  userImage: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '24px',
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

const SignUpForm: React.FC<ISignUpProps> = (props: ISignUpProps) => {
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
  const { t } = useTranslation();
  const [userImageToUpload, setUserImageToUpload] = React.useState<string | ArrayBuffer>();

  const isRegistred = useSelector((state: IAppState) => state.registred);
  const isFailedAttempt = useSelector((state: IAppState) => state.failedAttempt);
  const isLoading = useSelector((state: IAppState) => state.isLoading);

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

  const handleSubmit = () => {
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
            {t('sign_up')}
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label={t('name')}
                  name="name"
                  autoComplete={t('name')}
                  error={userNameEmpty || isFailedAttempt}
                  helperText={(userNameEmpty && t('name_empty'))
                              || (isFailedAttempt && t('sign_up_error'))}
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
                  helperText={(userEmailEmpty && t('name_empty'))
                              || (emailInvalid && t('email_invalid'))}
                  label={t('email')}
                  name="email"
                  autoComplete={t('email')}
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
                  label={t('password')}
                  type="password"
                  id="password"
                  error={passwordTooShort}
                  helperText={passwordTooShort && t('password_invalid')}
                  autoComplete={t('password')}
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
                  label={t('confirm_password')}
                  type="password"
                  error={passwordMissmatch}
                  helperText={passwordMissmatch && t('passwords_error')}
                  id="confirm_password"
                  autoComplete={t('confirm_password')}
                  onChange={(event) => {
                    setConfirmPassword(event.currentTarget.value);
                  }}
                  onFocus={() => {
                    setPasswordMissmatch(false);
                  }}
                />
              </Grid>
            </Grid>
            {isLoading ? <CircularProgress className={classes.spinner} />
              : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {t('sign_up')}
                </Button>
              )}
            <Grid container justify="flex-end">
              <Grid item>
                <button
                  className={classes.button}
                  type="button"
                  onClick={() => {
                    props.handleClose();
                    props.handleSnowSignInForm();
                  }}
                >
                  {t('sign_in_form_switcher')}
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Modal>
  );
};

export default SignUpForm;
