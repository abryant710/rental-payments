import React, {Component} from 'react';
import dateFunctions from '../lib/dateFunctions.js';

class LeasePaymentsTable extends Component {

  constructor(){
    super();

    // Store the table rows in state so it rerenders after each call
    this.state = {
      totalDays: 0,
      rows: []
    }
  }

  componentDidMount(){
    // Calculate the rows required to display before loading
    // them into the table. Don' bother calculating if no data
    // has yet been recieved from the API
    if(this.props.leaseDetails.startDate) {
      this.calculateRows();
    }
  }

  // Get data to populate Rows
  calculateRows() {
    // Value to set to state for re-rendering
    const rows = [];
    // First find the difference for the first payment
    // Get values from props first
    const startDate = new Date(this.props.leaseDetails.startDate);
    const paymentDay = this.props.leaseDetails.paymentDay;
    const rent = this.props.leaseDetails.rent;
    const frequency = this.props.leaseDetails.frequency;
    const endDate = new Date(this.props.leaseDetails.endDate);

    // Track number of days and associated cost for different conditions
    let numberOfDays = 0;
    let cost = 0;

    // Add first Row
    const firstOfficialPayDate = dateFunctions.getPayDate(startDate, dateFunctions.dayOfWeekLookup(paymentDay));
    const dateBeforeOfficialPayDate = dateFunctions.getDateBeforeThis(firstOfficialPayDate);
    //console.log(startDate, paymentDay, firstOfficialPayDate, dateBeforeOfficialPayDate);
    if (startDate !== firstOfficialPayDate) {
      //console.log("---startDate different to firstOfficialPayDate");
      numberOfDays = dateFunctions.daysBetween(startDate, dateBeforeOfficialPayDate, true);
      cost = dateFunctions.getCost(numberOfDays, frequency, rent);
      //console.log("numberOfDays", numberOfDays);
      //console.log("cost", cost);
      const firstRow = dateFunctions.getPaymentPeriod(startDate, dateBeforeOfficialPayDate, numberOfDays, cost);
      rows.push(firstRow);
    } // Don't push anything if the start date is same day of the week as paymentDay

    // Then calculate all full frequency periods in between
    let currentDate = firstOfficialPayDate;
    numberOfDays = dateFunctions.frequencyLookup(frequency);
    cost = dateFunctions.getCost(numberOfDays, frequency, rent);
    while(currentDate < endDate) {
      const oldDate = currentDate;
      currentDate = dateFunctions.incrementCurrentDate(currentDate, frequency);
      let newRow = {};
      if(currentDate < endDate) {
        newRow = dateFunctions.getPaymentPeriod(oldDate, currentDate, numberOfDays, cost);
      } else {
        // Finally add the last week, calculated up to last date
        numberOfDays = dateFunctions.daysBetween(oldDate, endDate, true);
        cost = dateFunctions.getCost(numberOfDays, frequency, rent);
        newRow = dateFunctions.getPaymentPeriod(oldDate, endDate, numberOfDays, cost);
      }
      rows.push(newRow);
    }

    // Set the state to re-render the data in the table
    this.setState({
      rows: rows
    });
  }

  render(){

    // Indicate no data if no rows can be calculated
    if(!this.state.rows.length) {
      return(
        <p>No data to show</p>
      );
    }

    // Map over the rows calclated from the above
    return (
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.rows.map( row =>
            <tr key={row.from}>
              <td>{row.from}</td>
              <td>{row.to}</td>
              <td>{row.days}</td>
              <td>${row.amount}</td>
            </tr>
          )
        }
        </tbody>
      </table>
    );

  }

}

export default LeasePaymentsTable;
