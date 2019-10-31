import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Search/Search';
import MovieList from './Movie/MovieList';
import MovieContainer from './Movie/MovieContainer';
import * as moment from 'moment';
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: [],
      selectedMovie:null
    }
    this.searchMovies = this.searchMovies.bind(this);
    this.handleMovieClick = this.handleMovieClick.bind(this);
  }

  handleMovieClick = (movie) =>{
    this.setState({selectedMovie: movie})
  }

  searchMovies =(pattern) =>{
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
          let matchedData = data.movies.filter(str=>str.title.match(pattern));
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
          matchedData = matchedData.sort((a,b) =>  new moment(b.publishedDate) - (new moment(a.publishedDate))); 
          matchedData = matchedData.slice(0,10);
          matchedData = matchedData.map((item)=>{ 
            item.displayDate = moment(item.publishedDate).format('LL');
            return item;
          });
          this.setState({
            movies: matchedData
          })
          console.log(this.state.movies);
        })
      // If we catch errors instead of a response, let's update the app
      .catch(error => console.log(error));
  }

  render(){
  return (
    <div className="App">
      <header className='header'>Youtube</header>
      <Search showsList={this.props.showsList} handleSearchMovies={this.searchMovies}></Search>
      <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <MovieList movies={this.state.movies} handleClick={this.handleMovieClick}></MovieList>
              </div>
              <div className="col-lg-6">
                <MovieContainer selectedMovie={this.state.selectedMovie}></MovieContainer> 
              </div>
            </div>
      </div>
    </div>
  )};
}

export default App;
