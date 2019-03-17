import React, { Component } from "react";
import "./App.css";
import SessionContainer from "./components/SessionContainer";
import Frame from "./containers/Frame";
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
    firestore.getExercises().then(ret => {
      console.log("Got data from Firestore: ", ret);
      this.setState({ loaded: true, exercises: ret.exercises, exercisesFlat: ret.exercisesFlat });
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
    let exercises = this.state.exercises
    let exercisesFlat = this.state.exercisesFlat

    return (
      <div className="App">
        {loaded ? (
          <Frame
            language={language}
            setDialog={(callback) => this.setDialog(callback)}
            setLanguage={(callback) => this.setLanguage(callback)}>
            <SessionContainer
              openDialog={this.state.openDialog}
              setDialog={callback => this.setDialog(callback)}
              exercises={exercises}
              exercisesFlat={exercisesFlat}
              lang={language}
            />
          </Frame>
        ) : (
          <CircularProgress className="loader" />
        )}
      </div>
    );
  }
}

export default App;
