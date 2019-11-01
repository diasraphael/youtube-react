
import './Movie.css';
import React, { Component } from 'react';
class MovieItem extends Component {
  constructor (props) {
    super(props)
    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.handleHiddenMovies = this.handleHiddenMovies.bind(this);
  }

  handleMovieClick = () => {
    this.props.handleMovieClick(this.props.movie);
  }

  handleHiddenMovies = () => {
    this.props.handleHiddenMovies(this.props.movie);
  }

  render() {
    return (
      <div className="center">
            <div className='card' key={this.props.movie.id}>
              <span className='child bold'>{this.props.movie.title}</span>
              <span className='child italic pointer' onClick={this.handleMovieClick}>{this.props.movie.show}</span>
              <span className='child font-size-12'>{this.props.movie.displayDate}</span>
              <i className="fas fa-eye-slash pointer" onClick={this.handleHiddenMovies}></i>
            </div>
      </div>
    );
  }
}

export default MovieItem;