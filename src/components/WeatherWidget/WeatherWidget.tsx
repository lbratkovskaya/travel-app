import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import rootConnector,
{
  rootProps,
} from '../../store/rootConnector';
import { Country, URLParamTypes } from '../../types';
import { WeatherData } from './types';
import API_URL_NO_PARAM from './constants';
import './WeatherWidget.scss';
import './owf-font.scss';

const WeatherWidget: React.FC<rootProps> = (props: rootProps) => {
  const { countryId } = useParams<URLParamTypes>();
  const [weatherData, setWeatherData] = useState<WeatherData>({} as WeatherData);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { lang, countries } = props;

  const { t } = useTranslation();

  const currentCountry: Country | undefined = countries && countries
    .find((country: Country) => country.id === countryId);
  const latlng: [number, number] | undefined = currentCountry?.capitalLatLng;

  useEffect(() => {
    if (latlng) {
      const API_URL = `${API_URL_NO_PARAM}&lang=${lang}&lat=${latlng[0]}&lon=${latlng[1]}`;

      fetch(API_URL)
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response;
        })
        .then((res) => res.json())
        .then((data) => {
          const wData: WeatherData = {
            iconId: data.weather[0].id,
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed),
            description: data.weather[0].description,
          };
          setWeatherData(wData);
        })
        .catch((error) => setErrorMsg(error.toLocaleString(lang)));
    }
  }, [currentCountry, lang]);

  return (
    <div className="weather-widget">

      {weatherData
        ? (
          <>
            <div>
              <i className={`weather-widget-icon owf owf-${weatherData.iconId}`} />
            </div>
            <div className="weather-widget-temperature">
              {`${Math.round(weatherData.temperature)}\u00B0C`}
            </div>
            <div className="weather-widget-state">
              <span>{`${weatherData.description}, `}</span>
              <span>{`${t('wind')} ${weatherData.windSpeed} ${t('m_s')}, `}</span>
              <span>{`${t('r_h')} ${weatherData.humidity}%`}</span>
            </div>
          </>
        )
        : (
          <div className="widget-error">
            {`${t('weather_fetch_error')}${errorMsg}`}
          </div>
        )}
    </div>
  );
};

export default rootConnector(WeatherWidget);
