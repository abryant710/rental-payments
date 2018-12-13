import React, {Component} from 'react';

class NavBar extends Component {

  // Handle submission of the form when a user wants to go to home page
  pushToHomePage(event) {
    event.preventDefault(); // prevent form submit from causing reload of page
    this.props.history.push(`/`);
  }

  render(){

    return (
      <div>
        <form onSubmit={ ev => this.pushToHomePage(ev) }>
          <input type="submit" value="Search By ID" />
        </form>
      </div>
    );

  }

}

export default NavBar;
