import React, { useState } from "react";
import { SquareButton } from "./buttons";
import { mapObject } from "../util";
import "./css/AddExercise.css";
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

const SessionDialog = props => {
  const [exerciseID, setExerciseID] = useState("");

  const {
    open,
    handleDialogClose,
    handleAddExercise,
    categories,
    list,
    classes,
    lang
  } = props;

  let heading;
  if (lang === "NO") {
    heading = "Øvelser";
  } else {
    heading = "Exercises";
  }

  let content = []
  mapObject(categories, (category, index) => {
    content.push(
      <ExercisesPanel 
        category={categories[category]}
        key={index}
        list={list}
        lang={lang}
        checked={exerciseID}
        onChange={setExerciseID}
      />
    )
  })

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

const DialogActions = props => {
  const { value, setExerciseID, handleDialogClose, handleAddExercise } = props;
  return (
    <>
      <TextField
        value={value}
        placeholder="ID"
        onChange={event => setExerciseID(event.target.value)}
        className="ExerciseInput"
        margin="normal"
        variant="filled"
      />
      <SquareButton onClick={handleDialogClose}>Lukk</SquareButton>
      <SquareButton
        onClick={() => {
          handleAddExercise();
          handleDialogClose();
        }}
      >
        Velg
      </SquareButton>
    </>
  );
};

const exercisesPanel = props => {
  const { category, list, lang, checked, onChange, classes } = props
  const [isExpanded, setExpanded] = useState(false);
  let nestedPanels = [];

  if (category.categories && !category.exercises){
    mapObject(category.categories, (cat, index) => {
      nestedPanels.push(
        <ExercisesPanel
          category={category.categories[cat]}
          key={index}
          list={list}
          lang={lang}
          checked={checked}
          onChange={onChange}
        />
      )
    })
    return (
      <DropdownPanel
        panelName={category.name[lang]}
        isExpanded={isExpanded}
        setExpanded={() => setExpanded(!isExpanded)}
        panelStyle={classes.panel}
        detailsStyle={classes.details}
        summaryStyle={classes.summary}
      >
        {nestedPanels}
      </DropdownPanel>
    )
  } else if(category.exercises && category.categories){
    mapObject(category.categories, (cat, index) => {
      nestedPanels.push(
        <ExercisesPanel
          category={category.categories[cat]}
          key={index}
          list={list}
          lang={lang}
          checked={checked}
          onChange={onChange}
        />
      )
    })
    return(
      <DropdownPanel
        panelName={category.name[lang]}
        isExpanded={isExpanded}
        setExpanded={() => setExpanded(!isExpanded)}
        panelStyle={classes.panel}
        detailsStyle={classes.details}
        summaryStyle={classes.summary}
      >
        <ExerciseSelect
          exercises={category.exercises}
          list={list}
          lang={lang}
          checked={checked}
          onChange={onChange}
        />
        {nestedPanels}
      </DropdownPanel>
    )
  } else if (category.exercises && !category.categories){
    return(
    <DropdownPanel
      panelName={category.name[lang]}
      isExpanded={isExpanded}
      setExpanded={() => setExpanded(!isExpanded)}
      panelStyle={classes.panel}
      detailsStyle={classes.details}
      summaryStyle={classes.summary}
    >
      <ExerciseSelect
        exercises={category.exercises}
        list={list}
        lang={lang}
        checked={checked}
        onChange={onChange}
      />
    </DropdownPanel>
    )
  } else {
    return(
    <DropdownPanel
      panelName={category.name[lang]}
      isExpanded={isExpanded}
      setExpanded={() => setExpanded(!isExpanded)}
      panelStyle={classes.panel}
      detailsStyle={classes.details}
      summaryStyle={classes.summary}
    >
      <p>...</p>
    </DropdownPanel>
    )
  }
};
const ExercisesPanel = withStyles(styles)(exercisesPanel);


const ExerciseSelect = props => {
  const { exercises, checked, onChange, lang, list } = props;
  let ret = [];

  mapObject(exercises, (exercise, index) => {
    if (exercises[exercise]) {
      ret.push(
        <DropdownSelect
          onClick={onChange}
          index={index}
          key={index}
          paperColor="primary"
          divStyle="SelectGrid"
          radioStyle="SelectRadio"
          checked={checked}
          value={exercise}
        >
          <p className="SelectID">{exercise}</p>
          <p className="SelectName">{list[exercise].name[lang]}</p>
        </DropdownSelect>
      );
    }
  });

  return ret;
};

export default withStyles(styles)(SessionDialog);
