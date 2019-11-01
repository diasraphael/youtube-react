import React, { Component } from 'react';
import Checkbox from '../Checkbox/Checkbox';

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedCheckboxes: new Set(),
      disabled: true
    }
    this.handleSearchMovies = this.handleSearchMovies.bind(this);
  }

  /* 
     This method will add or remove label and enable or disable checkbox based on 
     the selection of the checkbox
  */
  toggleCheckbox = label => {
    if (this.state.selectedCheckboxes.has(label)) {
      this.state.selectedCheckboxes.delete(label);
    } else {
      this.state.selectedCheckboxes.add(label);
    }
    this.state.selectedCheckboxes.size > 0 ? this.setState({disabled: false}) : this.setState({disabled: true});
  }

  /* 
     This method will form the search regex and initiate the search
  */
  handleSearchMovies = () => {
    this.props.handleSearchMovies(new RegExp(Array.from(this.state.selectedCheckboxes).join('|'), "g"));
  }

  /* 
     checkbox component which will allow the user to select and search
  */
  createCheckbox = label => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )

  /* 
     This will create as many checkboxes available in the list
  */
  createCheckboxes = () => (
    this.props.showsList.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="container">
        <div className="row column-dir">
          <div className="center">
              {this.createCheckboxes()}
              <button className="btn btn-primary" disabled={this.state.disabled} onClick={this.handleSearchMovies}>Search</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;