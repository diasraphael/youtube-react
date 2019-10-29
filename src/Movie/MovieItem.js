
import './Movie.css';
import React, { Component } from 'react';

class MovieItem extends Component {
  constructor (props) {
    super(props)
    this.handleMovieClick = this.handleMovieClick.bind(this);
  }

  handleMovieClick = () => {
    this.props.handleMovieClick(this.props.movie);
  }

  render() {
    return (
      <div className="center">
            <div className='card' key={this.props.movie.id} onClick={this.handleMovieClick}>
              <span className='child'>{this.props.movie.title}</span>
              <span className='child font-size-12'>{this.props.movie.publishedDate}</span>
            </div>
      </div>
    );
  }
}

export default MovieItem;