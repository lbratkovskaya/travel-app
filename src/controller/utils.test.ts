import { Country } from '../types';
import {
  getCapitalTranslated,
  getCountryNameTranslation,
} from './utils';

const testCountry: Country = {
  id: 'test',
  pictureURL: '',
  nameEN: 'Test Country',
  nameRU: 'Тестовая страна',
  nameDE: 'Testland',
  capitalEN: 'Test Capital',
  capitalRU: 'Тестовая столица',
  capitalDE: 'Testkapital',
  infoEN: '',
  infoRU: '',
  infoDE: '',
  currency: 'RUB',
  videoURL: '',
  capitalTimeZone: 'Europe/Moscow',
};

describe('Utilities methods testing', () => {
  it('Expect russian capital title for russian language', () => {
    expect(getCapitalTranslated(testCountry, 'ru')).toEqual('Тестовая столица');
  });

  it('Expect throw error for no language for capital', () => {
    expect(() => {
      getCapitalTranslated(testCountry);
    }).toThrow('Unexpected language');
  });

  it('Expect russian country title for german language', () => {
    expect(getCountryNameTranslation(testCountry, 'de')).toEqual('Testland');
  });

  it('Expect english country title for english language', () => {
    expect(getCountryNameTranslation(testCountry, 'en')).toEqual('Test Country');
  });

  it('Expect throw error for no language', () => {
    expect(() => {
      getCountryNameTranslation(testCountry);
    }).toThrow('Unexpected language');
  });
});
