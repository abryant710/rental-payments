import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../components/NavBar';
import SearchPage from '../components/SearchPage';
import ListPage from '../components/ListPage';
import LeaseResult from '../components/LeaseResult';
import LeasePaymentsTable from '../components/LeasePaymentsTable';
import LeaseOwnershipTable from '../components/LeaseOwnershipTable';
import LeaseDetailsTable from '../components/LeaseDetailsTable';
import ajax from '../lib/ajax';
import utils from '../lib/utils';
import dateFunctions from '../lib/dateFunctions';

// Page loading

it('renders NavBar without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Search without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders List without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// AJAX requests

it('returns valid json from API with ID', () => {
  expect.assertions(1);
  return ajax.getSingleRentData('lease-a').then(response => {
    expect(response.data.id).toBe('lease-a');
  });
});

it('returns valid json from API without ID', () => {
  expect.assertions(2);
  return ajax.getAllRentLeases().then(response => {
    expect(response.data.length).toEqual(3);
    expect(response.data[0].id).toContain('lease-');
  });
});

// Utils Processing

it('can parse out an ID from a query string', () => {
  expect.assertions(1);
  const id = utils.parseOutLeaseId('?leaseId=lease-a');
  expect(id).toEqual('lease-a');
});

// Date Processing

it('Increments date as expected', () => {
  expect.assertions(4);
  const date = dateFunctions.incrementCurrentDate(new Date('01-01-2018'), 'weekly');
  expect(date).toBeInstanceOf(Date);
  expect(date.getMonth()).toEqual(0);
  expect(date.getDate()).toEqual(8);
  expect(date.getYear() + 1900).toEqual(2018);
});

it('Get cost as expected', () => {
  expect.assertions(1);
  const cost = dateFunctions.getCost(7, 'fortnightly', 1000);
  expect(cost).toEqual("500.00");
});

it('Get day of week as expected', () => {
  expect.assertions(1);
  const date = dateFunctions.getDayOfWeek(new Date('12-05-2018'), 3);
  expect(date.getDay()).toEqual(3);
});

it('Get calculates correct days between 2 dates', () => {
  expect.assertions(1);
  const days = dateFunctions.daysBetween(new Date('12-05-2018'), new Date('14-05-2018'), true);
  expect(days).toEqual(3);
});
