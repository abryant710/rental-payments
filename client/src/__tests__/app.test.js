import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../components/NavBar';
import SearchPage from '../components/SearchPage';
import ajax from '../lib/ajax';
import utils, {leaseIdRegex, apiTypeRegex} from '../lib/utils';
import dateFunctions from '../lib/dateFunctions';

// Page loading

it('renders Search without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// AJAX requests

it('returns valid json from API with ID', () => {
  expect.assertions(1);
  return ajax.getSingleRentData('lease-a', 'standard').then(response => {
    expect(response.data.id).toBe('lease-a');
  });
});

it('returns valid json from API without ID', () => {
  expect.assertions(2);
  return ajax.getAllRentLeases('standard').then(response => {
    expect(response.data.length).toEqual(3);
    expect(response.data[0].id).toContain('lease-');
  });
});

it('returns valid json from CUSTOM API with ID', () => {
  expect.assertions(1);
  return ajax.getSingleRentData('lease-a', 'custom').then(response => {
    expect(response.data.id).toBe('lease-a');
  });
});

it('returns valid json from CUSTOM API without ID', () => {
  expect.assertions(2);
  return ajax.getAllRentLeases('custom').then(response => {
    expect(response.data.length).toEqual(3);
    expect(response.data[0].id).toContain('lease-');
  });
});

// Utils Processing

it('can parse out an ID from a query string', () => {
  expect.assertions(1);
  const id = utils.parseOutFirstTerm('?leaseId=lease-a', leaseIdRegex);
  expect(id).toEqual('lease-a');
});

it('can parse out api type from a query string', () => {
  expect.assertions(1);
  const type = utils.parseOutFirstTerm('?api=custom', apiTypeRegex);
  expect(type).toEqual('custom');
});

// Date Processing

it('Increments date as expected', () => {
  expect.assertions(4);
  const date = dateFunctions.incrementCurrentDate(new Date('2018-01-01'), 'weekly');
  expect(date).toBeInstanceOf(Date);
  expect(date.getMonth()).toEqual(0);
  expect(date.getDate()).toEqual(7);
  expect(date.getYear() + 1900).toEqual(2018);
});

it('Finds the next date given a day of the week e.g. from Sat May 12 2018 find > Tue May 15 2018', () => {
  expect.assertions(1);
  const date = dateFunctions.getPayDate(new Date('2018-05-12'), 2);
  expect(date).toEqual(new Date('2018-05-15'));
});

it('Gets cost as expected', () => {
  expect.assertions(1);
  const cost = dateFunctions.getCost(7, 'fortnightly', 1000);
  expect(cost).toEqual("500.00");
});

it('Gets the date before the inputted date', () => {
  expect.assertions(1);
  const date = dateFunctions.getDateBeforeInput(new Date('2018-05-15'));
  expect(date).toEqual(new Date('2018-05-14'));
});

it('Calculates correct number of days between 2 dates', () => {
  expect.assertions(2);
  const days1 = dateFunctions.daysBetween(new Date('2018-01-01'), new Date('2018-01-03'), true);
  const days2 = dateFunctions.daysBetween(new Date('2018-01-01'), new Date('2018-01-03'), false);
  expect(days1).toEqual(3);
  expect(days2).toEqual(2);
});

it('Formats date correctly (as per specification)', () => {
  expect.assertions(1);
  const date = dateFunctions.getFormattedDate(new Date('2018-01-03'));
  expect(date).toEqual('January, 3rd 2018');
});

it('Gets correct date suffix', () => {
  expect.assertions(4);
  const st = dateFunctions.datePlusSuffix(1);
  const nd = dateFunctions.datePlusSuffix(2);
  const rd = dateFunctions.datePlusSuffix(3);
  const th = dateFunctions.datePlusSuffix(15);
  expect(st).toEqual('1st');
  expect(nd).toEqual('2nd');
  expect(rd).toEqual('3rd');
  expect(th).toEqual('15th');
});

it('Looks up month correctly', () => {
  expect.assertions(3);
  const jan = dateFunctions.monthLookup(0);
  const mar = dateFunctions.monthLookup(2);
  const dec = dateFunctions.monthLookup(11);
  expect(jan).toEqual('January');
  expect(mar).toEqual('March');
  expect(dec).toEqual('December');
});

it('Looks up frequency correctly', () => {
  expect.assertions(3);
  const weekly = dateFunctions.frequencyLookup('weekly');
  const fortnightly = dateFunctions.frequencyLookup('fortnightly');
  const monthly = dateFunctions.frequencyLookup('monthly');
  expect(weekly).toEqual(7);
  expect(fortnightly).toEqual(14);
  expect(monthly).toEqual(28);
});

it('Looks up day correctly', () => {
  expect.assertions(3);
  const sun = dateFunctions.dayOfWeekLookup('sunday');
  const tues = dateFunctions.dayOfWeekLookup('tuesday');
  const sat = dateFunctions.dayOfWeekLookup('saturday');
  expect(sun).toEqual(0);
  expect(tues).toEqual(2);
  expect(sat).toEqual(6);
});

it('Gets payment period correctly', () => {
  expect.assertions(1);
  const result = dateFunctions.getPaymentPeriod(new Date('2018-12-13'), new Date('2018-12-15'), 7, "1400.00");
  expect(result).toEqual({
    from: 'December, 13th 2018',
    to: 'December, 15th 2018',
    days: 7,
    amount: '1400.00',
  });
});
