import React, { useState } from "react";
import { SquareButton } from "./buttons";
import { mapObject } from "../util";
import "./AddExercise.css";
import { DropdownSelect, DropdownPanel } from "./dropdown";
import { DialogWindow } from "./dialog";

//FOR THE EXERCISELIST
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = () => ({
  root: {
    width: "100%",
    padding: "0px"
  },

  panel: {
    width: "100%",
    padding: "0px",
    marginBottom: "0px",
    display: "block",
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
    margin: "0px !important"
  },

  details: {
    width: "100%",
    padding: "0px",
    marginBottom: "0px",
    display: "block"
  },

  summary: {
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
    expanded: {
      margin: "0 px"
    }
  },

  darkBackground: {
    backgroundColor: "rgba(0,0,0,.03)"
  },

  center: {
    justifyContent: "center"
  }
});

const AddExercise = props => {
  const [exerciseID, setExerciseID] = useState("");
  const [expanded, setExpanded] = useState();
  const [secondExpanded, setSecondExpanded] = useState();

  const {
    open,
    handleDialogClose,
    handleAddExercise,
    exercises,
    classes,
    lang
  } = props;

  let heading;
  if (lang === "NO") {
    heading = "Øvelser";
  } else {
    heading = "Exercises";
  }

  let content = mapObject(exercises, (result, index) => {
    const map = exercises[result];
    const next = mapObject(map, (panel, index) => {
      if (panel !== "active" && panel !== "name" && panel !== "id") {
        if (map[panel].name[lang] !== undefined) {
          let name = map[panel].name[lang];
          return (
            <DropdownPanel
              panelName={name}
              key={index}
              isExpanded={secondExpanded === name}
              setExpanded={setSecondExpanded}
              panelStyle={classes.panel}
              detailsStyle={classes.details}
              summaryStyle={classes.summary}
            >
              <ExerciseSelect
                object={map[panel]}
                checked={exerciseID}
                onChange={setExerciseID}
                lang={lang}
              />
            </DropdownPanel>
          );
        }
      }
    });

    if (result !== "active" && result !== "name" && result !== "id") {
      if (exercises[result].name[lang] !== undefined) {
        let name = map.name[lang];
        return (
          <DropdownPanel
            panelName={name}
            key={index}
            isExpanded={expanded === name}
            setExpanded={setExpanded}
            panelStyle={classes.panel}
            detailsStyle={classes.details}
            summaryStyle={classes.darkBackground + " " + classes.summary}
          >
            {next}
          </DropdownPanel>
        );
      }
    }
  });
  return (
    <DialogWindow
      isOpen={open}
      onClose={() => handleDialogClose(false)}
      dialogStyle="ExerciseDialog"
      title={heading}
      actionsStyle={classes.center}
      actions={
          <DialogActions 
            value={exerciseID}
            setExerciseID={callback => setExerciseID(callback)}
            handleDialogClose={() => handleDialogClose(false)}
            handleAddExercise={() => handleAddExercise(exerciseID)}
          />
      }
    >
      {content}
    </DialogWindow>
  );
};

const DialogActions = (props) => {

  const { value, setExerciseID, handleDialogClose, handleAddExercise } = props
  return(
    <>
    <TextField
      value={value}
      placeholder="ID"
      onChange={event => setExerciseID(event.target.value)}
      className="ExerciseInput"
      margin="normal"
      variant="filled"
    />
    <SquareButton onClick={handleDialogClose}>
      Lukk
    </SquareButton>
    <SquareButton
      onClick={() => {
        handleAddExercise();
        handleDialogClose();
      }}
    >
      Velg
    </SquareButton>
  </>
  )
}

const ExerciseSelect = props => {
  const { object, checked, onChange, lang } = props;
  let list = mapObject(object, (exercise, index) => {
    let id = object[exercise].ID;

    //CHECK IF EXERCISE IS SELECTED, CHANGE COLOR ON PAPER WHEN ACTIVE
    if (exercise !== "active" && exercise !== "name" && exercise !== "id") {
      if (object[exercise].name[lang] !== undefined) {
        return (
          <DropdownSelect
            onClick={onChange}
            index={index}
            key={index}
            paperColor="primary"
            divStyle="SelectGrid"
            radioStyle="SelectRadio"
            checked={checked}
            value={id}
          >
            <p className="SelectID">{id}</p>
            <p className="SelectName">{object[exercise].name[lang]}</p>
          </DropdownSelect>
        );
      }
    }
  });
  return list;
};

export default withStyles(styles)(AddExercise);
