import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Frontpage from "./components/Frontpage";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Udskift med din GraphQL-server URI
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Frontpage />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
