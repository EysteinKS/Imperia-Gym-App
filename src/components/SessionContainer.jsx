import React, { Component } from "react"
import PropTypes from "prop-types"
import "./SessionContainer.css"
import AddExercise from "./AddExercise"
import Paper from '@material-ui/core/Paper';

class SessionContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            machines: [],
            newMachine: undefined,
            error: null,
            isDialogOpen: false,
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onAddStep = () => {
        if (this.state.newMachine){
            let addMachine = this.getMachine(this.state.newMachine)
            if(addMachine){
                this.setState(state => ({
                    machines: state.machines.concat(addMachine),
                }))
            } else {
                alert("Finner ikke maskinen med nummer " + this.state.newMachine)
            }
        } else {
            alert("Du må skrive inn et nummer for å legge til en maskin!")
        }
    }

    //TODO: REMOVE STEP BY INDEX
    //CHECK WHY STEP WITH NEXT INDEX GETS WEIGHT-INDEX FROM REMOVED STEP
    onRemoveStep = (index) => {
        let machineArray = this.state.machines
        let removed = machineArray.splice(index , 1)

        this.setState({ machines: machineArray })
    }

    onChangeStep = (step, index) => {
        this.setState(state => ({
            machines: []
                .concat(state.machines.slice(0, index))
                .concat(step)
                .concat(state.machines.slice(index +1))
        }))
    }

    getMachine = (id) => {
        let machineList = [
            {id: 1, name: "Ting", weightArray: [1, 2, 3, 4]},
            {id: 2, name: "Tang", weightArray: [5, 6, 7, 8]},
            {id: 3, name: "Tung", weightArray: [9, 10, 11, 12]},
            {id: 4, name: "Tyng", weightArray: [13, 14, 15, 16]}
        ]

        if(machineList[id - 1]){
            let ret = { ...machineList[id - 1], weight: machineList[id - 1].weightArray[0] }
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

    render(){
        let list = this.state.machines.map((machine, index) => {
            return <Machine 
                        machine={machine}
                        onChange={(changedStep) => this.onChangeStep(changedStep, index)}
                        onRemove={() => this.onRemoveStep(index)}
                        key={index}
                    />
        })

        return(
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
                />
            </div>
        )
    }
}

const Machine = props => {
    const { machine, index, onChange, onRemove } = props
    
    return(
        <Paper>
        <li key={index} className="ExerciseGrid">
            <p className="GridItemID">ID: {machine.id}</p>
            <p className="GridItemName">Name: {machine.name}</p>
            <select
            className="GridItemSelect"
            value={machine.weight}
            onChange={(event) => onChange({ ...machine, weight: event.target.value })}>
                {machine.weightArray.map(weight => {
                    return <option value={weight}>{weight}</option>
                })}
            </select>
            <button onClick={onRemove} className="GridItemRemove">Remove</button>
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