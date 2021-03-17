import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Map from '../Map';
import Video from './Video';
import { ICountryCardProps } from './ICountryCardProps';
import DraggableWrapper from '../DraggableWrapper';
import CurrencyWidget from '../CurrencyWidget';
import TimeWidget from '../TimeWidget';
import WeatherWidget from '../WeatherWidget';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 900,
    margin: '2rem auto',
  },
  media: {
    position: 'relative',
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  accordionRoot: {
    width: '100%',
    '&$expanded': {
      margin: 0,
    },
  },
  accordionHeading: {
    fontSize: '1rem',
    fontWeight: 600,
  },
  accordionDetails: {
    padding: 0,
  },
}));

const getWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

function useCurrentWidth() {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  return width;
}

const CountryCard: React.FC<ICountryCardProps> = (props: ICountryCardProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  let width = useCurrentWidth();

  width = (width > 400) ? 400 : width;

  const renderAccordion = (tag: string, content: JSX.Element) => (
    <Accordion square>
      <AccordionSummary
        aria-controls={`${tag}-content`}
        id={`${tag}-header`}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{t(tag)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {content}
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Card className={classes.root}>
      <CardHeader title={props.title} />
      <CardMedia className={classes.media} image={props.pictureUrl}>
        <DraggableWrapper top={width / 4} left={8}>
          <WeatherWidget />
        </DraggableWrapper>
        <DraggableWrapper top={8} left={8}>
          <TimeWidget />
        </DraggableWrapper>
        <DraggableWrapper top={8} right={8}>
          <CurrencyWidget />
        </DraggableWrapper>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {`${t('capital')}: ${props.capital}.`}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {props.info}
        </Typography>
      </CardContent>
      {renderAccordion('map', <Map />)}
      {renderAccordion('video', <Video url={props.videoURL} />)}
    </Card>
  );
};

export default CountryCard;
