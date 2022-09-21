import React from "react";
import "./App.css"
import {BrowserRouter, Routes,Route} from 'react-router-dom'; 
import IntroPage from './components/IntroPage/IntroPage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<IntroPage/>}/>
          <Route path='/aaa' element={<h1>hi</h1>}></Route>        
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
