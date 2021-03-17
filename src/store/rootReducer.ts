import { IAppState, RootReducerAction } from './types';

let initialState: IAppState = {
  loggedIn: false,
  registred: false,
  failedAttempt: false,
  userName: '',
  userImage: '',
  lang: 'en',
  isLoading: false,
  countries: [],
  countriesList: [],
  sights: [],
  reviews: [],
  isReviewSent: false,
};

const savedAppState = localStorage.getItem('appState');
if (savedAppState !== null) {
  initialState = JSON.parse(savedAppState);
}

const rootReducer = (state: IAppState = initialState, action: RootReducerAction) => {
  let newState = state;
  switch (action.type) {
    case 'SET_LANG':
      newState = { ...state, lang: action.payload.lang };
      break;
    case 'SET_COUNTRIES':
      if (action.payload.countries) {
        newState = {
          ...state,
          countries: [...action.payload.countries],
          countriesList: [...action.payload.countries],
        };
      }
      break;
    case 'FILTER_COUNTRIES':
      newState = { ...state, countries: action.payload.countries };
      break;
    case 'LOGGED_IN':
      newState = { ...state, loggedIn: action.payload.loggedIn };
      break;
    case 'REGISTRED':
      newState = { ...state, registred: action.payload.registred };
      break;
    case 'FAILED_ATTEMPT':
      newState = { ...state, failedAttempt: action.payload.failedAttempt };
      break;
    case 'SET_USER_IMAGE':
      newState = { ...state, userImage: action.payload.userImage };
      break;
    case 'SET_USER_NAME':
      newState = { ...state, userName: action.payload.userName };
      break;
    case 'SET_REVIEWS':
      newState = { ...state, reviews: action.payload.reviews };
      break;
    case 'SET_SIGHTS':
      newState = { ...state, sights: action.payload.sights };
      break;
    case 'CHOOSE_SIGHT':
      newState = { ...state, currentSight: action.payload.currentSight };
      break;
    case 'SHOW_LOADER':
      newState = { ...state, isLoading: action.payload.isLoading };
      break;
    case 'REVIEW_SENT':
      newState = { ...state, isReviewSent: action.payload.isReviewSent };
      break;
    case 'HIDE_LOADER':
      newState = { ...state, isLoading: action.payload.isLoading };
      break;
    default:
  }
  localStorage.setItem('appState', JSON.stringify(newState));
  return newState;
};

export default rootReducer;
