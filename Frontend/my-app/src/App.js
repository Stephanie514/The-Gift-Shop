import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Products from './components/Products'; 
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/products" component={Products} />
          <Route path="/navbar" component={Navbar} />
          <Route path="/footer" component={Footer} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;