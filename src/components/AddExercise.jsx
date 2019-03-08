//TODO

//HAVE STRING INPUT FIELD ON TOP TO ENTER
//HAVE MENUES UNDERNEATHER FOR MACHINES AND FREEWEIGHT SORTED

import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { mapObject } from "../util";
import "./AddExercise.css";

//FOR THE EXERCISELIST
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";

const AddExercise = props => {
  const [exerciseID, setExerciseID] = useState();
  const [expanded, setExpanded] = useState();
  const [secondExpanded, setSecondExpanded] = useState()

  const { open, handleDialogClose, handleAddExercise, exercises } = props;

  const content = mapObject(exercises, (result, index) => {
    const map = exercises[result];
    const next = mapObject(map, (panel, index) => {
      if (map[panel].name !== undefined) {
        return (
          <ExercisePanel panel={map[panel]} key={index} expanded={secondExpanded} setExpanded={setSecondExpanded}>
            <ExerciseSelect
              object={map[panel]}
              checked={exerciseID}
              onChange={setExerciseID}
            />
          </ExercisePanel>
        );
      }
    });

    if (exercises[result].name != null) {
      return (
        <ExercisePanel panel={map} key={index} expanded={expanded} setExpanded={setExpanded}>
          {next}
        </ExercisePanel>
      );
    }
  });

  return (
    <Dialog
      open={open}
      scroll="paper"
      onClose={() => handleDialogClose()}
      className="ExerciseDialog"
      maxWidth="md"
    >
      <DialogTitle>Øvelser</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <input
        type="text"
        value={exerciseID}
        onChange={event => setExerciseID(event.target.value)}
        className="ExerciseInput"
      />
      <DialogActions>
        <Button onClick={() => handleDialogClose()}>Lukk</Button>
        <Button onClick={() => handleAddExercise(exerciseID)}>Velg</Button>
      </DialogActions>
    </Dialog>
  );
};

const ExerciseSelect = props => {
  const { object, checked, onChange } = props;
  let list = mapObject(object, (machine, index) => {
    let id = object[machine].ID;
    if (object[machine].name !== undefined) {
      return (
        <li key={index}>
          <Paper onClick={() => onChange(id)}>
            <div className="SelectGrid">
              <Radio
                checked={checked === id}
                onChange={() => onChange(id)}
                color="default"
                value={id}
                className="SelectRadio"
              />
              <p className="SelectID">{id}</p>
              <p className="SelectName">{object[machine].name}</p>
            </div>
          </Paper>
        </li>
      );
    } else {
      return null;
    }
  });
  return list;
};

const ExercisePanel = props => {
  let panelName = props.panel.name;
  let isExpanded = (props.expanded === panelName)

  return (
    <ExpansionPanel
        square
        expanded={isExpanded}
        onChange={isExpanded ? () => props.setExpanded(null) : () => props.setExpanded(panelName)}
    >
      <ExpansionPanelSummary>
        <p>{panelName}</p>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>{props.children}</div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default AddExercise;
