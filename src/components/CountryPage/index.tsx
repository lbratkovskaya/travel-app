import React, { useEffect, useState } from 'react';
import {
  useTranslation,
} from 'react-i18next';
import {
  useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import { Button } from '@material-ui/core';
import rootConnector, { rootProps } from '../../store/rootConnector';
import { Country, Sight, URLParamTypes } from '../../types';
import { IAppState } from '../../store/types';
import Map from '../Map';
import CurrencyWidget from '../CurrencyWidget';
import Header from '../Header';
import TimeWidget from '../TimeWidget';
import WeatherWidget from '../WeatherWidget';
import { fetchSights } from '../../controller/handlers';
import SightCard from '../SightCard';
import CountryCard from '../CountryCard';
import Footer from '../Footer';
import './CountryPage.scss';
import DraggableWrapper from '../DraggableWrapper';
import {
  getCapitalTranslated,
  getCountryInfoTranslation,
  getCountryNameTranslation,
  getSightInfoTranslation,
  getSightTitleTranslation,
} from '../../controller/utils';

const CountryPage: React.FC<rootProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { countryId } = useParams<URLParamTypes>();
  // const userName = useSelector((state: IAppState) => state.userName); // I will need it
  // const isLoggedIn = useSelector((state: IAppState) => state.loggedIn); // I will need it
  // const currentRate = useSelector((state: IAppState) => state.sights[0]); // I will need it
  const countries = useSelector((state: IAppState) => state.countriesList);
  const language = useSelector((state: IAppState) => state.lang);
  const country = countries?.find((element: Country) => element.id === countryId);
  const videoUrl = country?.videoURL;
  let sights = useSelector((state: IAppState) => state.sights);
  sights = sights || [];
  const [sight, selectSight] = useState<Sight>(sights[0]);

  useEffect(() => {
    dispatch(fetchSights(countryId));
  }, []);

  const renderSlide = (sightElement: Sight) => (
    <div key={sightElement.pictureURL}>
      <div className="slider-content">
        <Button onClick={() => { selectSight(sightElement); }}>
          {t('more_info')}
        </Button>
        <div
          className="slide-photo"
          style={{ backgroundImage: `url(${sightElement.pictureURL})` }}
        />
        <div
          className="slide-title"
        >
          {language === 'en' && sightElement.titleEN}
          {language === 'ru' && sightElement.titleRU}
          {language === 'de' && sightElement.titleDE}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="country-page-content">
        {country
          && (
            <CountryCard
              title={getCountryNameTranslation(country, language)}
              pictureUrl={country.pictureURL}
              info={getCountryInfoTranslation(country, language)}
              capital={getCapitalTranslated(country, language)}
            />
          )}
        {videoUrl
          && (
            <ReactPlayer
              playing={false}
              width="600px"
              height="400px"
              controls
              url={videoUrl}
            />
          )}
        <div title={t(`${countryId}.name`)}>
          {t(`${countryId}.name`)}
        </div>
        <Map />
        <div title={t(`${countryId}.name`)}>{t(`${countryId}.name`)}</div>
        <DraggableWrapper top={50} right={10}>
          <WeatherWidget />
        </DraggableWrapper>
        <DraggableWrapper top={250} right={10}>
          <TimeWidget />
        </DraggableWrapper>
        <DraggableWrapper top={395} right={10}>
          <CurrencyWidget />
        </DraggableWrapper>
        <Slider
          className="slider"
          slidesToShow={1}
          slidesToScroll={1}
          speed={500}
          dots
          swipeToSlide
          accessibility
          centerMode
          autoplay
          autoplaySpeed={3000}
          pauseOnHover
          pauseOnDotsHover
          variableWidth
          focusOnSelect
          adaptiveHeight
        >
          {sights?.map((element: Sight) => renderSlide(element))}
        </Slider>
        {sight && (
          <SightCard
            title={getSightTitleTranslation(sight, language)}
            pictureUrl={sight.pictureURL}
            info={getSightInfoTranslation(sight, language)}
            /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
            sightId={sight._id}
            rate={sight.rate.toFixed(1)}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default rootConnector(CountryPage);
