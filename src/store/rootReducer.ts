import { IAppState, RootReducerAction } from './types';

// countries: [{
//   id: 'br',
//   name: 'Brazil',
//   pictureURL: 'https://i-fakt.ru/wp-content/uploads/2013/11/braz.jpg',
//   capitalLatLng: [-15.793889, -47.882778],
// },
// {
//   id: 'tz',
//   name: 'Tanzania',
//   pictureURL: 'https://i-fakt.ru/wp-content/uploads/2021/03/interesnye-fakty-1614802526.jpg',
//   capitalLatLng: [-6.173056, 35.741944],
// },
// {
//   id: 'sp',
//   name: 'Spain',
//   pictureURL: 'https://i-fakt.ru/wp-content/uploads/2019/12/fakty-barselona.jpg',
//   capitalLatLng: [40.416667, -3.716667],
// },
// {
//   id: 'ca',
//   name: 'Canada',
//   pictureURL: 'https://i-fakt.ru/wp-content/uploads/2019/12/fakty-monreal.jpg',
//   capitalLatLng: [45.4, -75.666667],
// },
// {
//   id: 'in',
//   name: 'India',
//   pictureURL: 'https://i-fakt.ru/wp-content/uploads/2019/10/fakty-india.jpg',
//   capitalLatLng: [28.613889, 77.208333],
// },
// {
//   id: 'ir',
//   name: 'Ireland',
//   pictureURL: 'https://i-fakt.ru/wp-content/uploads/2017/11/ireland.jpg',
//   capitalLatLng: [53.35, -6.266667],
// },
// {
//   id: 'ae',
//   name: 'United Arab Emirates',
//   pictureURL: 'https://i-fakt.ru/wp-content/uploads/2015/04/oaemirat.jpg',
//   capitalLatLng: [24.466667, 54.366667],
// },
// {
//   id: 'nz',
//   name: 'New Zealand',
//   pictureURL: 'https://i-fakt.ru/wp-content/uploads/2013/07/skytower3.jpeg',
//   capitalLatLng: [-41.3, 174.783333],
// },
// {
//   id: 'jp',
//   name: 'Japan',
//   pictureURL: 'https://i-fakt.ru/1/tokio.jpg',
//   capitalLatLng: [35.683333, 139.766667],
// },
// ],

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
    case 'SHOW_LOADER':
      newState = { ...state, isLoading: action.payload.isLoading };
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
