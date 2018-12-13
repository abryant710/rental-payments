import React, {Component} from 'react';
import utils from '../lib/utils.js';

class LeasePaymentsTable extends Component {

  constructor(){
    super();

    this.state = {
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
    const startDate = new Date(this.props.leaseDetails.startDate);
    const endDate = new Date(this.props.leaseDetails.endDate);
    const paymentDay = this.props.leaseDetails.paymentDay;

    const frequency = this.props.leaseDetails.frequency;
    const rent = this.props.leaseDetails.rent;
    console.log(startDate, utils.getFormattedDate(startDate));
    console.log(endDate, utils.getFormattedDate(endDate));
    console.log(utils.dayOfWeekLookup(paymentDay));
  }

  render(){

    if(!this.state.rows.length) {
      return(
        <p>No data to show</p>
      );
    }

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

        </tbody>
      </table>
    );

  }

}

export default LeasePaymentsTable;
