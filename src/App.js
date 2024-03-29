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
import DevicesPage from './pages/Devices';
import CreateDeviceTypePage from './pages/CreateDeviceType';
import ModulesPage from './pages/Modules';
import ParameterHistoryPage from './pages/ParameterHistory';
import ZwavePage from './pages/Zwave';
import MapZwavePage from './pages/MapZwave';


const history = createBrowserHistory();

const httpLink = createHttpLink({
  uri: '/graphql',
  fetchOptions: {
    agent: new Agent({
      rejectUnauthorized: false,
      credentials: 'include'
    })
  }
});

const wsLink = new WebSocketLink({
  uri: '/graphql',
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
    graphQLErrors.forEach((e) => {
      console.error(e.message);
      alert(e.message);
    });
  if (networkError) {
    if (networkError.statusCode === 401) {
      history.push('/login');
    } else {
      console.error(networkError);
      alert(networkError.message);
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
              <Route exact path="/devices" component={DevicesPage}/>
              <Route exact path="/devices/createDeviceType" component={CreateDeviceTypePage}/>
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
