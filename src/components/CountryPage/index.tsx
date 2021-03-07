import React from 'react';
import {
  useTranslation
} from 'react-i18next';
import {
  useParams,
} from 'react-router-dom';


export default function CountryPage(): JSX.Element {
  const { t } = useTranslation();

  const { countryId } = useParams<URLParamTypes>();

  // TODO
  
  return (<div title={t(`${countryId}.name`)}>{t(`${countryId}.name`)}</div>);
}
