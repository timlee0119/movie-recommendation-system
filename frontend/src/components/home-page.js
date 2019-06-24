import React, { Component } from 'react';
import { withRouter } from 'react-router';
import FaSearch from 'react-icons/lib/fa/search';
// import axios from 'axios';
import SearchBar from './search-bar';

export default () => (
  <SearchBar />
);

// class HomePage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputText: ""
//     };

//     this.onInputChange = this.onInputChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   onInputChange(e) {
//     this.setState({
//       inputText: e.target.value
//     });
//   }

//   onSubmit(e) {
//     e.preventDefault();
//     // axios.get(`http://localhost:4000/movie/${this.state.inputText}`)
//     //   .then(res => {

//     //   })
//     //   .catch(e => console.log(e));
//     this.props.history.push(`/movie/${this.state.inputText}`);
//   }

//   render() {
//     return (
//       <form className="input-group" onSubmit={this.onSubmit}>
//         <input
//           type="text"
//           className="form-control"
//           value={this.state.inputText}
//           onChange={this.onInputChange}
//           placeholder="Search by movie name"
//         />
//         <div className="input-group-btn">
//           <button className="btn btn-default" type="submit">
//             <FaSearch />
//           </button>
//         </div>
//       </form>
//     );
//   }
// }

// export default withRouter(HomePage);
