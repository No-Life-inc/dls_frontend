import React from 'react';
import logo from './logo.svg';
import './App.css';
import Frontpage from "./components/Frontpage";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

/**
 * ApolloClient instance for connecting to the GraphQL server.
 */
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace with your GraphQL server URI
  cache: new InMemoryCache()
});

/**
 * Main component of the application.
 * Renders the Frontpage component wrapped in ApolloProvider for GraphQL support.
 * @returns JSX element representing the entire application
 */
function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
      <header className="App-header">
        <Frontpage />
      </header>
      </ApolloProvider>
    </div>
  );
}

export default App;
