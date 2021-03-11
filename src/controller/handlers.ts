import { Dispatch } from 'redux';
import { rootProps } from '../store/rootConnector';
import i18n from '../i18next';
import backendUrl from '../consts';

const handleLangChange = (props: rootProps, lng: string) => {
  props.setLang(lng);
  i18n.changeLanguage(lng);
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
