import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import TimeWidget from './TimeWidget';

const mockStore = configureStore([]);

const runAllPromises = () => new Promise(setImmediate);

describe('TimeWidget functional component testing', () => {
  let wrapper: ShallowWrapper<typeof TimeWidget>;

  const initialState = {
    countries: [
      {
        id: 'test',
        capitalTimeZone: 'Europe/Moscow',
      },
    ],
    lang: 'en',
  };

  const store = mockStore(initialState);

  beforeEach(() => {
    wrapper = shallow<typeof TimeWidget>(<Provider store={store}><TimeWidget /></Provider>);
  });

  it('TimeWidget must have a correct snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('TimeWidget must show location\'s date', async () => {
    const history = createMemoryHistory({
      initialEntries: ['/country/test'],
    });

    const component = mount(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/country/:countryId">
            <TimeWidget />
          </Route>
        </Router>
      </Provider>,
    );

    await act(async () => {
      await runAllPromises();
      component.update();
      const nowDate = new Date();
      const expectedTest = nowDate.toLocaleDateString('en', { timeZone: 'Europe/Moscow' });
      expect(component.find('.time-widget-data').childAt(0).text()).toBe(expectedTest);
    });
  });
});
