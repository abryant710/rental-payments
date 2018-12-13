import React, {Component} from 'react';
import LeaseOwnershipTable from './LeaseOwnershipTable';
import ajax from '../lib/ajax.js';
import utils from '../lib/utils.js';

// Define the component title in one place
const ComponentTitle = <h3>List Of Leases By Tenant:</h3>;

class ListPage extends Component {

  // This is a built-in 'lifecycle method'. When defined it, it will
  // be run when this component is actually added to the DOM
  componentDidMount(){
    // do AJAX request here and update state with results
    this.updateList();
  }

  constructor(){
    super();

    this.state = {
      loading: false,
      list: []
    };

    this.pushToLeasePage = this.pushToLeasePage.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  // AJAX to get the list of tenants
  updateList(){

    // Set state here to show to the user the app is loading again
    this.setState({
      loading: true
    });

    ajax.getAllRentLeases()
    .then( response => {
      // Run the callback function when the response is ready,
      // i.e. SUCCESS
      // console.log('response:', response.data);
      this.setState({
        loading: false,
        list: response.data
      });
    })
    .catch( err => {
      // This callback is run if the request FAILS
      console.warn(err);
    });

  }

  pushToLeasePage(leaseId) {
    utils.pushToLeasePage(this.props.history, leaseId);
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
        <LeaseOwnershipTable leaseList={this.state.list} reRoute={this.pushToLeasePage} />
      </div>
    );
  }

}

export default ListPage;
