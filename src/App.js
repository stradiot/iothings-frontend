import React, { Component } from 'react';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { Agent } from 'https';
import { getMainDefinition } from 'apollo-utilities';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import Navbar from './components/common/Navbar';

import LoginPage from './pages/Login';
import ParametersPage from './pages/Parameters';
import ModulesPage from './pages/Modules';
import ParameterHistoryPage from './pages/ParameterHistory';
import ZwavePage from './pages/Zwave';
import MapZwavePage from './pages/MapZwave';


const history = createBrowserHistory();

const httpLink = createHttpLink({
  uri: 'https://192.168.1.9:4000/graphql',
  fetchOptions: {
    agent: new Agent({
      rejectUnauthorized: false,
      credentials: 'include'
    })
  }
});

const wsLink = new WebSocketLink({
  uri: `wss://192.168.1.9:4000/graphql`,
  options: {
    reconnect: true,
    connectionCallback: (e) => e && console.error(e)
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
      console.error(networkError);
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: ApolloLink.from([
    errorHandler,
    authMiddleware,
    link
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
            <Switch>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/parameters" component={ParametersPage}/>
              <Route exact path="/parameterHistory" component={ParameterHistoryPage}/>
              <Route exact path="/modules" component={ModulesPage}/>
              <Route exact path="/zwave" component={ZwavePage}/>
              <Route exact path="/zwave/mapZwave" component={MapZwavePage}/>
              <Redirect from="/" to="/parameters"/>
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
