import { AccessTimeOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import rootConnector, { rootProps } from '../../store/rootConnector';
import { Country, URLParamTypes } from '../../types';
import './TimeWidget.scss';

const TimeWidget: React.FC<rootProps> = (props: rootProps) => {
  const { countryId } = useParams<URLParamTypes>();
  const [localTime, setLocalTime] = useState<Date>(new Date());
  const { lang, countries } = props;

  const currentCountry: Country | undefined = countries
    .find((country: Country) => country.id === countryId);
  const capitalTimeZone: string | undefined = currentCountry?.capitalTimeZone;

  useEffect(() => {
    const timer1 = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    return () => clearInterval(timer1);
  }, [currentCountry]);

  const timeZone = { timeZone: capitalTimeZone || 'UTC' } as Intl.DateTimeFormatOptions;

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    ...timeZone,
  } as Intl.DateTimeFormatOptions;

  return (
    <div className="time-widget">
      <div>
        <AccessTimeOutlined />
      </div>
      <div className="time-state">
        <span>{`${localTime?.toLocaleDateString(lang, timeZone)}`}</span>
        <span>{`${localTime?.toLocaleTimeString(lang, timeOptions)}`}</span>
      </div>
    </div>
  );
};

export default rootConnector(TimeWidget);
