//TODO

//HAVE STRING INPUT FIELD ON TOP TO ENTER
//HAVE MENUES UNDERNEATHER FOR MACHINES AND FREEWEIGHT SORTED

import React, { useState } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { mapObject } from "../util"

//FOR THE EXERCISELIST
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'

const AddExercise = props => {
    const [exerciseID, setExerciseID] = useState()

    const {
        open,
        handleDialogClose,
        handleAddExercise,
        exercises
    } = props

    const content = mapObject(exercises, (result, index) => {
        const map = exercises[result]
        const next = mapObject(map, (panel, index) => {
            if (map[panel].name !== undefined) {
                return (
                    <ExercisePanel panel={map[panel]} key={index}>
                        <ExerciseSelect
                            object={map[panel]}
                            checked={exerciseID}
                            onChange={setExerciseID}
                        />
                    </ExercisePanel>
                )
            }
        })

        if (exercises[result].name != null) {
            return (
                <ExercisePanel panel={map} key={index}>
                    {next}
                </ExercisePanel>)
        }
    }
    )

    return (
        <Dialog
            open={open}
            scroll="paper"
            onClose={() => handleDialogClose()}
        >
            <DialogTitle>Øvelser</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                <input type="text" value={exerciseID} onChange={(event) => setExerciseID(event.target.value)}/>
                <Button onClick={() => handleDialogClose()}>
                    Lukk
                </Button>
                <Button onClick={() => handleAddExercise(exerciseID)}>
                    Velg
                </Button>
            </DialogActions>
        </Dialog>
    )
}



const ExerciseSelect = (props) => {
    const { object, checked, onChange } = props
    let list = mapObject(object, (machine, index) => {
        let id = object[machine].ID
        if(object[machine].name !== undefined){
            return (
                <li key={index}>
                    <Paper>
                        <Radio
                            checked={checked === id}
                            onChange={() => onChange(id)}
                            color="default"
                            value={id}
                        />
                        <p>{id}</p>
                        <p>{object[machine].name}</p>
                    </Paper>
                </li>
            )
        } else {
            return null
        }
    })
    return list
}

const ExercisePanel = (props) => {
    let panelName = props.panel.name


    return (
        <ExpansionPanel>
            <ExpansionPanelSummary>
                <p>{panelName}</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    {props.children}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

/*const ExerciseList = props => {
    const { exerciseID, setExerciseID } = props
    const { FreeWeights, Machines } = exercises
    const { Legs, Shoulders } = Machines
    const { FirstFloor, SecondFloor } = FreeWeights

    let LegsList = ExerciseSelect(Legs, exerciseID, setExerciseID)
    let ShouldersList = ExerciseSelect(Shoulders, exerciseID, setExerciseID)
    let FirstFloorList = ExerciseSelect(FirstFloor, exerciseID, setExerciseID)
    let SecondFloorList = ExerciseSelect(SecondFloor, exerciseID, setExerciseID)

    return (
        <div>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <p>Frivekt</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <ExpansionPanel>
                            <ExpansionPanelSummary>
                                <p>Første Etasje</p>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ul>{FirstFloorList}</ul>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary>
                                <p>Andre Etasje</p>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ul>{SecondFloorList}</ul>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <p>Maskiner</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <ExpansionPanel>
                            <ExpansionPanelSummary>
                                <p>Ben</p>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ul>{LegsList}</ul>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary>
                                <p>Skuldre</p>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ul>{ShouldersList}</ul>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}*/

export default AddExercise