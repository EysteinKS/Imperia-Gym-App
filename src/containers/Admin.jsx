import React, { Component } from 'react'
import EditExercises from "../components/EditExercises"

export default class Admin extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  componentDidMount() {
    this.setState({exerciseCategories: this.props.exerciseCategories, exerciseList: this.props.exerciseList})
  }

  render() {
    return (
      <div className="adminGrid">
        <section className="adminGridItemA">
          <EditExercises
            categories={this.state.exerciseCategories}
            list={this.state.exerciseList}
          />
        </section>
      </div>
    )
  }
}