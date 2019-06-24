import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import FaFileMovieO from 'react-icons/lib/fa/file-movie-o';

import HomePage from './components/home-page';
import Login from './components/login';
import MovieResultPage from './components/movie-result-page';
import WatchMoviePage from './components/watch-movie-page';

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    if (token) {
      axios.get('http://localhost:4000/users/me', {
        headers: { Authorization: token }
      })
      .then(res => {
        this.setState({ email: res.data.email });
      })
      .catch(e => {
        console.log(e);
        localStorage.removeItem('jwt');
      });
    }
  }

  renderFunction(component) {
    return () => (
      localStorage.getItem('jwt')
        ? component
        : <Redirect to="/login"/>
    );
  }

  handleLogin(email) {
    this.setState({ email });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" target="_blank">
              {/* <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" /> */}
              <FaFileMovieO />
            </a>
            <Link to="/" className="navbar-brand">Movie Recommendation System</Link>
            {
              this.state.email && 
              <h5 className="my-0 d-none d-md-block" style={{position: "absolute", right: "20px"}}>
                {`Hi, ${this.state.email}`}
              </h5>
            }
          </nav>
          <br/>
          <Route path="/" exact render={this.renderFunction(<HomePage />)} />
          <Route path="/movie/:title" render={this.renderFunction(<MovieResultPage />)} />
          <Route path="/watch/:id" render={this.renderFunction(<WatchMoviePage />)} />
          <Route path="/login" render={() => <Login {...this.props} handleLogin={this.handleLogin}/>} />
        </div>
      </Router>
    );
  
  }
}

export default App;
