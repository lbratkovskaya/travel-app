import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import rootConnector, { rootProps } from '../../store/rootConnector';
import { fetchCountries } from '../../controller/handlers';
import MainSlider from '../MainSlider';
import Header from '../Header';

const MainPage: FC<rootProps> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  return (
    <>
      <Header />
      <MainSlider />
    </>
  );
};

export default rootConnector(MainPage);
