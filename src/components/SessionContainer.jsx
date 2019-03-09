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
      expanded: null,
      shouldScroll: false
    };
    this.lastRef = React.createRef(null)
    this.list = []
  }

  componentDidMount() {
    this.exerciseList = exercisesFlat(exercises);
  }

  componentDidUpdate() {
    if (this.list.length && this.state.shouldScroll) {
      this.lastRef = this.list[this.list.length - 1].ref; 
      this.scrollToBottom()
      this.setState({shouldScroll: false})
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onAddStep = id => {
    let newExercise = this.getExerciseList(id.toUpperCase());
    if (newExercise) {
      this.setState(state => ({
        currentExercises: state.currentExercises.concat(newExercise),
        isDialogOpen: false,
        shouldScroll: true
      }));
    } else {
      alert("Finner ikke maskin " + id);
    }
  };

  scrollToBottom = () => {
    this.lastRef.current.scrollIntoView({ behavior: "smooth" })
    this.setState({ shouldScroll: false })
  }

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
    this.list = this.state.currentExercises.map((ex, index) => {
      return (
        <div ref={this.lastRef}>
          <Exercise
            newExercise={ex}
            onChange={changedStep => this.onChangeStep(changedStep, index)}
            onRemove={() => this.onRemoveStep(index)}
            key={index}
            index={index}
            expanded={this.state.expanded}
            setExpanded={(callback) => this.onEditExercise(callback)}
          />
        </div>
      );
    });

    return (
      <div className="SessionContainer">
        <div className="GridCentered">
          {this.list}
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
