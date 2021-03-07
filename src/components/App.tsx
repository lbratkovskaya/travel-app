import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MainPage from './MainPage';
import CountryPage from './CountryPage';
import handleLangChange from '../controller/handlers';
import rootConnector, { rootProps } from '../store/rootConnector';
import './App.scss';
import SignInForm from './RegForms/SignInForm';
import SignUpForm from './RegForms/SignUpForm';

// const [showSignUpForm, setShowSignUpForm] = React.useState(false);
// const handleCloseSignUpForm = () => setShowSignUpForm(false);
// const handleShowSignUpForm = () => {
//   setShowSignUpForm(true);
// };

const App: React.FC<rootProps> = (props: rootProps) => {
  const [showSignInForm, setShowSignInForm] = React.useState(false);
  const handleCloseSignInForm = () => setShowSignInForm(false);
  const handleShowSignInForm = () => setShowSignInForm(true);

  const [showSignUpForm, setShowSignUpForm] = React.useState(false);
  const handleCloseSignUpForm = () => setShowSignUpForm(false);
  const handleShowSignUpForm = () => setShowSignUpForm(true);

  return (
    <div className="App">
      {/* <SignInForm show={showSignInForm} onHide={handleCloseSignInForm}/>
      <SignUpForm show={showSignUpForm} onHide={handleCloseSignUpForm}/> */}
      <Button type="button" onClick={handleShowSignInForm}>
        open sign in form
      </Button>
      <Button type="button" onClick={handleShowSignUpForm}>
        open sign up form
      </Button>
      <SignInForm isOpen={showSignInForm} handleClose={handleCloseSignInForm} />
      <SignUpForm isOpen={showSignUpForm} handleClose={handleCloseSignUpForm} />
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
