import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import rootConnector,
{
  rootProps,
} from '../../store/rootConnector';
import { Country, URLParamTypes } from '../../types';
import { WeatherData } from './types';
import API_URL_NO_PARAM from './constants';
import './index.scss';
import './owf-font.scss';

const WeatherWidget: React.FC<rootProps> = (props: rootProps) => {
  const { countryId } = useParams<URLParamTypes>();
  const [weatherData, setWeatherData] = useState({});
  const { lang, countries } = props;

  const currentCountry: Country | undefined = countries
    .find((country: Country) => country.id === countryId);
  const latlng: [number, number] | undefined = currentCountry?.capitalLatLng;

  useEffect(() => {
    if (latlng) {
      const API_URL = `${API_URL_NO_PARAM}&lang=${lang}&lat=${latlng[0]}&lon=${latlng[1]}`;

      fetch(API_URL)
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
        });
    }
  }, [currentCountry]);

  const data: WeatherData = weatherData as WeatherData;

  return (
    <div className="weather-widget">
      <div>
        <i className={`weather-icon owf owf-${data.iconId}`} />
      </div>
      <div className="weather-temperature">{`${Math.round(data.temperature)}\u00B0C`}</div>
      <div className="weather-state">
        <span>{`${data.description}, `}</span>
        <span>{`wind ${data.windSpeed} m/s, `}</span>
        <span>{`hum. ${data.humidity}%`}</span>
      </div>
    </div>
  );
};

export default rootConnector(WeatherWidget);
