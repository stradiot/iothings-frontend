import React, { Component } from 'react';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { Agent } from 'https';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import Navbar from './components/Navbar';
import LoginPage from './pages/Login';
import ParametersPage from './pages/Parameters';

const history = createBrowserHistory();

const httpLink = createHttpLink({
  uri: 'https://192.168.1.9:4000/graphql',
  fetchOptions: {
    agent: new Agent({
      rejectUnauthorized: false
    })
  }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: sessionStorage.getItem('auth') || null,
    }
  });

  return forward(operation);
});

const errorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map((e) => console.error(e));
  if (networkError) {
    if (networkError.statusCode === 401) {
      history.push('/login');
    } else {
      console.log(networkError);
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    errorHandler,
    authMiddleware,
    httpLink
  ]),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <div className="App">
            <Navbar />
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/parameters" component={ParametersPage}/>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
