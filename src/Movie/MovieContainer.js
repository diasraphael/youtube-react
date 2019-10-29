import React from 'react';

const MovieContainer = ({selectedMovie}) => {
    if (!selectedMovie) {
        return null;
    }
    const movieSrc = selectedMovie.url;
    return (
        
        <div className="center">
            <div className=''>
                <h4 className='header'>{selectedMovie.title}</h4>
            </div>
            <div>
                <iframe src={movieSrc} allowFullScreen title='Video player'/>
            </div>
        </div>

    )
}
export default MovieContainer;