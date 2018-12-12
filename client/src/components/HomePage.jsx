import React, {Component} from 'react';

class HomePage extends Component {

  constructor(){
    super();

    this.state = {
      leaseId: ''
    }
  }

  // Set the state whenever the user updates the ID
  handleInput( event ){
    console.log( event.target.value );
    this.setState({ leaseId: event.target.value });
  }

  // Handle submission of the form when a user wants query an ID
  handleSubmit( event ){
    event.preventDefault(); // prevent form submit from causing reload of page
    this.props.history.push({
      pathname: '/leases.html',
      search: "?" + new URLSearchParams({leaseId: this.state.leaseId})
    })
  }

  // Handle submission of the form when a user wants to go to home page
  homePage( event ){
    event.preventDefault(); // prevent form submit from causing reload of page
    this.props.history.push(`/`);
  }

  render(){

    return (
      <div>
        <h1>Rental Payments Home Page</h1>
        <form onSubmit={ ev => this.homePage(ev) }>
          <input type="submit" value="Home" />
        </form>
        <h3>Find Lease Data by Lease Id:</h3>
        <form onSubmit={ ev => this.handleSubmit(ev) }>
          <input type="text" onChange={ ev => this.handleInput(ev) } />
          <input type="submit" value="Find" />
        </form>
      </div>
    );
  }

}

export default HomePage;
