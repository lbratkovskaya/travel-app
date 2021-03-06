export interface IAppState {
  lang: 'EN' | 'RU' | 'DE'
}

const initialState: IAppState = {
  lang: 'EN',
};

const rootReducer = (state: IAppState = initialState, action: any) => {
  switch (action.type) {
    case 'SET_LANG':
      return { ...state, lang: action.payload.lang };
    default:
  }
  return state;
};

export default rootReducer;
