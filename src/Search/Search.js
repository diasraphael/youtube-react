import React, { Component } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import Show from '../Show/Show';
const items = [
  'Late Night with Seth Myers',
  'The Daily Show with Trevor Noah',
  'The Late Show with Stephen Colbert',
];

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shows: [],
      isLoading: false,
      selectedCheckboxes: new Set()
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchShows = this.fetchShows.bind(this);
  }

  toggleCheckbox = label => {
    if (this.state.selectedCheckboxes.has(label)) {
      this.state.selectedCheckboxes.delete(label);
    } else {
      this.state.selectedCheckboxes.add(label);
    }
  }

  handleSubmit = () => {
    this.fetchShows(new RegExp(Array.from(this.state.selectedCheckboxes).join('|'), "g"));
  }

  fetchShows(pattern) {
    // The API where we're fetching data from
    fetch('/data.json')
      // We get a response and receive the data in JSON format...
      .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
      }) 
      // ...then we update the state of our application
      .then(data =>
        {
          let matchedData = data.shows.filter(str=>str.title.match(pattern));
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
          matchedData.sort((a,b) =>  new Date(b.publishedDate)- new Date(a.publishedDate ));
          matchedData = matchedData.slice(0,5);
          this.setState({
            shows: [matchedData]
          })
          console.log(this.state.shows);
        })
      // If we catch errors instead of a response, let's update the app
      .catch(error => this.setState({ error, isLoading: false }));
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
              <button className="btn btn-primary" onClick={this.handleSubmit}>Search</button>
          </div>
          {
         //   !this.state.isLoading ? 
          this.state.shows.map((show,index) => <Show data={show} key={index}/>) 
         //   : <h3>Loading...</h3>
        }
        </div>
      </div>
    );
  }
}

export default Search;