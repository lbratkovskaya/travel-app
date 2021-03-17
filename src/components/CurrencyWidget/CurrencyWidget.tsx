import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@material-ui/core';
import { AttachMoneyOutlined } from '@material-ui/icons';
import rootConnector,
{
  rootProps,
} from '../../store/rootConnector';
import { Country, URLParamTypes } from '../../types';
import { CurrencyData } from './types';
import {
  API_URL_NO_PARAM,
  ROUND_RATE,
} from './constants';
import './CurrencyWidget.scss';

const CurrencyWidget: React.FC<rootProps> = (props: rootProps) => {
  const { countryId } = useParams<URLParamTypes>();
  const [currencyData, setCurrencyData] = useState<{ [key: string]: number } | null>({});
  const [isLoading, setLoading] = useState<boolean>(true);
  const { countries } = props;

  const { t } = useTranslation();

  const currentCountry: Country | undefined = countries && countries
    .find((country: Country) => country.id === countryId);
  const currency: string | undefined = currentCountry?.currency;

  useEffect(() => {
    if (currency) {
      const API_URL = `${API_URL_NO_PARAM}curr=${currency}`;

      fetch(API_URL)
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response;
        })
        .then((res) => res.json())
        .then((data: CurrencyData) => {
          const fetchedData: { [key: string]: { rate: number } } = { ...data.rates };
          const cData = {} as { [key: string]: number };

          cData.USD = 1 / fetchedData[`USD${currency}`].rate;
          cData.EUR = cData.USD * fetchedData.USDEUR.rate;
          cData.RUB = cData.USD * fetchedData.USDRUB.rate;
          setCurrencyData(cData);
          setLoading(false);
        })
        .catch(() => {
          setCurrencyData(null);
          setLoading(false);
        });
    }
  }, []);

  const getCurrencies = (): JSX.Element[] => Object.entries(currencyData || {})
    .map(([key, value]) => (
      <div key={key}>
        <span>{1}</span>
        <span className="curr-key">{`${currency} = `}</span>
        <span>{`${Math.round(value * ROUND_RATE) / ROUND_RATE} `}</span>
        <span className="curr-key">{`${key}`}</span>
      </div>
    ));

  const countryName: string = t(`${currentCountry?.id}.name`);
  const errorMessage: string = t('currency_fetch_error', { countryName });
  return (
    <div className="currency-widget">
      <div className="currency-widget-icon">
        <AttachMoneyOutlined />
      </div>
      {isLoading ? <CircularProgress /> : null}
      {currencyData
        ? (
          <div className="currency-widget-data">
            {getCurrencies()}
          </div>
        )
        : (
          <div className="widget-error">
            {errorMessage}
          </div>
        )}
    </div>
  );
};

export default rootConnector(CurrencyWidget);
