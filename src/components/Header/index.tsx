import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  fade,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  InputBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FlagIcon from '@material-ui/icons/Flag';
import MoreIcon from '@material-ui/icons/MoreVert';
import rootConnector, { rootProps } from '../../store/rootConnector';
import handleLangChange from '../../controller/handlers';
import SignInForm from '../RegForms/SignInForm';
import SignUpForm from '../RegForms/SignUpForm';

const useStyles = makeStyles((theme) => ({
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
    marginRight: theme.spacing(2),
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
}));

const Header: React.FC<rootProps> = (props: rootProps) => {

  const classes = useStyles();
  const { t } = useTranslation();

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

  const authId = 'menu-auth';
  const langId = 'menu-lang';

  const authMenu = (
    <Menu
      anchorEl={anchorAuth}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={authId}
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

  const mobileMenuId = 'menu-mobile';

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
      <MenuItem>
        <div className={`${classes.search_mobile}`}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </MenuItem>
      <MenuItem onClick={handleLangMenuOpen}>
        <IconButton
          aria-label="Choose lang"
          aria-controls={langId}
          aria-haspopup="true"
          color="inherit"
        >
          <FlagIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleAuthMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls={authId}
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
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
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
          >
            Travel app
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <IconButton
              edge="end"
              aria-label="Choose language"
              aria-controls={langId}
              aria-haspopup="true"
              onClick={handleLangMenuOpen}
              color="inherit"
            >
              <FlagIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={authId}
              aria-haspopup="true"
              onClick={handleAuthMenuOpen}
              color="inherit"
            >
              <AccountCircle />
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
    </div>
  );
};

export default rootConnector(Header);
