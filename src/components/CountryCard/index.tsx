import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

interface ICountryCardProps{
  title: string | null | undefined,
  pictureUrl: string,
  info: string | null | undefined,
  capital: string | null | undefined,
}

const CountryCard: React.FC<ICountryCardProps> = (props: ICountryCardProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
          {`${t('capital')}: ${props.capital}. \n${props.info}`}
          {props.info}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
