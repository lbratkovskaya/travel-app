import { useEffect, useState } from 'react';
import { Country, Sight } from '../types';

export const findCountry = (searchQuery: string,
  countries: Array<Country> | undefined,
  lang: string | undefined) => {
  if (countries) {
    return countries.filter((country: Country) => {
      switch (lang) {
        case 'de':
          if (country.nameDE.toLowerCase().includes(searchQuery.toLowerCase())
            || country.capitalDE.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
          break;
        case 'ru':
          if (country.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
            || country.capitalRU.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
          break;
        case 'en':
          if (country.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
            || country.capitalEN.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
          break;
        default: throw new Error('Unexpected language');
      }
      return false;
    });
  }
  return [];
};

export const getCountryInfoTranslation = (country: Country, lang?: 'en' | 'ru' | 'de') => {
  let countryInfo;
  switch (lang) {
    case 'de':
      countryInfo = country.infoDE;
      break;
    case 'ru':
      countryInfo = country.infoRU;
      break;
    case 'en':
      countryInfo = country.infoEN;
      break;
    default: throw new Error('Unexpected language');
  }
  return countryInfo;
};

export const getCountryNameTranslation = (country: Country, lang?: 'en' | 'ru' | 'de') => {
  let countryName;
  switch (lang) {
    case 'de':
      countryName = country.nameDE;
      break;
    case 'ru':
      countryName = country.nameRU;
      break;
    case 'en':
      countryName = country.nameEN;
      break;
    default: throw new Error('Unexpected language');
  }
  return countryName;
};

export const getSightInfoTranslation = (sight: Sight, lang?: 'en' | 'ru' | 'de') => {
  let sightInfo = null;
  switch (lang) {
    case 'de':
      sightInfo = sight.infoDE;
      break;
    case 'ru':
      sightInfo = sight.infoRU;
      break;
    case 'en':
      sightInfo = sight.infoEN;
      break;
    default: throw new Error('Unexpected language');
  }
  return sightInfo;
};

export const getSightTitleTranslation = (sight: Sight, lang?: 'en' | 'ru' | 'de') => {
  let sightTitle = null;
  switch (lang) {
    case 'de':
      sightTitle = sight.titleDE;
      break;
    case 'ru':
      sightTitle = sight.titleRU;
      break;
    case 'en':
      sightTitle = sight.titleEN;
      break;
    default: throw new Error('Unexpected language');
  }
  return sightTitle;
};

export const getCapitalTranslated = (country: Country, lang?: 'en' | 'ru' | 'de') => {
  let capitalTranslated;
  switch (lang) {
    case 'de':
      capitalTranslated = country.capitalDE;
      break;
    case 'ru':
      capitalTranslated = country.capitalRU;
      break;
    case 'en':
      capitalTranslated = country.capitalEN;
      break;
    default: throw new Error('Unexpected language');
  }
  return capitalTranslated;
};

const getWindowWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

export const useWindowWidth = () => {
  const [width, setWidth] = useState(getWindowWidth());

  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWindowWidth());
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  return width;
};
