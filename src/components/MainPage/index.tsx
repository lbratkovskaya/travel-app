import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import rootConnector, { rootProps } from '../../store/rootConnector';
import { fetchCountries } from '../../controller/handlers';
import ImagesGrid from '../ImagesGrid';
import Header from '../Header';

const MainPage: FC<rootProps> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  return (
    <>
      <Header />
      <ImagesGrid />
    </>
  );
};

export default rootConnector(MainPage);
