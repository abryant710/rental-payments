import React, {Component} from 'react';
import ajax from '../lib/ajax.js';
import utils from '../lib/utils.js';

class LeaseResult extends Component {

  // This is a built-in 'lifecycle method'. When defined it, it will
  // be run when this component is actually added to the DOM
  componentDidMount(){
    // console.log(this.props.location.search);
    const leaseId = utils.parseOutLeaseId(this.props.location.search);
    console.log("leaseId:", leaseId);
    // do AJAX request here and update state with results
    this.updateResults(leaseId);
  }

  constructor(){
    super();

    this.state = {
      photos: []
    };

    this.updateResults = this.updateResults.bind(this);
  }

  updateResults(leaseId){

    // Set state here to show to the user the app is loading again
    // this.setState({
    //
    // });

    ajax.getRentalData(leaseId)
    .then( response => {
      // Run the callback function when the response is ready,
      // i.e. SUCCESS
      console.log('response:', response.data);
      // this.setState({
      //
      // });
    })
    .catch( err => {
      // This callback is run if the request FAILS
      console.warn(err);
    });

  }


  render(){

    return (
      <div>
        <h3>Lease Result Data</h3>
        <p>{this.props.match.params.leaseId}</p>
      </div>
    );
  }

}

export default LeaseResult;
