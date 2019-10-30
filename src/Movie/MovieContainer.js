import React from 'react';

const MovieContainer = ({selectedMovie}) => {
    if (!selectedMovie) {
        return null;
    }
    const movieSrc = selectedMovie.url;
    return (
        
        <div className="center">
            <div className=''>
                <h6 className='header'>{selectedMovie.show}</h6>
            </div>
            <div>
                <iframe src={movieSrc} allow='autoplay' title='Video player'/>
            </div>
        </div>

    )
}
export default MovieContainer;