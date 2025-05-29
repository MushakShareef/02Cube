


import React from 'react';
import Cube from './components/Cube';
import './App.css'

const images = [
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
  '/images/6.png',
];

function App() {
  

  return (
    <div className="cube-container">
      <h1 className="cube-heading">BK Course Cube</h1>
      <Cube images={images} />
    </div>
  )
}

export default App
