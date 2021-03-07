import React, { FC } from 'react';

import ImagesGrid from '../ImagesGrid';
import rootConnector, { rootProps } from '../../store/rootConnector';

const MainPage: FC<rootProps> = () => (<ImagesGrid />);

export default rootConnector(MainPage);
