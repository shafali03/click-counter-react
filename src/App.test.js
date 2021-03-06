import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });
/**
 * Factory function to create a shallowWrapper for the App component
 * @function {object} props - Component props specific to this setup.
 * @param {object} props - Initial state for setup.
 * @param {object} state - Initial state for setup.
 * @return {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state)
  return wrapper;
}
/**
 * Return ShallowWrapper containing mode(s) whit the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}



test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1)
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0)
});

test('click button increment counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1)

});




describe('Increment', () => {


  test('renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
  });

  test('click increment button to increment counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    //find button click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1)
  });
});


describe('Decrement', () => {


  test('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1);
  });

  test('click button decrement counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();

    //find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1)
  });


  // error does not show by default
  test('error does not show when not needed', () => {

    const wrapper = setup();
    const errorDiv = findByTestAttr(wrapper, 'error-message')

    const errorHasHiddenClass = errorDiv.hasClass('hidden');
    expect(errorHasHiddenClass).toBe(true);
  });


  describe('counter is 0 and decrement is clicked', () => {

    let wrapper
    beforeEach(() => {

      wrapper = setup();

      const button = findByTestAttr(wrapper, 'decrement-button');
      button.simulate('click');
      wrapper.update();
    });

    test('error shows', () => {
      const errorDiv = findByTestAttr(wrapper, 'error-message');
      const errorHasHiddenClass = errorDiv.hasClass('hidden');
      expect(errorHasHiddenClass).toBe(false);
    })

    test('counter still display 0', () => {
      const counterDisplay = findByTestAttr(wrapper, 'counter-display');
      expect(counterDisplay.text()).toContain(0);
    });

    test('click increment to clear the error', () => {
      // find and click the increment button
      const button = findByTestAttr(wrapper, 'increment-button');
      button.simulate('click');


      // check the class of the error message
      const errorDiv = findByTestAttr(wrapper, 'error-message');
      const errorHasHiddenClass = errorDiv.hasClass('hidden');
      expect(errorHasHiddenClass).toBe(true);
    })
  });
});