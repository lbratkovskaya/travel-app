import React, { useEffect } from 'react';
import {
  useTranslation,
} from 'react-i18next';
import {
  useParams,
} from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import rootConnector, {
  rootProps,
} from '../../store/rootConnector';
import { URLParamTypes } from '../../types';
import Map from '../Map';
import CurrencyWidget from '../CurrencyWidget';
import Header from '../Header';
import TimeWidget from '../TimeWidget';
import WeatherWidget from '../WeatherWidget';
import {
  fetchReviews, fetchSights, setRate, setReviewWithRate,
} from '../../controller/handlers';
import { IAppState } from '../../store/types';

const CountryPage: React.FC<rootProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { countryId } = useParams<URLParamTypes>();
  const userName = useSelector((state: IAppState) => state.userName);
  const isLoggedIn = useSelector((state: IAppState) => state.loggedIn);
  // const currentRate = useSelector((state: IAppState) => state.sights[0]);

  useEffect(() => {
    dispatch(fetchSights(countryId));
  }, []);

  // TODO

  return (
    <>
      <Header />
      <Button onClick={() => {
        if (isLoggedIn && userName) {
          dispatch(setRate(userName, 'nnndfsdfasdgasdfad', 4));
        }
      }}
      >
        SET RATE/STAR_ICON
      </Button>
      {/* <span>{`Sight rate is: ${currentRate}`}</span> */}
      <Button onClick={() => {
        if (isLoggedIn && userName) {
          dispatch(setReviewWithRate(userName, 'nnndfsdfasdgasdfad', 82, 'wonderful!'));
        }
      }}
      >
        SET REVIEW
      </Button>
      <Button onClick={() => {
        dispatch(fetchReviews('asdfasdgasdfad'));
      }}
      >
        GET REVIEWS
      </Button>
      <div title={t(`${countryId}.name`)}>
        {t(`${countryId}.name`)}
      </div>
      <Map />
      <div title={t(`${countryId}.name`)}>{t(`${countryId}.name`)}</div>
      <WeatherWidget />
      <TimeWidget />
      <CurrencyWidget />
    </>
  );
};

export default rootConnector(CountryPage);
