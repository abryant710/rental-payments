import React, {Component} from 'react';
import LeaseDetailsTable from './LeaseDetailsTable';
import LeasePaymentsTable from './LeasePaymentsTable';
import ajax from '../lib/ajax.js';
import utils, {leaseIdRegex, apiTypeRegex} from '../lib/utils.js';

class LeaseResult extends Component {

  // This is a built-in 'lifecycle method'. When defined it, it will
  // be run when this component is actually added to the DOM
  componentDidMount(){
    const leaseId = utils.parseOutFirstTerm(this.props.location.search, leaseIdRegex);
    const apiType = utils.parseOutFirstTerm(this.props.location.search, apiTypeRegex);
    // do AJAX request here and update state with results
    this.updateResults(leaseId, apiType);
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
      leaseId: ''
    };

    this.updateResults = this.updateResults.bind(this);
  }

  updateResults(leaseId, apiType){

    // Set state here to show to the user the app is loading again
    this.setState({
      loading: true
    });

    ajax.getSingleRentData(leaseId, apiType)
    .then( response => {
      // Run the callback function when the response is ready,
      // i.e. SUCCESS
      // console.log('response:', response.data);
      this.setState({
        loading: false,
        startDate: response.data.start_date,
        endDate: response.data.end_date,
        frequency: response.data.frequency,
        paymentDay: response.data.payment_day,
        rent: response.data.rent,
        leaseId: leaseId
      });
    })
    .catch( err => {
      // This callback is run if the request FAILS
      console.warn(err);
    });

  }

  render(){

    // Define the component title in one place
    const ComponentTitle = <h3>Lease Data for id: <span className="strongText">{this.state.leaseId}</span></h3>;

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
        <h4>Summary:</h4>
        <LeaseDetailsTable leaseDetails={this.state} />
        <h4>Payments Due:</h4>
        <LeasePaymentsTable leaseDetails={this.state} />
      </div>
    );
  }

}

export default LeaseResult;
