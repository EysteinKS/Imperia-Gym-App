//TODO

//HAVE STRING INPUT FIELD ON TOP TO ENTER
//HAVE MENUES UNDERNEATHER FOR MACHINES AND FREEWEIGHT SORTED

import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
//import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { mapObject } from "../util";
import "./AddExercise.css";

//FOR THE EXERCISELIST
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";

//STYLING START
const styles = () => ({
  root: {
    width: "100%",
    padding: "0px"
  },
  panel: {
    width: "100%",
    padding: "0px",
    marginBottom: "0px",
    display: "block"
  },
  darkBackground: {
    backgroundColor: "rgba(0,0,0,.03)"
  },
  center: {
    justifyContent: "center"
  }
});

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0,0,0,.125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    }
  },
  expanded: {
    margin: "auto"
  }
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    borderBottom: "1px solid rgba(0,0,0,.125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = "ExpansionPanelSummary";

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2
  }
}))(MuiExpansionPanelDetails);
//STYLING END

const AddExercise = props => {
  const [exerciseID, setExerciseID] = useState("");
  const [expanded, setExpanded] = useState();
  const [secondExpanded, setSecondExpanded] = useState();

  const {
    open,
    handleDialogClose,
    handleAddExercise,
    exercises,
    classes
  } = props;

  let content = mapObject(exercises, (result, index) => {
    const map = exercises[result];
    const next = mapObject(map, (panel, index) => {
      if (map[panel].name !== undefined) {
        return (
          <ExercisePanel
            panel={map[panel]}
            key={index}
            expanded={secondExpanded}
            setExpanded={setSecondExpanded}
            class={classes.panel}
          >
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
        <ExercisePanel
          panel={map}
          key={index}
          expanded={expanded}
          setExpanded={setExpanded}
          class={classes.panel}
          darkBackground={classes.darkBackground}
        >
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
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle>Øvelser</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions className={classes.center}>
        {/*<ExerciseName exerciseList={exerciseList} exerciseID={exerciseID}/>*/}
        <TextField
          value={exerciseID}
          placeholder="ID"
          onChange={event => setExerciseID(event.target.value)}
          className="ExerciseInput"
          margin="normal"
          variant="filled"
        />
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

    //CHECK IF EXERCISE IS SELECTED, CHANGE COLOR ON PAPER WHEN ACTIVE

    if (object[machine].name !== undefined) {
      return (
        <li key={index}>
          <Paper onClick={() => onChange(id)}>
            <div className="SelectGrid">
              <Radio
                checked={checked === id}
                onChange={() => onChange(id)}
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

/*const ExerciseName = props => {
  const { exerciseList, exerciseID } = props;
  if (exerciseList[exerciseID]) {
    return <p>{exerciseList[exerciseID].name}</p>;
  } else {
    return <CircularProgress/>;
  }
};*/

const ExercisePanel = props => {
  let panelName = props.panel.name;
  let isExpanded = props.expanded === panelName;

  return (
    <ExpansionPanel
      square
      expanded={isExpanded}
      onChange={
        isExpanded
          ? () => {
              props.setExpanded(null);
            }
          : () => {
              props.setExpanded(panelName);
            }
      }
    >
      <ExpansionPanelSummary className={props.darkBackground}>
        <p>{panelName}</p>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={props.class}>
        <div>{props.children}</div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(AddExercise);
