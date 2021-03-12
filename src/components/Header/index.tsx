import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  fade,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Avatar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import rootConnector, { rootProps } from '../../store/rootConnector';
import handleLangChange from '../../controller/handlers';
import { IAppState } from '../../store/types';
import SignInForm from '../RegForms/SignInForm';
import SignUpForm from '../RegForms/SignUpForm';
import Search from './Search';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'none',
    boxShadow: 'none',
  },
  titleLogo: {
    display: 'flex',
    marginRight: 'auto',
    marginLeft: '2vh',
    alignItems: 'center',
    justifyContent: 'start',
  },
  grow: {
    flexGrow: 1,
    width: '100%',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '16px',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginTop: '6px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    height: '70%',
  },
  search_mobile: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginTop: '0px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    height: '70%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '8px 8px 8px 0',
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  circle: {
    height: '25px',
    width: '25px',
  },
}));

const Header: React.FC<rootProps> = (props: rootProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const language = useSelector((state: IAppState) => state.lang);
  const isLoggedIn = useSelector((state: IAppState) => state.loggedIn);
  const userName = useSelector((state: IAppState) => state.userName);
  const userImage = useSelector((state: IAppState) => state.userImage);

  const avatarSymbol = userName ? userName[0] : 'A';
  const userAvatar = (
    userImage
      ? <Avatar className={classes.circle} src={userImage} />
      : <Avatar className={classes.circle}>{avatarSymbol}</Avatar>
  );

  const avatarElement = !isLoggedIn
    ? <Avatar className={classes.circle} src="./assets/avatar.ico" />
    : userAvatar;

  const [showSignInForm, setShowSignInForm] = React.useState(false);
  const handleCloseSignInForm = () => setShowSignInForm(false);
  const handleShowSignInForm = () => setShowSignInForm(true);

  const [showSignUpForm, setShowSignUpForm] = React.useState(false);
  const handleCloseSignUpForm = () => setShowSignUpForm(false);
  const handleShowSignUpForm = () => setShowSignUpForm(true);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<Element>();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuOpen = (event: React.SyntheticEvent) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(undefined);
  };

  const [anchorLang, setAnchorLang] = React.useState<Element>();
  const isLangMenuOpen = Boolean(anchorLang);
  const handleLangMenuOpen = (event: React.SyntheticEvent) => {
    setAnchorLang(event.currentTarget);
  };
  const handleLangMenuClose = () => {
    setAnchorLang(undefined);
    handleMobileMenuClose();
  };

  const [anchorAuth, setAnchorAuth] = React.useState<Element>();
  const isAuthMenuOpen = Boolean(anchorAuth);
  const handleAuthMenuOpen = (event: React.SyntheticEvent) => {
    setAnchorAuth(event.currentTarget);
  };
  const handleAuthMenuClose = () => {
    setAnchorAuth(undefined);
    handleMobileMenuClose();
  };

  const [anchorLogOut, setAnchorLogOut] = React.useState<Element>();
  const isLogOutMenuOpen = Boolean(anchorLogOut);
  const handleLogOutMenuOpen = (event: React.SyntheticEvent) => {
    setAnchorLogOut(event.currentTarget);
  };
  const handleLogOutMenuClose = () => {
    setAnchorLogOut(undefined);
    handleMobileMenuClose();
  };

  const handleAuthUserMenuOpen = !isLoggedIn ? handleAuthMenuOpen : handleLogOutMenuOpen;
  const authId = !isLoggedIn ? 'menu-auth' : 'menu-logOut';
  const langId = 'menu-lang';
  const mobileMenuId = 'menu-mobile';

  const logOutMenu = (
    <Menu
      anchorEl={anchorLogOut}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="menu-logOut"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isLogOutMenuOpen}
      onClose={handleLogOutMenuClose}
      onClick={() => {
        dispatch({ type: 'LOGGED_IN', payload: { loggedIn: false } });
      }}
    >
      <MenuItem onClick={handleLogOutMenuClose}>
        {t('log_out')}
      </MenuItem>
    </Menu>
  );

  const authMenu = (
    <Menu
      anchorEl={anchorAuth}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="menu-auth"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isAuthMenuOpen}
      onClose={handleAuthMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleShowSignInForm();
          handleAuthMenuClose();
        }}
      >
        {t('sign_in')}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleShowSignUpForm();
          handleAuthMenuClose();
        }}
      >
        {t('sign_up')}
      </MenuItem>
    </Menu>
  );

  const langMenu = (
    <Menu
      anchorEl={anchorLang}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={langId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isLangMenuOpen}
      onClose={handleLangMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleLangChange(props, 'en');
          handleLangMenuClose();
        }}
      >
        {t('english')}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLangChange(props, 'ru');
          handleLangMenuClose();
        }}
      >
        {t('russian')}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLangChange(props, 'de');
          handleLangMenuClose();
        }}
      >
        {t('german')}
      </MenuItem>
    </Menu>
  );

  const mobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      { window.location.pathname === '/'
      && (
      <MenuItem>
        <div className={`${classes.search_mobile}`}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Search />
        </div>
      </MenuItem>
      )}
      <MenuItem onClick={handleLangMenuOpen}>
        <IconButton
          aria-label="Choose lang"
          aria-controls={langId}
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar className={classes.circle} src={`./assets/${language}.ico`} />
        </IconButton>
        <p>{t('language')}</p>
      </MenuItem>
      <MenuItem onClick={handleAuthUserMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls={authId}
          aria-haspopup="true"
          color="inherit"
        >
          {avatarElement}
        </IconButton>
        <p>{isLoggedIn ? t('log_out') : t('auth')}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <SignInForm
        isOpen={showSignInForm}
        handleClose={handleCloseSignInForm}
        handleShowSignUpForm={handleShowSignUpForm}
      />
      <SignUpForm
        isOpen={showSignUpForm}
        handleClose={handleCloseSignUpForm}
        handleSnowSignInForm={handleShowSignInForm}
      />
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <a href="/">
            <Avatar src="./assets/logo.svg" />
          </a>
          <Typography
            className={classes.titleLogo}
            variant="h6"
          >
            Travel app
          </Typography>
          <div className={classes.sectionDesktop}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Search />
            </div>
            <IconButton
              edge="end"
              aria-label="Choose language"
              aria-controls={langId}
              aria-haspopup="true"
              onClick={handleLangMenuOpen}
              color="inherit"
            >
              <Avatar className={classes.circle} src={`./assets/${language}.ico`} />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={authId}
              aria-haspopup="true"
              onClick={handleAuthUserMenuOpen}
              color="inherit"
            >
              {avatarElement}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {mobileMenu}
      {authMenu}
      {langMenu}
      {logOutMenu}
    </div>
  );
};

export default rootConnector(Header);
