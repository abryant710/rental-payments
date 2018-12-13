import React, {Component} from 'react';

class HomePage extends Component {

  constructor(){
    super();

    this.state = {
      showSearch: true,
      leaseId: ''
    }
  }

  // Set the state whenever the user updates the ID
  handleInput(event){
    //console.log(event.target.value);
    this.setState({ leaseId: event.target.value });
  }

  // Handle submission of the form when a user wants query an ID
  handleSubmit(event){
    event.preventDefault(); // prevent form submit from causing reload of page
    // TODO move this so that it doesn;t show if user hits URL directly
    this.setState({ showSearch: false });
    this.props.history.push({
      pathname: '/leases.html',
      search: "?" + new URLSearchParams({leaseId: this.state.leaseId})
    })
  }

  // Handle submission of the form when a user wants to go to home page
  homePage(event){
    event.preventDefault(); // prevent form submit from causing reload of page
    this.setState({ showSearch: true });
    this.props.history.push(`/`);
  }

  render(){

    // Define the search form to be shown if no data looked up yet
    const SearchForm =
    <div>
      <h3>Find Lease Data by Lease Id:</h3>
      <form onSubmit={ ev => this.handleSubmit(ev) }>
        <input type="text" onChange={ ev => this.handleInput(ev) } />
        <input type="submit" value="Find" />
      </form>
    </div>;

    return (
      <div>
        <h1>Rental Payments Home Page</h1>
        <form onSubmit={ ev => this.homePage(ev) }>
          <input type="submit" value="Home" />
        </form>
        {this.state.showSearch ? SearchForm : <div></div>}
      </div>
    );
  }

}

export default HomePage;
