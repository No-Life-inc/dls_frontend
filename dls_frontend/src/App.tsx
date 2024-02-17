import React from 'react';
import logo from './logo.svg';
import './App.css';
import Frontpage from "./components/Frontpage";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace with your GraphQL server URI
  cache: new InMemoryCache()
});


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
