import React, {Component} from 'react';

class LeaseDetailsTable extends Component {

  render(){

    return (
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Payment Day</th>
            <th>Frequency</th>
            <th>Rent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.props.leaseDetails.startDate}</td>
            <td>{this.props.leaseDetails.endDate}</td>
            <td>{this.props.leaseDetails.paymentDay}</td>
            <td>{this.props.leaseDetails.frequency}</td>
            <td>${this.props.leaseDetails.rent}</td>
          </tr>
        </tbody>
      </table>
    );

  }

}

export default LeaseDetailsTable;
