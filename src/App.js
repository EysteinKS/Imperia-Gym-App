import React, { Component } from 'react';
import './App.css';
import SessionContainer from "./components/SessionContainer"


//TODO
//SET UP ROUTING WITH REACT ROUTER
//FIX THE STYLING
//ADD A HEADER/FOOTER


class App extends Component {
  render() {
    return (
      <div className="App">
        <SessionContainer/>
      </div>
    );
  }
}

export default App;
