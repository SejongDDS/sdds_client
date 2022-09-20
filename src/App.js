import React from "react";
import "./App.css"
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'; 
import Navbar from './components/IntroPage/Navbar/Navbar';
import Home from './components/IntroPage/Pages/Home';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Home/>
      </Router>
    </div>
  );
}

export default App;
