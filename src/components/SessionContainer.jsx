import React, { Component } from "react"
import "./SessionContainer.css"
import AddExercise from "./AddExercise"
import Paper from '@material-ui/core/Paper';
import { exercises, exercisesFlat } from "../constants/mock"

import Fab from '@material-ui/core/Fab';
import Button from "@material-ui/core/Button"
import AddIcon from '@material-ui/icons/Add';
import Edit from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

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
                    <Fab onClick={this.onHandleOpen} color="default"><AddIcon/></Fab>
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
                <p className="GridItemID">{machine.ID}</p>
                <p className="GridItemName">{machine.name}</p>
                <Select
                    className="GridItemSelect"
                    value={machine.weight}
                    onChange={(event) => onChange({ ...machine, weight: event.target.value })}
                    input={<OutlinedInput
                        labelWidth={0}
                    />}>
                    {machine.weightArray.map((weight, index) => {
                        return <MenuItem value={weight} key={index}>{weight}</MenuItem>
                    })}
                </Select>
                <Button className="GridItemEdit"><Edit/></Button>
                <Button onClick={onRemove} className="GridItemRemove"><DeleteIcon/></Button>
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

export default SessionContainer