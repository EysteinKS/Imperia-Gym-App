import React, { Component } from "react";
import EditExercises from "../components/EditExercises";
import AdminDialog from "../components/AdminDialog";
import "./Admin.css";
//import EditExerciseDialog from "../components/EditExerciseDialog"

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogType: {
        content: "",
        action: {
          type: "",
          target: ""
        }
      },
      openDialog: false,
    };
  }

  openExerciseDialog = action => {
    this.setState({
      dialogType: {
        content: "exercise",
        action: action
      },
      openDialog: true
    })
  };

  openCategoryDialog = action => {
    this.setState({
      dialogType: {
        content: "category",
        action: action
      },
      openDialog: true
    })
  };

  closeDialog = () => {
    this.setState({
      openDialog: false
    })
  }

  onAdd = () => {}
  onEdit = () => {}

  render() {
    console.log("Admin props: ", this.props);
    return (
      <div className="adminBlock">
        <div className="adminGrid">
          <section className="adminGridItemB">
            <EditExercises
              categories={this.props.exerciseCategories}
              list={this.props.exerciseList}
              lang={this.props.lang}
              openExerciseDialog={callback => this.openExerciseDialog(callback)}
              openCategoryDialog={callback => this.openCategoryDialog(callback)}
            />
          </section>
        </div>
        <AdminDialog 
          openDialog={this.state.openDialog}
          onClose={this.closeDialog}
          onAdd={(callback) => this.onAdd(callback)}
          onEdit={(callback) => this.onEdit(callback)}
          dialogType={this.state.dialogType}
        />
      </div>
    );
  }
}
