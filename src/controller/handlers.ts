import { Dispatch } from 'redux';
import backendUrl from '../consts';

const handleLangChange = (lang: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'SET_LANG', payload: { lang } });
};

export default handleLangChange;

export const signInUser = (name: string, password: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'SHOW_LOADER', payload: { isLoading: true } });
  fetch(`${backendUrl}/auth/login`, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({ user: name, password }),
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((response) => {
    if (response.status === 200) {
      dispatch({ type: 'LOGGED_IN', payload: { loggedIn: true } });
      dispatch({ type: 'HIDE_LOADER', payload: { isLoading: false } });
      response.json().then((result) => {
        dispatch({ type: 'SET_USER_IMAGE', payload: { userImage: result.image } });
        dispatch({ type: 'SET_USER_NAME', payload: { userName: name } });
      });
    } else {
      dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: true } });
      dispatch({ type: 'HIDE_LOADER', payload: { isLoading: false } });
    }
  });
};

export const signUpUser = (name: string, email: string, password: string,
  image: ArrayBuffer|string|undefined) => (dispatch: Dispatch) => {
  dispatch({ type: 'SHOW_LOADER', payload: { isLoading: true } });
  fetch(`${backendUrl}/auth/register`, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({
      user: name,
      password,
      email,
      image: image?.toString(),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((response) => {
    if (response.status === 200) {
      dispatch({ type: 'REGISTRED', payload: { registred: true } });
      dispatch({ type: 'HIDE_LOADER', payload: { isLoading: false } });
    } else {
      response.json().then(() => {
        dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: true } });
        dispatch({ type: 'HIDE_LOADER', payload: { isLoading: false } });
      });
    }
  });
};

export const fetchCountries = () => (dispatch: Dispatch) => {
  dispatch({ type: 'SHOW_LOADER', payload: { isLoading: true } });
  fetch(`${backendUrl}/countries`).then((response) => {
    if (response.status === 200) {
      response.json().then((result) => {
        dispatch({ type: 'SET_COUNTRIES', payload: { countries: result } });
      });
    }
    dispatch({ type: 'HIDE_LOADER', payload: { isLoading: false } });
  });
};

export const fetchSights = (countryCode: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'SHOW_LOADER', payload: { isLoading: true } });
  fetch(`${backendUrl}/sights?countryId=${countryCode}`).then((response) => {
    if (response.status === 200) {
      response.json().then((result) => {
        dispatch({ type: 'SET_SIGHTS', payload: { sights: result } });
        dispatch({ type: 'CHOOSE_SIGHT', payload: { currentSight: result[0] } });
      });
    }
    dispatch({ type: 'HIDE_LOADER', payload: { isLoading: false } });
  });
};

export const fetchReviews = (sightId: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'SHOW_LOADER', payload: { isLoading: true } });
  fetch(`${backendUrl}/reviews?sightId=${sightId}`).then((response) => {
    if (response.status === 200) {
      response.json().then((result) => {
        dispatch({ type: 'SET_REVIEWS', payload: { reviews: result } });
      });
    }
    dispatch({ type: 'HIDE_LOADER', payload: { isLoading: false } });
  });
};

export const sendRate = (userName: string,
  sightId: string,
  rate: number) => (dispatch: Dispatch) => {
  dispatch({ type: 'SHOW_LOADER', payload: { isLoading: true } });
  dispatch({ type: 'REVIEW_SENT', payload: { isReviewSent: false } });
  fetch(`${backendUrl}/reviews/rate`, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({
      user: userName,
      sightId,
      rate,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((response) => {
    if (response.status === 200) {
      dispatch({ type: 'REVIEW_SENT', payload: { isReviewSent: true } });
    }
    dispatch({ type: 'HIDE_LOADER', payload: { isLoading: false } });
  });
};

export const sendReviewWithRate = (userName: string,
  sightId: string,
  rate: number,
  review: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'SHOW_LOADER', payload: { isLoading: true } });
  dispatch({ type: 'REVIEW_SENT', payload: { isReviewSent: false } });
  fetch(`${backendUrl}/reviews/review`, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({
      user: userName,
      sightId,
      rate,
      review,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((response) => {
    if (response.status === 200) {
      dispatch({ type: 'REVIEW_SENT', payload: { isReviewSent: true } });
    }
    dispatch({ type: 'HIDE_LOADER', payload: { isLoading: false } });
  });
};
