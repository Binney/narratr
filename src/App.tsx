import React from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './Player';
import demo from './stories/Demo';

function App() {
  return (
    <div className="App">
      <Player story={demo}></Player>
    </div>
  );
}

export default App;
