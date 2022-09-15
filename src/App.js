import React from "react";
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'; 
import Navbar from './components/IntroPage/Navbar/Navbar';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar/>
      </Router>
    </div>
  );
}

export default App;
