import React, { Component } from 'react';
import { withRouter } from 'react-router';
import FaSearch from 'react-icons/lib/fa/search';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({
      inputText: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    window.location.href = `/movie/${this.state.inputText}`;
    this.setState({ inputText: "" });
  }

  render() {
    return (
      <form className="input-group mb-5" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          value={this.state.inputText}
          onChange={this.onInputChange}
          placeholder="Search by movie name"
        />
        <div className="input-group-btn">
          <button className="btn btn-default" type="submit">
            <FaSearch />
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(SearchBar);