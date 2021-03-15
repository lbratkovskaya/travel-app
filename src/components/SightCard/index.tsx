import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Star from '@material-ui/icons/Star';
import { fetchReviews } from '../../controller/handlers';
import { IAppState } from '../../store/types';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
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

interface ISightCardProps{
  sightId: string,
  title: string | null,
  pictureUrl: string,
  info: string | null,
  rate: string,
}

const SightCard: React.FC<ISightCardProps> = (props: ISightCardProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const reviews = useSelector((state: IAppState) => state.reviews);
  // const isLoading = useSelector((state: IAppState) => state.isLoading);//I will need it
  // const isLoggedIn = useSelector((state: IAppState) => state.loggedIn);

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.title}
      />
      <CardMedia
        className={classes.media}
        image={props.pictureUrl}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.info}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
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
          {reviews && reviews.map((review) => (
            <>
              <Typography paragraph>
                userName:
                {' '}
                {review.user}
                , userRate:
                {' '}
                {review.rate}
              </Typography>
              <Typography paragraph>
                user review:
                {' '}
                {review.review}
              </Typography>
              <Typography paragraph>
                _______________________________
              </Typography>
            </>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SightCard;
