import React, {Component} from 'react';

class LeaseOwnershipTable extends Component {

  // List all tentants with routed link to each lease ID
  render(){

    return (
      <table>
        <thead>
          <tr>
            <th>Tenant</th>
            <th>Lease ID</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.leaseList.map( row =>
            <tr key={row.id}>
              <td>{row.tenant}</td>
              <td>
                <p className="leaseLink" onClick={ leaseId => this.props.reRoute(row.id) }>{row.id}</p>
              </td>
            </tr>
          )
        }
        </tbody>
      </table>
    );

  }

}

export default LeaseOwnershipTable;
