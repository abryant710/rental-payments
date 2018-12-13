import React, {Component} from 'react';
import LeaseDetailsTable from './LeaseDetailsTable';
import LeasePaymentsTable from './LeasePaymentsTable';
import ajax from '../lib/ajax.js';
import utils from '../lib/utils.js';

// Define the component title in one place
const ComponentTitle = <h2>Lease Result Data</h2>;

class LeaseResult extends Component {

  // This is a built-in 'lifecycle method'. When defined it, it will
  // be run when this component is actually added to the DOM
  componentDidMount(){
    const leaseId = utils.parseOutLeaseId(this.props.location.search);
    // do AJAX request here and update state with results
    this.updateResults(leaseId);
  }

  constructor(){
    super();

    this.state = {
      loading: false,
      startDate: '',
      endDate: '',
      frequency: '',
      paymentDay: '',
      rent: 0,
    };

    this.updateResults = this.updateResults.bind(this);
  }

  updateResults(leaseId){

    // Set state here to show to the user the app is loading again
    this.setState({
      loading: true
    });

    ajax.getSingleRentData(leaseId)
    .then( response => {
      // Run the callback function when the response is ready,
      // i.e. SUCCESS
      console.log('response:', response.data);
      this.setState({
        loading: false,
        startDate: response.data.start_date,
        endDate: response.data.end_date,
        frequency: response.data.frequency,
        paymentDay: response.data.payment_day,
        rent: response.data.rent,
      });
    })
    .catch( err => {
      // This callback is run if the request FAILS
      console.warn(err);
    });

  }


  render(){

    //Return loading if the API data is still being fetched
    if(this.state.loading) {
      return(
        <div>
          {ComponentTitle}
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div>
        {ComponentTitle}
        <LeaseDetailsTable leaseDetails={this.state} />
        <LeasePaymentsTable leaseDetails={this.state} />
      </div>
    );
  }

}

export default LeaseResult;
