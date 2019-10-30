import React, { Component } from 'react';
import Checkbox from '../Checkbox/Checkbox';
const items = [
  'Late Night with Seth Meyers',
  'The Daily Show with Trevor Noah',
  'The Late Show with Stephen Colbert',
];

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
    items.map(this.createCheckbox)
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