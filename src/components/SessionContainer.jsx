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
      machines: [],
      newMachine: undefined,
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
    let newMachine = this.getExerciseList(id);
    if (newMachine) {
      this.setState(state => ({
        machines: state.machines.concat(newMachine),
        isDialogOpen: false
      }));
    } else {
      alert("Finner ikke maskin " + id);
    }
  };

  onRemoveStep = index => {
    let machineArray = this.state.machines;
    machineArray.splice(index, 1);

    this.setState({ machines: machineArray });
  };

  onChangeStep = (step, index) => {
    this.setState(state => ({
      machines: []
        .concat(state.machines.slice(0, index))
        .concat(step)
        .concat(state.machines.slice(index + 1))
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
    let list = this.state.machines.map((machine, index) => {
      return (
        <Exercise
          machine={machine}
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
          exerciseList={exercisesFlat(exercises)}
        />
      </div>
    );
  }
}

export default SessionContainer;
