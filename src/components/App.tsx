import * as React from 'react';
import Button from '@material-ui/core/Button';
import handleLangChange from '../controller/handlers';
import rootConnector, { rootProps } from '../store/rootConnector';
import './App.scss';

const App: React.FC<rootProps> = (props: rootProps) => (
  <div className="App">
    Language:
    {' '}
    {props.lang}
    <Button
      id="RU"
      onClick={(e: React.SyntheticEvent) => handleLangChange(props, e)}
    >
      RU
    </Button>
    <Button
      id="DE"
      onClick={(e: React.SyntheticEvent) => handleLangChange(props, e)}
    >
      DE
    </Button>
    <Button
      id="EN"
      onClick={(e: React.SyntheticEvent) => handleLangChange(props, e)}
    >
      EN
    </Button>
  </div>
);

export default rootConnector(App);
