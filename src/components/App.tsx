import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MainPage from './MainPage';
import CountryPage from './CountryPage';
import handleLangChange from '../controller/handlers';
import rootConnector, { rootProps } from '../store/rootConnector';
import './App.scss';

const App: React.FC<rootProps> = (props: rootProps) => (
  <div className="App">
    Language:
    {' '}
    {props.lang}
    <Button
      id="ru"
      onClick={(e: React.SyntheticEvent) => handleLangChange(props, e)}
    >
      RU
    </Button>
    <Button
      id="de"
      onClick={(e: React.SyntheticEvent) => handleLangChange(props, e)}
    >
      DE
    </Button>
    <Button
      id="en"
      onClick={(e: React.SyntheticEvent) => handleLangChange(props, e)}
    >
      EN
    </Button>
    <BrowserRouter>
      <Switch>
        <Route path="/countries">
          <MainPage />
        </Route>
        <Route path="/country/:countryId">
          <CountryPage />
        </Route>
        <Redirect path="/" to="/countries" />
      </Switch>
    </BrowserRouter>
  </div>
);

export default rootConnector(App);
