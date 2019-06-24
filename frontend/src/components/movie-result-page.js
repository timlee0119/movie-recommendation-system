import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ReactLoading from 'react-loading';
import axios from 'axios';
import SearchBar from './search-bar';
import MovieList from './movie-list';

class MovieResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      movieList: []
    };
  }

  componentDidMount() {
    const title = this.props.match.params.title;
    axios.get(`http://localhost:4000/movie/${title}`)
    .then(res => {
      console.log(res.data);
      const movieList = res.data;
      this.setState({ movieList, loaded: true });
    })
    .catch(e => console.log(e));
  }
  
  render() {
    return (
      <React.Fragment>
        <SearchBar />
        <h4 className="mb-4">Possible Movies:</h4>
        {
          this.state.loaded
          ? <MovieList movieList={this.state.movieList} showImg={true}/>
          : <ReactLoading color="#000" type="spin"/>
        }

      </React.Fragment>
    );
  }
}

export default withRouter(MovieResultPage);
