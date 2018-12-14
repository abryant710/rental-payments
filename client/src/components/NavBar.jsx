import React, {Component} from 'react';
import utils, {apiTypeRegex} from '../lib/utils.js';

class NavBar extends Component {

  constructor() {
    super();

    this.state = {
      api: 'standard',
    };
  }

  componentDidMount() {
    if(this.props.history.location.search.includes('api=')) {
      this.setState({
        api: utils.parseOutFirstTerm(this.props.history.location.search, apiTypeRegex)
      });
    }
  }

  updateChosenAPI(type) {
    // If the user changes API mode they should have to select search type
    // again. Therefore route back to root.
    this.setState({
      api: type
    });
    if(this.props.history.location.pathname !== `/`) {
      this.props.history.push(`/`);
    }
  }

  // Handle submission of the form when a user wants to go to search page
  pushToNavPage(event, page) {
    event.preventDefault(); // prevent form submit from causing reload of page
    // Don't push if already on this page
    if(this.props.history.location.pathname !== `/${page}?api=${this.state.api}`) {
      this.props.history.push(`/${page}?api=${this.state.api}`);
    }
  }

  render(){

    return (
      <div className="navBar">
        <form>
          <input onChange={ () => this.updateChosenAPI('standard') } className="radio" type="radio" name="api" value="standard"
          checked={this.state.api === 'standard'}
          />Standard API
          <input onChange={ () => this.updateChosenAPI('custom') } className="radio" type="radio" name="api" value="custom"
          checked={this.state.api === 'custom'}
          />Custom API
        </form>
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
