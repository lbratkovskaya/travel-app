import React from 'react';
import { makeStyles, InputBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

const Search: React.FC = () => {
  const classes = useStyles();

  return (
    <InputBase
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      inputProps={{ 'aria-label': 'search' }}
    />
  );
};

export default Search;
