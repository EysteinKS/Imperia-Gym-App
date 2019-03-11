//TODO

//HAVE STRING INPUT FIELD ON TOP TO ENTER
//HAVE MENUES UNDERNEATHER FOR MACHINES AND FREEWEIGHT SORTED

import React, { useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
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
  let dialogBottomRef = useRef(null);
  const scrollToBottom = () => {
    dialogBottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
          return (
            <ExercisePanel
              panel={map[panel]}
              key={index}
              expanded={secondExpanded}
              setExpanded={setSecondExpanded}
              class={classes.panel}
              scroll={scrollToBottom}
              lang={lang}
            >
              <ExerciseSelect
                object={map[panel]}
                checked={exerciseID}
                onChange={setExerciseID}
                lang={lang}
              />
            </ExercisePanel>
          );
        }
      }
    });

    if (result !== "active" && result !== "name" && result !== "id") {
      if (exercises[result].name[lang] !== undefined) {
        return (
          <ExercisePanel
            panel={map}
            key={index}
            expanded={expanded}
            setExpanded={setExpanded}
            class={classes.panel}
            darkBackground={classes.darkBackground}
            scroll={scrollToBottom}
            lang={lang}
          >
            {next}
          </ExercisePanel>
        );
      }
    }
  });
  return (
    <Dialog
      open={open}
      scroll="paper"
      onClose={() => handleDialogClose(false)}
      className="ExerciseDialog"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle>{heading}</DialogTitle>
      <DialogContent>
        {content}
        <div ref={dialogBottomRef} />
      </DialogContent>
      <DialogActions className={classes.center}>
        <TextField
          value={exerciseID}
          placeholder="ID"
          onChange={event => setExerciseID(event.target.value)}
          className="ExerciseInput"
          margin="normal"
          variant="filled"
        />
        <Button onClick={() => handleDialogClose(false)}>Lukk</Button>
        <Button
          onClick={() => {
            handleAddExercise(exerciseID);
            handleDialogClose(false);
          }}
        >
          Velg
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ExerciseSelect = props => {
  const { object, checked, onChange, lang } = props;
  let list = mapObject(object, (exercise, index) => {
    let id = object[exercise].ID;
    let myRef = useRef(null);

    //CHECK IF EXERCISE IS SELECTED, CHANGE COLOR ON PAPER WHEN ACTIVE

    if (exercise !== "active" && exercise !== "name" && exercise !== "id") {
      if (object[exercise].name[lang] !== undefined) {
        return (
          <Paper
            onClick={() => {
              onChange(id);
              myRef.current.scrollIntoView({ behavior: "smooth" });
            }}
            key={index}
            color="primary"
          >
            <div className="SelectGrid" ref={myRef}>
              <Radio
                checked={checked === id}
                onChange={() => onChange(id)}
                value={id}
                className="SelectRadio"
              />
              <p className="SelectID">{id}</p>
              <p className="SelectName">{object[exercise].name[lang]}</p>
            </div>
          </Paper>
        );
      }
    } else {
      return null;
    }
  });
  return list;
};

const ExercisePanel = props => {
  let panelName = props.panel.name[props.lang];
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
              props.scroll();
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
