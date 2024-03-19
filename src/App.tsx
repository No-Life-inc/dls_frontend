import React from 'react';
import './App.css';
import Frontpage from "./components/Frontpage";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { config } from 'dotenv';

config();

const client = new ApolloClient({
  uri: process.env.GRAPHQLURL, // use the GRAPHQLURL environment variable
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
