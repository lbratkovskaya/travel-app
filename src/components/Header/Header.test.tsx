import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, ShallowWrapper } from 'enzyme';
import Header from '../Header';

const middlewares: any = [];
const mockStore = configureStore(middlewares);

describe('Header functional component testing', () => {
  let wrapper: ShallowWrapper<typeof Header>;

  const initialState = {};
  const store = mockStore(initialState);

  beforeEach(() => {
    wrapper = shallow<typeof Header>(<Provider store={store}><Header /></Provider>);
  });

  it('Header must have a correct snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
