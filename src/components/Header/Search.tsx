import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, TextField, InputAdornment } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import { IAppState } from '../../store/types';
import { Country } from '../../types';

const useStyles = makeStyles(() => ({
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      outline: 'none',
      border: 'none',
      boxShadow: 'none',
      opacity: '0.5',
    },
    '&:focus': {
      outline: 'none',
      border: 'none',
      boxShadow: 'none',
    },
    '&:active': {
      outline: 'none',
      border: 'none',
      boxShadow: 'none',
    },
  },
}));

const Search: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const countries = useSelector((state: IAppState) => state.countriesList);
  const lang = useSelector((state: IAppState) => state.lang);
  const { t } = useTranslation();

  const findCountry = (searchQuery: string) => {
    if (countries) {
      return countries.filter((country: Country) => {
        switch (lang) {
          case 'de':
            if (country.nameDE.toLowerCase().includes(searchQuery.toLowerCase())
                || country.capitalDE.toLowerCase().includes(searchQuery.toLowerCase())) {
              return true;
            }
            break;
          case 'ru':
            if (country.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
                || country.capitalRU.toLowerCase().includes(searchQuery.toLowerCase())) {
              return true;
            }
            break;
          case 'en':
            if (country.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
                || country.capitalEN.toLowerCase().includes(searchQuery.toLowerCase())) {
              return true;
            }
            break;
          default:
        }
        return false;
      });
    }
    return [];
  };

  return (
    <TextField
      autoFocus
      placeholder={t('search')}
      type="search"
      variant="outlined"
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <button className={classes.button} type="button">
              <SearchIcon />
            </button>
          </InputAdornment>
        ),
      }}
      onChange={(event) => {
        dispatch(
          {
            type: 'FILTER_COUNTRIES',
            payload: { countries: findCountry(event.currentTarget.value) },
          },
        );
      }}
    />
  );
};

export default Search;
