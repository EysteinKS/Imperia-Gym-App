import React, { Component } from "react";
import "./App.css";
import { firestore } from "./firebase";
import * as db from "./dev/Database"
import { nestObject } from "./api/nest"
import CircularProgress from "@material-ui/core/CircularProgress";

import { BrowserRouter, Route } from "react-router-dom";
import * as routes from "./constants/routes";

import SessionContainer from "./components/SessionContainer";
import Admin from "./containers/Admin";
import Frame from "./containers/Frame";

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
      language: "NO",
      exerciseCategories: {},
      exerciseList: {}
    };
  }

  componentDidMount() {
    console.log(nestObject(db.exerciseCollection))
    this.setState({
      exerciseCategories: db.categories,
      exerciseList: db.exerciseList,
      loaded: true
    })
    /*firestore.getExercises().then(ret => {
      console.log("Got data from Firestore: ", ret);
      this.setState({
        exercises: ret.exercises,
        exercisesFlat: ret.exercisesFlat
      });
    });
    firestore.getExercisesFromFirestore().then(ret => {
      this.setState({
        exerciseCategories: ret.exerciseCategories,
        exerciseList: ret.exerciseList,
        loaded: true
      });
    });*/
  }

  setDialog = next => {
    this.setState({ openDialog: next });
  };

  setLanguage = lang => {
    this.setState({ language: lang });
  };

  render() {
    let loaded = this.state.loaded;
    let language = this.state.language;
    let exercises = this.state.exercises;
    let exercisesFlat = this.state.exercisesFlat;

    let session = (
      <SessionContainer
        openDialog={this.state.openDialog}
        setDialog={callback => this.setDialog(callback)}
        exercises={exercises}
        exercisesFlat={exercisesFlat}
        lang={language}
      />
    );
    let admin = (
      <Admin
        exerciseList={this.state.exerciseList}
        exerciseCategories={this.state.exerciseCategories}
        lang={language}
      />
    );

    return (
      <BrowserRouter>
        <div className="App">
          {loaded ? (
            <Frame
              language={language}
              setDialog={callback => this.setDialog(callback)}
              setLanguage={callback => this.setLanguage(callback)}
            >

              <Route exact path={"/"} component={() => admin} />
              <Route exact path={routes.SESSION} component={() => session} />

            </Frame>
          ) : (
            <CircularProgress className="loader" />
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
