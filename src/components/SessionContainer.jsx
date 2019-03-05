import React, { Component } from "react"
import PropTypes from "prop-types"


class SessionContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            machines: [],
            newMachine: undefined,
            error: null
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
        console.log("Removing step", ...removed)

        this.setState({ machines: machineArray }, () => console.log(this.state.machines))
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
            console.log("Found machine with ID" + id)
            let ret = { ...machineList[id - 1], weight: machineList[id - 1].weightArray[0] }
            return ret
        } else {
            console.log("Didn't find machine with ID" + id)
            return false
        }
    }

    checkState = () => {
        console.log(this.state.machines)
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
            <div>
                <ul>{list}</ul>
                <div>
                    <input name="newMachine" type="tel" value={this.state.newMachine} onChange={this.handleChange}></input>
                    <button onClick={this.onAddStep}>+</button>
                </div>
                <button onClick={this.checkState}>Check State</button>
            </div>
        )
    }
}

const Machine = props => {
    const { machine, index, onChange, onRemove } = props
    
    return(
        <li key={index}>
            <p>ID: {machine.id}</p>
            <p>Name: {machine.name}</p>
            <select 
            value={machine.weight}
            onChange={(event) => onChange({ ...machine, weight: event.target.value })}>
                {machine.weightArray.map(weight => {
                    return <option value={weight}>{weight}</option>
                })}
            </select>
            <button onClick={onRemove}>Remove</button>
        </li>
    )
}

Machine.propTypes = {
    machine: PropTypes.object,
    index: PropTypes.array,
    onChange: PropTypes.func
}

export default SessionContainer