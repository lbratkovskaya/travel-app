import { Country } from '../types';

export interface IAppState {
  lang: 'EN' | 'RU' | 'DE' | undefined,
  countries: Country[],
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
    lang?: 'EN' | 'RU' | 'DE',
    countries?: Country[],
    loggedIn?: boolean,
    registred?: boolean,
    userName?: string,
    userImage?: string,
    failedAttempt?: boolean,
    isLoading?: boolean;
  }
}
