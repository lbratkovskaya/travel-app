import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import rootConnector,
{
  rootProps,
} from '../../store/rootConnector';
import { Country, URLParamTypes } from '../../types';

const API_KEY = '2bd82ee7444fb5848885689e5988a2ca';

const ImagesGrid: React.FC<rootProps> = (props: rootProps) => {
  const { countryId } = useParams<URLParamTypes>();
  const [weatherData, setWeatherData] = useState({});
  const { countries } = props;

  const currentCountry: Country | undefined = countries.find((country: Country) => country.id === countryId);
  const latlng: [number, number] | undefined = currentCountry?.capitalLatLng;

  useEffect(() => {
    if (latlng) {
      const API_URL = `api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${API_KEY}`;

      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
        });
    }
  }, [currentCountry]);

  return (
    <div className="" />

  );
};

export default rootConnector(ImagesGrid);
