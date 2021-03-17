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
  fetchSight,
  sendRate,
  sendReviewWithRate,
} from '../../controller/handlers';
import { IReviewModalProps } from './IReviewModalProps';

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
    dispatch(fetchSight(props.sightId));
    props.handleClose();
  };

  const handleSubmit = () => {
    if (props.isReview) {
      if (!review.length) {
        setReviewEmpty(true);
      } else if (userName && rate) {
        dispatch(sendReviewWithRate(userName, props.sightId, rate, review));
      }
    } else if (userName && rate) {
      dispatch(sendRate(userName, props.sightId, rate));
    }
  };

  const handleIsNotLoggedInClose = (event: React.SyntheticEvent) => {
    if (!isLoggedIn) {
      event.preventDefault();
    }
  };

  const handleModalCloseAfterReview = (event: React.SyntheticEvent) => {
    if (!isRevewSent || (props.isReview && !review.length)) {
      event.preventDefault();
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
        onClose={handleClose}
        onSubmit={handleModalCloseAfterReview}
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
            onSubmit={handleSubmit}
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
          </form>
        </Container>
      </Modal>
    );
  }
  return (
    <Modal
      open={props.isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      onClose={handleClose}
      onSubmit={handleIsNotLoggedInClose}
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
