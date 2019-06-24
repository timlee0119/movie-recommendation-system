import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:4000/users/login', this.state)
      .then(res => {
        console.log(res);
        localStorage.setItem('jwt', `Bearer ${res.data.token}`);
        this.props.handleLogin(res.data.user.email);
        this.props.history.push('/');
      })
      .catch(e => {
        console.log(e);
      });
  }
  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div>
        <h3>Please Login first!!!</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onEmailChange}
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password" className="form-control" id="exampleInputPassword1"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onPasswordChange}  
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

    )
  }
}

export default withRouter(Login);
