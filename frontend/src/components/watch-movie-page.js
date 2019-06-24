import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import ReactLoading from 'react-loading';
import MovieList from './movie-list';

class WatchMoviePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      gotMovieList: false,
      movieList: []
    };

    this.onMovieClicked = this.onMovieClicked.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`http://localhost:4000/movieId/${this.props.match.params.id}`);
      this.setState({ title: res.data.title });
      const res2 = await axios.get(`http://localhost:4000/recommend/${res.data.title}`, {
        headers: { Authorization: localStorage.getItem('jwt') }
      });
      const movieList = res2.data;
      this.setState({ movieList, gotMovieList: true });
    } catch (error) {
      // probably means haven't logged in yet
      console.log(error);
    }
  }

  onMovieClicked(title2) {
    axios.post('http://localhost:4000/update/params', {
      title1: this.state.title,
      title2
    }, {
      headers: { Authorization: localStorage.getItem('jwt') }
    })
    .then(res => {
      console.log(res);
    })
    .catch(e => console.log(e));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h4 className="mb-4">You are watching: {this.state.title}</h4>
            <img
              src="/moviePlaying.png" alt="Movie Playing..."
              style={{width: '600px', height: '500px'}}
            />
          </div>
          <div className="col-md-4" style={{backgroundColor: '#d1c4e9'}}>
            <h4 className="my-4">Other movies you might like:</h4>
            {
              this.state.gotMovieList
              ? <MovieList
                  movieList={this.state.movieList}
                  showImg={false}
                  onMovieClicked={this.onMovieClicked}
                />
              : <ReactLoading color="#000" type="spin"/>
            }
          </div>
        </div>
      </div>
    )
  }
};

export default withRouter(WatchMoviePage);
