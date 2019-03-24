import React, { Component } from "react";
import "./css/SessionContainer.css";
import SessionDialog from "./SessionDialog";
import Exercise from "./Exercise"

class SessionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExercises: [],
      error: null,
      isDialogOpen: false,
      expanded: null,
      shouldScroll: false
    };

    //Used for scrolling to bottom when adding new exercise
    this.lastRef = React.createRef(null)
    this.list = []
  }



  componentDidUpdate() {
    console.log("SessionContainer updated")
    if (this.list.length && this.state.shouldScroll) {
      console.log("Scrolling to bottom")
      this.lastRef = this.list[this.list.length - 1].ref; 
      this.scrollToBottom()
      this.setState({shouldScroll: false})
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onAddStep = id => {
    console.log("id at onAddStep: ", id)
    let newExercise = this.getExerciseList(id.toUpperCase());
    if (newExercise) {
      this.setState({
        currentExercises: this.state.currentExercises.concat(newExercise),
        isDialogOpen: false,
        shouldScroll: true,
        expanded: null
      }, console.log("did setState, new state: ", this.state));
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
    let exerciseList = this.props.exercisesFlat;
    console.log(exerciseList[id])
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
        <div ref={this.lastRef} key={index}>
          <Exercise
            newExercise={ex}
            onChange={changedStep => this.onChangeStep(changedStep, index)}
            onRemove={() => this.onRemoveStep(index)}
            key={index}
            index={index}
            expanded={this.state.expanded}
            setExpanded={(callback) => this.onEditExercise(callback)}
            lang={this.props.lang}
          />
        </div>
      );
    });
    console.log("currentExercises: ", this.state.currentExercises)

    return (
      <div className="SessionContainer">
        <div className="GridCentered">
          {this.list}
        </div>
        <SessionDialog
          open={this.props.openDialog}
          handleDialogClose={(callback) => this.props.setDialog(callback)}
          handleAddExercise={this.onAddStep}
          categories={this.props.exercises}
          list={this.props.exercisesFlat}
          lang={this.props.lang}
        />
      </div>
    );
  }
}

export default SessionContainer;
