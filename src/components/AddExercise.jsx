//TODO

//HAVE STRING INPUT FIELD ON TOP TO ENTER
//HAVE MENUES UNDERNEATHER FOR MACHINES AND FREEWEIGHT SORTED

import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { exercises} from "../constants/mock"

//FOR THE EXERCISELIST
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Paper from '@material-ui/core/Paper';

const AddExercise = props => {
    const {
        open, 
        handleDialogClose,
        handleAddExercise,
    } = props

    return(
        <Dialog
            open={open}
            scroll="paper"
            onClose={() => handleDialogClose()}
        >
            <DialogTitle>Øvelser</DialogTitle>
            <DialogContent>
                <ExerciseList/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleDialogClose()}>
                    Lukk
                </Button>
                <Button onClick={() => handleAddExercise()}>
                    Velg
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const ExerciseSelect = object => {
    let list = Object.keys(object).map((machine, index) => {
        return(
                <li key={index}>
                <Paper>
                <p>{object[machine].ID}</p>
                <p>{object[machine].name}</p>
                </Paper>
                </li>
        )
    })
    return list
}

const ExerciseList = () => {
    const {FreeWeights, Machines} = exercises
    const {Legs, Shoulders} = Machines
    const {FirstFloor, SecondFloor} = FreeWeights

    const LegsList = ExerciseSelect(Legs)
    const ShouldersList = ExerciseSelect(Shoulders)
    const FirstFloorList = ExerciseSelect(FirstFloor)
    const SecondFloorList = ExerciseSelect(SecondFloor)

    return(
        <div>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <p>Frivekt</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                    <ul><h5>Første Etasje</h5>{FirstFloorList}</ul>
                    <br/>
                    <ul><h5>Andre Etasje</h5>{SecondFloorList}</ul>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <p>Maskiner</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                    <ul><h5>Ben</h5>{LegsList}</ul>
                    <br/>
                    <ul><h5>Skuldre</h5>{ShouldersList}</ul>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

export default AddExercise