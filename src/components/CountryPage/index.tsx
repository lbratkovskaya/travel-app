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

const CountryPage: React.FC<rootProps> = () => {
  const { t } = useTranslation();

  const { countryId } = useParams<URLParamTypes>();

  // TODO

  return (
    <>
      <div title={t(`${countryId}.name`)}>{t(`${countryId}.name`)}</div>
      <Map />
    </>
  );
};

export default rootConnector(CountryPage);
