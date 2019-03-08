import React, { Component } from "react"
import PropTypes from "prop-types"
import "./SessionContainer.css"
import AddExercise from "./AddExercise"
import Paper from '@material-ui/core/Paper';
import { exercises, exercisesFlat } from "../constants/mock"

class SessionContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            machines: [],
            newMachine: undefined,
            error: null,
            isDialogOpen: false,
        }
    }

    componentDidMount() {
        this.machineList = exercisesFlat(exercises)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onAddStep = (id) => {
        let addMachine = this.getMachine(id)
        if(addMachine){
            this.setState(state => ({
                machines: state.machines.concat(addMachine),
                isDialogOpen: false
            }))
        } else {
            alert("Finner ikke maskin " + id)
        }
    }

    //TODO: REMOVE STEP BY INDEX
    //CHECK WHY STEP WITH NEXT INDEX GETS WEIGHT-INDEX FROM REMOVED STEP
    onRemoveStep = (index) => {
        let machineArray = this.state.machines
        machineArray.splice(index, 1)

        this.setState({ machines: machineArray })
    }

    onChangeStep = (step, index) => {
        this.setState(state => ({
            machines: []
                .concat(state.machines.slice(0, index))
                .concat(step)
                .concat(state.machines.slice(index + 1))
        }))
    }

    getMachine = (id) => {
        let machineList = this.machineList

        //MAP EXERCISES OBJECT TO A FLAT OBJECT
        //EG exercises.FF01 etc

        if (machineList[id]) {
            let ret = { ...machineList[id], weight: machineList[id].weightArray[0], notes: "" }
            return ret
        } else {
            return false
        }
    }

    onHandleOpen = () => {
        this.setState({
            isDialogOpen: true
        })
    }

    onHandleClose = () => {
        this.setState({
            isDialogOpen: false
        })
    }

    showState = () => {
        console.log(this.state)
    }

    render() {
        let list = this.state.machines.map((machine, index) => {
            return <Machine
                machine={machine}
                onChange={(changedStep) => this.onChangeStep(changedStep, index)}
                onRemove={() => this.onRemoveStep(index)}
                key={index}
            />
        })

        return (
            <div className="SessionContainer">
                <div className="GridCentered">
                    <h1>Økt</h1>
                    <ul>{list}</ul>
                    <div>
                        <input name="newMachine" type="text" value={this.state.newMachine} onChange={this.handleChange}></input>
                        <button onClick={this.onAddStep}>+</button>
                    </div>
                    <button onClick={this.onHandleOpen}>Open Dialog</button>
                    <button onClick={this.showState}>Show State</button>
                </div>
                <AddExercise
                    open={this.state.isDialogOpen}
                    handleDialogClose={this.onHandleClose}
                    handleAddExercise={this.onAddStep}
                    exercises={exercises}
                />
            </div>
        )
    }
}

const Machine = props => {
    const { machine, index, onChange, onRemove } = props

    return (
        <Paper>
            <li key={index} className="ExerciseGrid">
                <p className="GridItemID">ID: {machine.ID}</p>
                <p className="GridItemName">Name: {machine.name}</p>
                <select
                    className="GridItemSelect"
                    value={machine.weight}
                    onChange={(event) => onChange({ ...machine, weight: event.target.value })}>
                    {machine.weightArray.map((weight, index) => {
                        return <option value={weight} key={index}>{weight}</option>
                    })}
                </select>
                <button onClick={onRemove} className="GridItemRemove">Remove</button>
                <input
                    name="notes"
                    type="text"
                    value={machine.notes}
                    onChange={(event) => onChange({ ...machine, notes: event.target.value })}
                    className="GridItemNotes"
                />
            </li>
        </Paper>
    )
}

Machine.propTypes = {
    machine: PropTypes.object,
    index: PropTypes.array,
    onChange: PropTypes.func
}

export default SessionContainer