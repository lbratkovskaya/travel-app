import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './Header';
import MainPage from './MainPage';
import CountryPage from './CountryPage';
import rootConnector, { rootProps } from '../store/rootConnector';
import './App.scss';

const App: React.FC<rootProps> = () => (
  <div className="App">
    <Header />
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

export default rootConnector(App);
