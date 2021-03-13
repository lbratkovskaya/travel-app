import { Country } from '../types';

export interface IAppState {
  lang: 'en' | 'ru' | 'de' | undefined,
  countries: Country[] | undefined,
  countriesList: Country[] | undefined,
  loggedIn: boolean | undefined,
  registred: boolean | undefined,
  userName: string | undefined,
  userImage: string | undefined,
  failedAttempt: boolean | undefined,
  isLoading: boolean | undefined;
}

export interface RootReducerAction {
  type: string,
  payload: {
    lang?: 'en' | 'ru' | 'de',
    countries?: Country[],
    loggedIn?: boolean,
    registred?: boolean,
    userName?: string,
    userImage?: string,
    failedAttempt?: boolean,
    isLoading?: boolean;
  }
}
