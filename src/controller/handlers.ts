import React from 'react';
import { rootProps } from '../store/rootConnector';
import i18n from '../i18next';

const handleLangChange = (props: rootProps, event: React.SyntheticEvent) => {
  const lng = event.currentTarget.id;
  props.setLang(lng);
  i18n.changeLanguage(lng);
};

export default handleLangChange;
