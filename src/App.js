import React from 'react';
import './components/bootstrap.min.css';
import './components/styles.css';
import './App.css';
import List from './components/list'
import Title from './components/title'
import Buttons from './components/buttons';

function App() {
  return (
    <div className="App">
      <Title />
      <Buttons />
      <List />
    </div>
  );
}

export default App;
