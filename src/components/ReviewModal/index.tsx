import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  TextField,
  Typography,
  Container,
  Modal,
  makeStyles,
  CircularProgress,
  CssBaseline,
} from '@material-ui/core';
import { IAppState } from '../../store/types';
import {
  fetchReviews,
  sendRate,
  sendReviewWithRate,
} from '../../controller/handlers';

interface IReviewModalProps {
  isOpen: boolean,
  handleClose: () => void,
  isReview: boolean,
  sightId: string,
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

const ReviewModal: React.FC<IReviewModalProps> = (props: IReviewModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: IAppState) => state.loggedIn);
  const isLoading = useSelector((state: IAppState) => state.isLoading);
  const userName = useSelector((state: IAppState) => state.userName);
  const isRevewSent = useSelector((state: IAppState) => state.isReviewSent);

  const { t } = useTranslation();

  const [rate, setRate] = React.useState(5);
  const [review, setReview] = React.useState('');
  const [reviewEmpty, setReviewEmpty] = React.useState(false);

  const handleClose = () => {
    setRate(5);
    setReview('');
    setReviewEmpty(false);
    dispatch({ type: 'REVIEW_SENT', payload: { isReviewSent: false } });
    dispatch(fetchReviews(props.sightId));
    props.handleClose();
  };

  const handleReviewSubmit = () => {
    if (!review.length) {
      setReviewEmpty(true);
    } else if (userName && rate) {
      dispatch(sendReviewWithRate(userName, props.sightId, rate, review));
    }
  };

  const handleRateSubmit = () => {
    if (userName && rate) {
      dispatch(sendRate(userName, props.sightId, rate));
    }
  };

  React.useEffect(() => {
    if (isRevewSent) {
      handleClose();
    }
  }, [isRevewSent]);

  if (isLoggedIn) {
    return (
      <Modal
        open={props.isOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        onClose={() => {
          handleClose();
        }}
        onSubmit={(event) => {
        // event.preventDefault();
          if (!isRevewSent || (props.isReview && !review.length)) {
            event.preventDefault();
          }
        }}
      >
        <Container className={classes.container} component="main" maxWidth="xs">
          {/* <div className={classes.paper}> */}
          <CssBaseline />
          <Typography component="h1" variant="h5">
            {props.isReview && t('give_your_feedback')}
            {!props.isReview && t('give_your_rate')}
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={() => {
              if (props.isReview) {
                handleReviewSubmit();
              } else {
                handleRateSubmit();
              }
              dispatch({ type: 'SET_RATE', payload: { currentRate: +rate } });
            }}
          >
            <TextField
              required
              type="number"
              defaultValue="5"
              InputProps={{
                inputProps: {
                  max: 5, min: 0,
                },
              }}
              label="rate"
              onChange={(event) => { setRate(+event.currentTarget.value); }}
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="rate"
              label={t('rate')}
              name="rate"
              autoComplete={t('rate')}
              error={userNameEmpty || isFailedAttempt}
              helperText={(userNameEmpty && t('name_empty')) || (isFailedAttempt && '')}
              onChange={(event) => {
                setUserName(event.currentTarget.value);
              }}
              onFocus={() => {
                setUserNameEmpty(false);
                dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: false } });
              }}
            /> */}
            {props.isReview
            && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="review"
              label={t('review')}
              type="review"
              id="review"
              autoComplete={t('review')}
              error={reviewEmpty}
              helperText={(reviewEmpty && t('review_empty'))}
              onChange={(event) => {
                setReview(event.currentTarget.value);
              }}
              onFocus={() => {
                setReviewEmpty(false);
              }}
            />
            )}
            {isLoading ? <CircularProgress className={classes.spinner} />
              : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {t('send_feedback')}
                </Button>
              )}
            {/* <Grid container justify="flex-end">
              <Grid item>
                <button
                  className={classes.button}
                  type="button"
                  onClick={() => {
                    props.handleClose();
                    //props.handleShowSignUpForm();
                  }}
                >
                  {t('sign_up_form_switcher')}
                </button>
              </Grid>
            </Grid> */}
          </form>
          {/* </div> */}
        </Container>
      </Modal>
    );
  }
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
        <div className={classes.paper}>
          <Typography>
            {t('login_first')}
          </Typography>
        </div>
      </Container>
    </Modal>
  );
};

export default ReviewModal;
