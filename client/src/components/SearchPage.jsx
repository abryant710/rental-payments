import React, {Component} from 'react';
import utils from '../lib/utils.js';

class SearchPage extends Component {

  constructor(){
    super();

    this.state = {
      leaseId: 0
    }
  }

  // Set the state whenever the user updates the ID
  handleInput(event){
    this.setState({ leaseId: event.target.value });
  }

  // Handle submission of the form when a user wants query an ID
  handleSubmit(event){
    event.preventDefault(); // prevent form submit from causing reload of page
    utils.pushToLeasePage(this.props.history, this.state.leaseId);
  }

  render(){

    return (
      <div>
        <h3>Find Lease by Lease ID:</h3>
        <form onSubmit={ ev => this.handleSubmit(ev) }>
          <input className="textField" type="text" onChange={ ev => this.handleInput(ev) } />
          <input type="submit" value="Find" />
        </form>
      </div>
    );
  }

}

export default SearchPage;
