import { Country } from '../types';

export interface IAppState {
  lang: 'EN' | 'RU' | 'DE' | undefined,
  countries: Country[],
}

export interface RootReducerAction {
  type: string,
  payload: {
    lang?: 'EN' | 'RU' | 'DE',
    countries?: Country[],
  }
}
