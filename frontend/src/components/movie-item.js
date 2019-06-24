import React, { Component } from 'react';

class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.onMovieClicked = this.onMovieClicked.bind(this);
  }

  onMovieClicked() {
    if (this.props.onMovieClicked) {
      this.props.onMovieClicked(this.props.title);
    }
    window.location.href = `/watch/${this.props._id}`;
  }

  render() {
    return (
      <React.Fragment>
        <div className="card mb-3">
          <div className="row no-gutters">
            {
              this.props.showImg &&
              <div className="col-md-3 d-flex justify-content-center align-items-center">
                <img
                  src="/movieLogo.png" className="card-img" alt="..."
                  style={{width: '180px', height: '180px'}}
                />
              </div>            
            }
            <div className="col">
              <div className="card-body">
                {/* <a href={`/watch/${this.props._id}`}>
                  <h5 className="card-title">{this.props.title}</h5>
                </a> */}
                <h5 className="card-title text-primary fake-anchor" onClick={this.onMovieClicked}>{this.props.title}</h5>
                <p className="card-text font-italic">{this.props.overview}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {`Release Date: ${this.props.release_date
                                      ? this.props.release_date.substring(0,10)
                                      : "Unknown"}`}
                  </small>
                  <br/>
                  <small className="text-muted">
                    {`Director: ${this.props.director
                                      ? this.props.director.substring(0,10)
                                      : "Unknown"}`}
                  </small>                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default MovieItem;
