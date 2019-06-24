import React from 'react';
import MovieItem from './movie-item';

const MovieList = (props) => {
  return (
    <React.Fragment>
      {
        props.movieList.length > 0
        ?
          props.movieList.map(movie => {
            movie['key'] = movie['_id'];
            return <MovieItem {...movie} showImg={props.showImg} onMovieClicked={props.onMovieClicked}/>
          })
        :
          <h4 className="text-muted">Sorry, no available movie</h4>
      }
    </React.Fragment>
  );
};

export default MovieList;
