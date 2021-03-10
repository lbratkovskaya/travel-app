import React from 'react';
import { Dispatch } from 'redux';
import { rootProps } from '../store/rootConnector';
import i18n from '../i18next';
import backendUrl from '../consts';

const handleLangChange = (props: rootProps, event: React.SyntheticEvent) => {
  const lng = event.currentTarget.id;
  props.setLang(lng);
  i18n.changeLanguage(lng);
};

export default handleLangChange;

export const signInUser = (name: string, password: string) => (dispatch: Dispatch) => {
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
      response.json().then((result) => {
        dispatch({ type: 'SET_USER_IMAGE', payload: { userImage: result.image } });
        dispatch({ type: 'SET_USER_NAME', payload: { userName: name } });
      });
    } else {
      dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: true } });
    }
  });
};

export const signUpUser = (name: string, email: string, password: string,
  image: ArrayBuffer|string|undefined) => (dispatch: Dispatch) => {
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
    } else {
      response.json().then(() => {
        dispatch({ type: 'FAILED_ATTEMPT', payload: { failedAttempt: true } });
      });
    }
  });
};
