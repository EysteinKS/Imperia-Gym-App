import React, { Component } from "react";
import "./SessionContainer.css";
import AddExercise from "./AddExercise";
import { exercises, exercisesFlat } from "../constants/mock";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Exercise from "./Exercise"

class SessionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExercises: [],
      newExercise: undefined,
      error: null,
      isDialogOpen: false
    };
  }

  componentDidMount() {
    this.exerciseList = exercisesFlat(exercises);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onAddStep = id => {
    let newExercise = this.getExerciseList(id.toUpperCase());
    if (newExercise) {
      this.setState(state => ({
        currentExercises: state.currentExercises.concat(newExercise),
        isDialogOpen: false
      }));
    } else {
      alert("Finner ikke maskin " + id);
    }
  };

  onRemoveStep = index => {
    let exerciseArray = this.state.currentExercises;
    exerciseArray.splice(index, 1);

    this.setState({ currentExercises: exerciseArray });
  };

  onChangeStep = (step, index) => {
    this.setState(state => ({
      currentExercises: []
        .concat(state.currentExercises.slice(0, index))
        .concat(step)
        .concat(state.currentExercises.slice(index + 1))
    }));
  };

  getExerciseList = id => {
    let exerciseList = this.exerciseList;
    if (exerciseList[id]) {
      let ret = {
        ...exerciseList[id],
        weight: exerciseList[id].weightArray[0],
        notes: ""
      };
      return ret;
    } else {
      return false;
    }
  };

  onHandleOpen = () => {
    this.setState({
      isDialogOpen: true
    });
  };

  onHandleClose = () => {
    this.setState({
      isDialogOpen: false
    });
  };

  render() {
    let list = this.state.currentExercises.map((ex, index) => {
      return (
        <Exercise
          newExercise={ex}
          onChange={changedStep => this.onChangeStep(changedStep, index)}
          onRemove={() => this.onRemoveStep(index)}
          key={index}
        />
      );
    });

    return (
      <div className="SessionContainer">
        <div className="GridCentered">
          <h1>Økt</h1>
          {list}
          <Fab onClick={this.onHandleOpen} color="default">
            <AddIcon />
          </Fab>
        </div>
        <AddExercise
          open={this.state.isDialogOpen}
          handleDialogClose={this.onHandleClose}
          handleAddExercise={this.onAddStep}
          exercises={exercises}
          exerciseList={this.exerciseList}
        />
      </div>
    );
  }
}

export default SessionContainer;
