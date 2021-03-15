import { Country } from '../types';

const getCapitalTranslated = (country: Country, lang?: 'en' | 'ru' | 'de') => {
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

export default getCapitalTranslated;
