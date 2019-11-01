import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({ movies, selectedMovie, handleClick, handleHiddenMovies }) => {
    const listItems = Array.isArray(movies) ? movies.map((movie)=> {
        return <MovieItem key={movie.id} selectedItem={(selectedMovie && selectedMovie.id === movie.id) ? '0 2px 2px 0 #cc000040, 0 3px 1px -2px #cc000040, 0 1px 5px 0 #cc000040' : '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'} movie={movie} handleMovieClick ={handleClick} handleHiddenMovies={handleHiddenMovies}/>
    }) :'';

    return <div >{listItems}</div>;
};

export default MovieList;

