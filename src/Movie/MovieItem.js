
import './Movie.css';
import '../assets/font-awesome.css';

import React, { Component } from 'react';
class MovieItem extends Component {
  constructor (props) {
    super(props)
    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.handleHiddenMovies = this.handleHiddenMovies.bind(this);
  }

  /* 
     Triggers the playback of the movie
  */
  handleMovieClick = () => {
    this.props.handleMovieClick(this.props.movie);
  }

  /* 
     Triggers the onClick functionality to hide the movie from the list 
  */
  handleHiddenMovies = () => {
    this.props.handleHiddenMovies(this.props.movie);
  }

  render() {
    return (
      <div className="center">
            <div className='card' style={{ boxShadow: this.props.selectedItem}} key={this.props.movie.id}>
              <div className="pointer font-size-15" onClick={this.handleMovieClick}>
                  <div className='bold'>{this.props.movie.title}</div>
                  <div className='italic'>{this.props.movie.show}</div>
              </div>
              <div className="child">
                  <span className='font-size-12'>{this.props.movie.displayDate}</span>
                  <i className="fa fa-eye-slash pointer float-right" title="hide" onClick={this.handleHiddenMovies}></i>
              </div>
            </div>
      </div>
    );
  }
}

export default MovieItem;