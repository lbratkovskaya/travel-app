import React from 'react';
import { Link } from 'react-router-dom';
import {
  useTranslation,
} from 'react-i18next';
import Slider from 'react-slick';
import rootConnector, { rootProps } from '../../store/rootConnector';
import { Country } from '../../types';
import './MainSlider.scss';

const MainSlider: React.FC<rootProps> = (props: rootProps) => {
  const { countries } = props;
  const { t } = useTranslation();

  const renderSlide = (country: Country) => {
    let capital;

    switch (props.lang) {
      case 'ru':
        capital = country.capitalRU;
        break;
      case 'de':
        capital = country.capitalDE;
        break;
      default: capital = country.capitalEN;
    }

    return (
      <div key={country.pictureURL}>
        <div className="slider-content">
          <Link to={`/country/${country.id}`}>
            <div
              className="slide-photo"
              style={{ backgroundImage: `url(${country.pictureURL})` }}
            />
            <div className="slide-title">
              {t(`${country.id}.name`)}
              {`, ${capital}`}
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Slider
      className="slider"
      slidesToShow={1}
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
      arrows={false}
    >
      {countries?.map((country: Country) => renderSlide(country))}
    </Slider>
  );
};

export default rootConnector(MainSlider);
