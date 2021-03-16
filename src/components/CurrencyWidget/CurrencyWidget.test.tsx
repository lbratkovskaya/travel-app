import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import CurrencyWidget from './CurrencyWidget';

const mockStore = configureStore([]);

const runAllPromises = () => new Promise(setImmediate);

describe('CurrencyWidget functional component testing', () => {
  let wrapper: ShallowWrapper<typeof CurrencyWidget>;

  const initialState = {
    countries: [
      {
        id: 'test',
        currency: 'RUB',
      },
    ],
  };
  const store = mockStore(initialState);

  beforeEach(() => {
    wrapper = shallow<typeof CurrencyWidget>(<Provider store={store}><CurrencyWidget /></Provider>);
  });

  it('CurrencyWidget must have a correct snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  const data = { rates: { USDEUR: { rate: 1 }, USDRUB: { rate: 3 } } };

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(data),
    ok: true,
  } as Response));

  it('CurrencyWidget must have 3 rows', async () => {
    const history = createMemoryHistory({
      initialEntries: ['/country/test'],
    });

    const component = mount(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/country/:countryId">
            <CurrencyWidget />
          </Route>
        </Router>
      </Provider>,
    );

    await act(async () => {
      await runAllPromises();
      component.update();
      expect(component.find('.currency-widget-data').children()).toHaveLength(3);
    });
  });
});
