import React, {Component} from 'react';

class NavBar extends Component {

  // Handle submission of the form when a user wants to go to search page
  pushToNavPage(event, page) {
    event.preventDefault(); // prevent form submit from causing reload of page
    // Don't push if already on this page
    if(this.props.history.location.pathname !== `/${page}`) {
      this.props.history.push(`/${page}`);
    }
  }

  render(){

    return (
      <div className="navBar">
        <form className="navBar" onSubmit={ ev => this.pushToNavPage(ev, 'search') }>
          <input type="submit" value="Search By ID" />
        </form>
        <form className="navBar" onSubmit={ ev => this.pushToNavPage(ev, 'list') }>
          <input type="submit" value="List By Tenant" />
        </form>
      </div>
    );

  }

}

export default NavBar;
