// src/App.js
// eslint-disable-next-line no-unused-vars
import React, {useEffect} from 'react';
// eslint-disable-next-line no-unused-vars
import { useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import {getNews} from './actions/news'
import './App.css';
import RoutesComponent from './Routes';


function App() {
 
  return (
    <div className="App">
    
      <RoutesComponent />
      
    </div>
  );
}

export default App;