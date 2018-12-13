import React, {Component} from 'react';
import utils from '../lib/utils.js';

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
    const rows = [];
    // First find the difference for the first payment
    const startDate = new Date(this.props.leaseDetails.startDate);
    const paymentDay = this.props.leaseDetails.paymentDay;
    const rent = this.props.leaseDetails.rent;
    const frequency = this.props.leaseDetails.frequency;
    // Add first Row
    const firstRow = utils.getFirstWeek(startDate, paymentDay, frequency, rent);
    rows.push(firstRow);

    // const endDate = new Date(this.props.leaseDetails.endDate);
    // // Calculate the number of days between first
    // const totalDays = utils.daysBetween(startDate, endDate);
    // const frequency = this.props.leaseDetails.frequency;
    // // Check if total is higher than frequency
    // if(totalDays > frequency) {
    //
    // }
    // const rent = this.props.leaseDetails.rent;
    // console.log(startDate, utils.getFormattedDate(startDate));
    // console.log(endDate, utils.getFormattedDate(endDate));
    // console.log(utils.dayOfWeekLookup(paymentDay));
    // console.log(utils.daysBetween(startDate, endDate));

    this.setState({
      rows: rows
    });
  }

  render(){

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
            <th>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.rows.map( row =>
            <tr key={row.from}>
              <td>{row.from}</td>
              <td>{row.to}</td>
              <td>{row.days}</td>
              <td>{row.amount}</td>
            </tr>
          )
        }
        </tbody>
      </table>
    );

  }

}

export default LeasePaymentsTable;
