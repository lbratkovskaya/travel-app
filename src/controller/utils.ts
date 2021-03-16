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
        default:
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
    default:
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
    default:
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
    default:
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
    default:
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
    default: capitalTranslated = country.capitalEN;
  }
  return capitalTranslated;
};
