import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

class Navbar extends Component {
  state = {
    pathname: 'IoThings'
  }
  handleSidenavClick(e){
    e.preventDefault();
    const sidenav = document.getElementById('links');
    M.Sidenav.getInstance(sidenav).open();
  }
  componentDidMount() {
    const sidenav = document.getElementById('links');
    M.Sidenav.init(sidenav);
  }
  render() {
    return (
      <div className="App">
        <nav style={{ height: "70px", lineHeight: "70px" }} className="nav-wrapper indigo">
          <div className="container center">
            <div className="brand-logo center">{this.state.pathname}</div>
          </div>
          <a href="#!" style={{ height: "70px", lineHeight: "70px" }} className="sidebar-trigger left">
            <i style={{ height: "70px", lineHeight: "70px", fontSize: "48px" }} className="large material-icons" onClick={this.handleSidenavClick}>menu</i>
          </a>
        </nav>

        <ul className="sidenav" id="links">
          <li><Link to="/parameters">Parameters</Link></li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
