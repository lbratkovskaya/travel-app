import { Country } from '../types';

export interface IAppState {
  lang: 'EN' | 'RU' | 'DE',
  countries: Country[],
}

export interface RootReducerAction {
  type: string,
  payload: {
    lang?: string,
    countries?: Country[],
  }
}
