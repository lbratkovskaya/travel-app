import { Country, Review, Sight } from '../types';

export interface IAppState {
  lang: 'en' | 'ru' | 'de' | undefined,
  countries: Country[] | undefined,
  countriesList: Country[] | undefined,
  loggedIn: boolean | undefined,
  registred: boolean | undefined,
  userName: string | undefined,
  userImage: string | undefined,
  failedAttempt: boolean | undefined,
  isLoading: boolean | undefined,
  sights: Sight[] | undefined,
  reviews: Review[] | undefined,
  isReviewSent: boolean | undefined,
  currentSight?: Sight,
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
    isLoading?: boolean,
    sights?: Sight[],
    reviews?: Review[],
    isReviewSent?: boolean,
    currentSight?: Sight,
  }
}
