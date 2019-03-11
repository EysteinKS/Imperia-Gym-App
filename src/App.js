import React, { Component } from "react";
import "./App.css";
import SessionContainer from "./components/SessionContainer";
import Header from "./components/Header";
import { firestore } from "./firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

//TODO
//SET UP ROUTING WITH REACT ROUTER
//FIX THE STYLING
//ADD A HEADER/FOOTER

class App extends Component {
  constructor() {
    super();
    this.state = {
      openDialog: false,
      loaded: false,
      language: "NO"
    };
  }

  componentDidMount() {
    firestore.getExercises().then(exercises => {
      console.log("Got data from Firestore: ", exercises);
      this.setState({ loaded: true, exercises: exercises });
    });
  }

  setDialog = next => {
    this.setState({ openDialog: next });
  };

  setLanguage = lang => {
    this.setState({ language: lang })
  }

  render() {
    let loaded = this.state.loaded;
    let language = this.state.language

    return (
      <div className="App">
        {loaded ? (
          <React.Fragment>
            <SessionContainer
              openDialog={this.state.openDialog}
              setDialog={callback => this.setDialog(callback)}
              exercises={this.state.exercises}
              lang={language}
            />
            <Header setDialog={callback => this.setDialog(callback)} language={language} setLanguage={callback => this.setLanguage(callback)}/>
          </React.Fragment>
        ) : (
          <CircularProgress className="loader" />
        )}
      </div>
    );
  }
}

export default App;
