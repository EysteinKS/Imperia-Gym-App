import React, { Component } from 'react'
import EditExercises from "../components/EditExercises"
import "./Admin.css"
//import EditExerciseDialog from "../components/EditExerciseDialog"

export default class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  onEditExercise = (id) => {

  }

  onEditCategory = (id) => {

  }

  render() {
    console.log("Admin props: ", this.props)
    return (
      <div className="adminGrid">
        <section className="adminGridItemB">
          <EditExercises
            categories={this.props.exerciseCategories}
            list={this.props.exerciseList}
            lang={this.props.lang}
            onEditExercise={(callback) => this.onEditExercise(callback)}
            onEditCategory={(callback) => this.onEditCategory(callback)}
          />
        </section>
        {/*<EditExerciseDialog/>*/}
      </div>
    )
  }
}