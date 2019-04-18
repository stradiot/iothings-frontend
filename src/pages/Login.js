import React, { Component } from 'react';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    handleUserInput = (e) => {
      this.setState({
        username: e.target.value
      });
    }
    handlePasswordInput = (e) => {
      this.setState({
        password: e.target.value
      });
    }
    handleSubmit = (e) => {
      e.preventDefault();
      const { username, password } = this.state;
      const auth = Buffer.from(`${username}:${password}`).toString("base64");

      sessionStorage.setItem('auth', `Basic ${auth}`);
      this.props.history.goBack();
    }
    render(){
      return (
        <div style={{ maxWidth: '350px' }} className="container vcenter center">
          <form action="" onSubmit={this.handleSubmit}>
            <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input type="text" id="username" onChange={this.handleUserInput}/>
                <label htmlFor="username">Username</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix">lock</i>
              <input type="password" id="password" onChange={this.handlePasswordInput}/>
              <label htmlFor="password">Password</label>
            </div>
            <button style={{ margin: "70px"}} className="btn-large waves-effect waves-light indigo" type="submit" name="action">
              Login
              <i className="material-icons right">exit_to_app</i>
            </button>
          </form>
        </div>
      );
    }
}

export default Login;
