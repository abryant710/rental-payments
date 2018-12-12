import React, {Component} from 'react';
import ajax from '../lib/ajax.js';

class HomePage extends Component {

  constructor(){
    super();

    this.state = {

    };

  }

  updateResults(){

    // Set state here to show to the user the app is loading again
    // this.setState({
    //
    // });

    ajax.getRentalData(1)
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

  // Handle an update submission when the user requests an update
  handleSubmit( event ){
    event.preventDefault(); // prevent form submit from causing reload of page
    this.updateResults();
  }

  render(){

    return (
      <div>
        <h1>Rental Payments Home Page</h1>
        <form onSubmit={ ev => this.handleSubmit(ev) }>
          <input type="submit" value="Get Data" />
        </form>
      </div>
    );
  }

}

export default HomePage;
