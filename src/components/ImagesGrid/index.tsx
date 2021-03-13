import React from 'react';
import { Link } from 'react-router-dom';
import {
  useTranslation,
} from 'react-i18next';
import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import {
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import rootConnector,
{
  rootProps,
} from '../../store/rootConnector';
import { Country } from '../../types';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    maxWidth: 1000,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  imgFullWidth: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
  },
  title: {
    // color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const ImagesGrid: React.FC<rootProps> = (props: rootProps) => {
  const classes = useStyles();
  const { countries } = props;
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {countries && countries.map((country: Country) => (
          <GridListTile key={country.pictureURL}>
            <Link to={`/country/${country.id}`}>
              <img
                src={country.pictureURL}
                alt={t(`${country.id}.name`)}
                className={classes.imgFullWidth}
              />
              <GridListTileBar
                title={t(`${country.id}.name`)}
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default rootConnector(ImagesGrid);
