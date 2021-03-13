import React from 'react';
import {
  useTranslation,
} from 'react-i18next';
import {
  useParams,
} from 'react-router-dom';
import rootConnector, {
  rootProps,
} from '../../store/rootConnector';
import { URLParamTypes } from '../../types';
import Map from '../Map';
import CurrencyWidget from '../CurrencyWidget';
import Header from '../Header';
import TimeWidget from '../TimeWidget';
import WeatherWidget from '../WeatherWidget';

const CountryPage: React.FC<rootProps> = () => {
  const { t } = useTranslation();
  const { countryId } = useParams<URLParamTypes>();

  // TODO

  return (
    <>
      <Header />
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
