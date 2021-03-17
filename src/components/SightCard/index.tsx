import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Star from '@material-ui/icons/Star';
import { fetchReviews } from '../../controller/handlers';
import { IAppState } from '../../store/types';
import ReviewModal from '../ReviewModal';
import { ISightCardProps } from './ISightCardProps';

const useStyles = makeStyles(() => ({
  root: {
    margin: '3rem auto 0',
    maxWidth: 800,
    minHeight: 300,
  },
  header: {
    textAlign: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    margin: '1% 42%',
    background: 'rgba(0, 0, 0, 0.24)',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
    margin: '3% 5%',
    border: '1px solid rgba(0, 0, 0, 0.04)',
  },
  cardEmpty: {
    marginTop: '20px',
  },
  cardRate: {
    height: '20px',
  },
  cardContent: {
    width: '90%',
  },
}));

const SightCard: React.FC<ISightCardProps> = (props: ISightCardProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    dispatch(fetchReviews(props.sightId));
  };
  const reviews = useSelector((state: IAppState) => state.reviews);
  const [showReviewModal, setShowReviewModal] = React.useState(false);
  const [isReview, setReview] = React.useState(false);
  const handleCloseReviewModal = () => setShowReviewModal(false);
  const handleShowModal = () => setShowReviewModal(true);

  const handleShowRateModal = () => {
    handleShowModal();
    setReview(false);
  };
  const handleShowReviewModal = () => {
    handleShowModal();
    setReview(true);
  };

  useEffect(() => {
    dispatch(fetchReviews(props.sightId));
  }, [props.sightId]);

  return (
    <>
      <ReviewModal
        sightId={props.sightId}
        isReview={isReview}
        isOpen={showReviewModal}
        handleClose={handleCloseReviewModal}
      />
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          title={props.title}
        />
        {props.pictureUrl && (
        <CardMedia
          className={classes.media}
          image={props.pictureUrl}
        />
        )}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.info}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleShowRateModal}
          >
            <Star />
            <span>
              {props.rate}
            </span>
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {reviews && !reviews.length
          && (
          <Card>
            <CardContent>
              <Button className={classes.button} onClick={handleShowReviewModal}>
                {t('write_feedback')}
              </Button>
              <Typography
                className={classes.cardEmpty}
                variant="body2"
                component="p"
                color="textSecondary"
                align="center"
              >
                {t('first_review')}
              </Typography>
            </CardContent>
          </Card>
          )}
            {reviews && reviews.length > 0 && (
            <Button className={classes.button} onClick={handleShowReviewModal}>
              {t('write_feedback')}
            </Button>
            )}
            {reviews && reviews.map((review) => (
              <Card className={classes.card} key={review.user + review.sightId}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="body1" component="p" align="center">
                    {review.review}
                  </Typography>
                  <Typography
                    className={classes.cardRate}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="right"
                  >
                    {`★ ${review.rate.toFixed(1)}   ${review.user}`}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default SightCard;
