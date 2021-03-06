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
      hiddenMovies: new Set(),
      selectedMovie:null
    }
    this.searchMovies = this.searchMovies.bind(this);
    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.addHiddenMovies = this.addHiddenMovies.bind(this);
    this.handleHiddenMovies = this.handleHiddenMovies.bind(this);
  }

  /* 
    This method will set the movie to be selected and initate the 
    movie to play
  */
  handleMovieClick = (movie) =>{
    this.setState({selectedMovie: movie});
    this.addHiddenMovies(movie);
  }

  /* 
    This method will remove the movie you want to hide from the list
  */
  handleHiddenMovies = (movie) =>{
    this.addHiddenMovies(movie);
    this.setState({movies: this.state.movies.filter(function(value, index, arr){
      return value.id !== movie.id;
    })});
  }

  /* 
    This method will save the hidden movies in a state variable
  */
  addHiddenMovies = (movie) =>{
    this.state.hiddenMovies.add(movie);
  }

  /* 
    This method will fetch the data from the mock file and filter to 
    show only 10 shows at a time.This also hides the hidden movies from list
    which we show in the output.
  */
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
          matchedData = matchedData.filter(({ id: id1 }) => !Array.from(this.state.hiddenMovies).some(({ id: id2 }) => id2 === id1));
          matchedData = matchedData.slice(0,10);
          matchedData = matchedData.map((item)=>{ 
            item.displayDate = moment(item.publishedDate).format('LL');
            return item;
          });
          this.setState({
            movies: matchedData
          })
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
                <MovieList movies={this.state.movies} selectedMovie={this.state.selectedMovie} handleClick={this.handleMovieClick} handleHiddenMovies={this.handleHiddenMovies}></MovieList>
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
