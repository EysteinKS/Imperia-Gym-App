import React, { Component } from "react";
import "./SessionContainer.css";
import AddExercise from "./AddExercise";
import { exercises, exercisesFlat } from "../constants/mock";

import Exercise from "./Exercise"

class SessionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExercises: [],
      newExercise: undefined,
      error: null,
      isDialogOpen: false,
      expanded: null
    };

    this.bottomRef = React.createRef()
  }

  componentDidMount() {
    this.exerciseList = exercisesFlat(exercises);
  }

  scrollToBottom = () => {
    console.log(this.bottomRef)
    this.bottomRef.current.scrollIntoView({behavior: "smooth"})
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
      this.scrollToBottom()
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

  onEditExercise = index => {
    this.setState({ expanded: index })
  }

  render() {
    let list = this.state.currentExercises.map((ex, index) => {
      return (
        <Exercise
          newExercise={ex}
          onChange={changedStep => this.onChangeStep(changedStep, index)}
          onRemove={() => this.onRemoveStep(index)}
          key={index}
          index={index}
          expanded={this.state.expanded}
          setExpanded={(callback) => this.onEditExercise(callback)}
        />
      );
    });

    return (
      <div className="SessionContainer">
        <div className="GridCentered">
          {list}
          <div ref={this.bottomRef}></div>
        </div>
        <AddExercise
          open={this.props.openDialog}
          handleDialogClose={(callback) => this.props.setDialog(callback)}
          handleAddExercise={this.onAddStep}
          exercises={exercises}
          exerciseList={this.exerciseList}
        />
      </div>
    );
  }
}

export default SessionContainer;
