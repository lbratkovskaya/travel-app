import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from './rootReducer';

export type rootProps = ConnectedProps<typeof rootConnector>;

const mapStateToProps = (state: IAppState) => ({
  lang: state.lang,
  countries: state.countries,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLang: (lang: string) => dispatch({
    type: 'SET_LANG', payload: { lang },
  }),
});

const rootConnector = connect(mapStateToProps, mapDispatchToProps);

export default rootConnector;
