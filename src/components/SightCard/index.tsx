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
}));

const SightCard: React.FC<ISightCardProps> = (props: ISightCardProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const reviews = useSelector((state: IAppState) => state.reviews);
  const [showReviewModal, setShowReviewModal] = React.useState(false);
  const [isReview, setReview] = React.useState(false);
  const handleCloseReviewModal = () => setShowReviewModal(false);
  const handleShowReviewModal = () => setShowReviewModal(true);

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
            onClick={() => {
              handleShowReviewModal();
              setReview(false);
            }}
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
            onClick={() => {
              handleExpandClick();
              dispatch(fetchReviews(props.sightId));
            }}
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
            <CardHeader
              title={t('first_review')}
            />
            <Button onClick={() => {
              handleShowReviewModal();
              setReview(true);
            }}
            >
              {t('write_feedback')}
            </Button>
          </Card>
          )}
            {reviews && reviews.length > 0 && (
            <Button onClick={() => {
              handleShowReviewModal();
              setReview(true);
            }}
            >
              {t('write_feedback')}
            </Button>
            )}
            {reviews && reviews.map((review) => (
              <Card key={review.user + review.sightId}>
                <CardContent>
                  <div>
                    <span>
                      <Star />
                      {review.rate.toFixed(1)}
                    </span>
                    <span>
                      {review.user}
                    </span>
                  </div>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {review.review}
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
