import React from 'react';
import MovieItem from './MovieItem';
const MovieList = ({ movies, handleClick, handleHiddenMovies }) => {
    const listItems = Array.isArray(movies) ? movies.map((movie)=> {
        return <MovieItem key={movie.id} movie={movie} handleMovieClick ={handleClick} handleHiddenMovies={handleHiddenMovies}/> 
    }) :'';

    return <div >{listItems}</div>;
};

export default MovieList;

