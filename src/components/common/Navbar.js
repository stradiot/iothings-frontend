import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

class Navbar extends Component {
  componentDidMount() {
    const sidenav = document.getElementById('links');
    M.Sidenav.init(sidenav);
  }
  handleSidenavClick(e) {
    e.preventDefault();
    
    const sidenav = document.getElementById('links');
    M.Sidenav.getInstance(sidenav).open();
  }
  handleLinkClick() {
    const sidenav = document.getElementById('links');
    M.Sidenav.getInstance(sidenav).close();
  }
  handleLogoutClick() {
    const sidenav = document.getElementById('links');
    M.Sidenav.getInstance(sidenav).close();
    sessionStorage.removeItem('auth');
  }
  render() {
    return (
      <div className="App">
        <nav style={{ height: "70px", lineHeight: "70px" }} className="nav-wrapper indigo">
          <div className="container center">
            <div className="brand-logo center">IoThings</div>
          </div>
          <a
            href="#!"
            style={{ height: "70px", lineHeight: "70px" }}
            className="sidebar-trigger left">
            <i
              style={{ height: "70px", lineHeight: "70px", fontSize: "48px" }}
              className="large material-icons"
              onClick={this.handleSidenavClick}>
              menu
            </i>
          </a>
        </nav>

        <ul
          className="sidenav"
          id="links"
          style={{
            display: 'flex',
            flexDirection: "column",
            textAlign: 'center',
            width: '250px'
          }}>
          <h3 className="indigo-text">IoThings</h3>
          <li onClick={this.handleLinkClick}>
            <Link to="/parameters">Parameters</Link>
          </li>
          <li onClick={this.handleLinkClick}>
            <Link to="/parameterHistory">Parameter history</Link>
          </li>
          <li onClick={this.handleLinkClick}>
            <Link to="/devices">Devices</Link>
          </li>
          <li onClick={this.handleLinkClick}>
            <Link to="/modules">Communication modules</Link>
          </li>
          <li onClick={this.handleLinkClick}>
            <Link to="/zwave">Z-Wave</Link>
          </li>
          <li onClick={this.handleLogoutClick} style={{ marginTop: "auto" }}>
            <Link to="/login">
              Logout
              <i className="material-icons right">directions_run</i>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
