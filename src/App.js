import React, { Component } from 'react';
import './App.css';
import SessionContainer from "./components/SessionContainer"
import Header from "./components/Header"


//TODO
//SET UP ROUTING WITH REACT ROUTER
//FIX THE STYLING
//ADD A HEADER/FOOTER


class App extends Component {
  constructor(){
    super()
    this.state = {
      openDialog: false
    }
  }

  setDialog = next => {
    this.setState({ openDialog: next })
  }

  render() {
    return (
      <div className="App">
        <SessionContainer openDialog={this.state.openDialog} setDialog={(callback) => this.setDialog(callback)}/>
        <Header setDialog={(callback) => this.setDialog(callback)}/>
      </div>
    );
  }
}

export default App;
