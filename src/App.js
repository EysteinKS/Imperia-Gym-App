import React, { Component } from "react";
import "./App.css";
import * as db from "./dev/Database";
import { nestObject } from "./api/nest";
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
      exerciseList: {},
      currentExercises: []
    };
  }

  componentDidMount() {
    nestObject(db.exerciseCollection).then(ret => {
      console.log(ret);
      let { categories, exercisesList } = ret;
      this.setState({
        exerciseCategories: categories,
        exerciseList: exercisesList,
        loaded: true
      });
    });
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

  componentDidUpdate(){
    console.log("App state = ", this.state)
  }

  setDialog = next => {
    this.setState({ openDialog: next });
  };

  setLanguage = lang => {
    this.setState({ language: lang });
  };

  addExercise = newExercise => {
    this.setState(state => ({
      currentExercises: state.currentExercises.concat(newExercise)
    }))
  }

  render() {
    let loaded = this.state.loaded;
    let language = this.state.language;
    let categories = this.state.exerciseCategories;
    let exerciseList = this.state.exerciseList;

    return (
      <BrowserRouter>
        <div className="App">
          {loaded ? (
            <Frame
              language={language}
              setDialog={callback => this.setDialog(callback)}
              setLanguage={callback => this.setLanguage(callback)}
            >
              <Route
                exact
                path={"/"}
                component={() => (
                  <Admin
                    exerciseList={exerciseList}
                    exerciseCategories={categories}
                    lang={language}
                  />
                )}
              />
              <Route
                exact
                path={routes.SESSION}
                component={() => (
                  <SessionContainer
                    openDialog={this.state.openDialog}
                    setDialog={callback => this.setDialog(callback)}
                    currentExercises={this.state.currentExercises}
                    addExercise={(callback) => this.addExercise(callback)}
                    exercises={categories}
                    exercisesFlat={exerciseList}
                    lang={language}
                  />
                )}
              />
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
