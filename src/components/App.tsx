import React, { useEffect } from 'react';
import { getI18n } from 'react-i18next';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import rootConnector, { rootProps } from '../store/rootConnector';
import MainPage from './MainPage';
import CountryPage from './CountryPage';
import './App.scss';

const App: React.FC<rootProps> = (props: rootProps) => {
  useEffect(() => {
    getI18n().changeLanguage(props.lang);
  }, [props.lang]);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/country/:countryId">
            <CountryPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default rootConnector(App);
