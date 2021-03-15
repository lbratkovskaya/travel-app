import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import rootConnector, { rootProps } from '../../store/rootConnector';
import { fetchCountries } from '../../controller/handlers';
import MainSlider from '../MainSlider';
import Header from '../Header';
import Footer from '../Footer';

const MainPage: FC<rootProps> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  return (
    <>
      <Header />
      <MainSlider />
      <Footer />
    </>
  );
};

export default rootConnector(MainPage);
