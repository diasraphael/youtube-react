import React, { Component } from 'react';
import Checkbox from '../Checkbox/Checkbox';

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedCheckboxes: new Set()
    }
    this.handleSearchMovies = this.handleSearchMovies.bind(this);
  }

  toggleCheckbox = label => {
    if (this.state.selectedCheckboxes.has(label)) {
      this.state.selectedCheckboxes.delete(label);
    } else {
      this.state.selectedCheckboxes.add(label);
    }
  }

  handleSearchMovies = () => {
    this.props.handleSearchMovies(new RegExp(Array.from(this.state.selectedCheckboxes).join('|'), "g"));
  }

  createCheckbox = label => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )

  createCheckboxes = () => (
    this.props.showsList.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="container">
        <div className="row column-dir">
          <div className="center">
              {this.createCheckboxes()}
              <button className="btn btn-primary" onClick={this.handleSearchMovies}>Search</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;