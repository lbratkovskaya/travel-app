import rootReducer from './rootReducer';

const initState = rootReducer(undefined, { type: 'SET_LANG', payload: { lang: 'ru' } });

describe('Store methods testing', () => {
  it('Expect initial state to have russian', () => {
    expect(initState.lang).toEqual('ru');
  });

  it('Expect russian country title for german language', () => {
    let currentState = rootReducer(initState, { type: 'SET_LANG', payload: { lang: 'en' } });
    currentState = rootReducer(currentState, { type: 'SET_LANG', payload: { lang: 'de' } });

    expect(currentState.lang).toEqual('de');
  });
});
