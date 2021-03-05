import * as React from 'react';
import { rootProps } from '../store/rootConnector';

const handleLangChange = (props: rootProps, event: React.SyntheticEvent) => {
  props.setLang(event.currentTarget.id);
};

export default handleLangChange;
