import React, { useState } from "react";
import { DropdownPanel } from "./dropdown";
import { withStyles } from "@material-ui/core/styles";
import { SquareButton } from "./buttons";
import Paper from "@material-ui/core/Paper";

const styles = () => ({
  panel: {
    width: "100%",
    padding: "0px",
    marginBottom: "0px",
    display: "block",
    border: "1px solid rgba(0,0,0,.125)",
    boxShadow: "none",
    margin: "0px !important"
  },

  details: {
    width: "100%",
    padding: "0px",
    marginBottom: "0px",
    display: "block"
  },

  summary: {
    minHeight: 56
  },

  darkBackground: {
    backgroundColor: "rgba(0,0,0,.03)"
  },

  summaryContent: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },

  exercise: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

const EditExercises = props => {
  const {
    list,
    categories,
    lang,
    openExerciseDialog,
    openCategoryDialog,
    classes
  } = props;
  const [isExpanded, setExpanded] = useState(true);

  let exercises = [];
  Object.keys(categories).forEach(category => {
    exercises.push(
      <ExercisesPanel
        category={categories[category]}
        list={list}
        lang={lang}
        openExerciseDialog={openExerciseDialog}
        openCategoryDialog={openCategoryDialog}
        classes={classes}
      />
    );
  });
  //console.log("Array of ExercisesPanels: ", exercises)

  let heading;
  if (lang === "NO") {
    heading = "Øvelser";
  } else {
    heading = "Exercises";
  }
  let addButton = (
    <SquareButton
      icon="add"
      onClick={() => openCategoryDialog({ type: "add", target: "" })}
    />
  );
  let summary = (
    <div className={classes.summaryContent}>
      <p>{heading}</p>
      {addButton}
    </div>
  );

  return (
    <div>
      <DropdownPanel
        panelName={heading}
        isExpanded={isExpanded}
        setExpanded={() => setExpanded(!isExpanded)}
        panelStyle={classes.panel}
        detailsStyle={classes.details}
        summaryStyle={classes.darkBackground + " " + classes.summary}
        summaryContent={summary}
      >
        {exercises}
      </DropdownPanel>
    </div>
  );
};

const exercisesPanel = props => {
  const {
    category,
    list,
    lang,
    onAdd,
    openExerciseDialog,
    openCategoryDialog,
    classes
  } = props;
  const [isExpanded, setExpanded] = useState(false);
  let nestedPanels = [];

  let editButton = (
    <SquareButton
      icon="edit"
      onClick={() => openCategoryDialog({ type: "edit", target: category.id })}
    />
  );
  let addButton = (
    <SquareButton
      icon="add"
      onClick={() => openCategoryDialog({ type: "add", target: "" })}
    />
  );
  let summary = (
    <div className={classes.summaryContent}>
      <p>{category.name[lang]}</p>
      <span>
        {editButton}
        {addButton}
      </span>
    </div>
  );
  //console.log("category at ExercisesPanel: ", category)

  //IF CATEGORY CONTAINS SUBCATEGORIES BUT NOT EXERCISES
  if (category.categories && !category.exercises) {
    Object.keys(category.categories).forEach(cat =>
      nestedPanels.push(
        <ExercisesPanel
          category={category.categories[cat]}
          list={list}
          lang={lang}
          onAdd={onAdd}
          openExerciseDialog={callback => openExerciseDialog(callback)}
          openCategoryDialog={callback => openCategoryDialog(callback)}
          classes={classes}
        />
      )
    );
    //console.log("categories is true, exercises is false")
    return (
      <DropdownPanel
        isExpanded={isExpanded}
        setExpanded={() => setExpanded(!isExpanded)}
        panelStyle={classes.panel}
        detailsStyle={classes.details}
        summaryStyle={classes.summary}
        summaryContent={summary}
      >
        {nestedPanels}
      </DropdownPanel>
    );
    //IF CATEGORY CONTAINS BOTH SUBCATEGORIES AND EXERCISES
  } else if (category.exercises && category.categories) {
    //console.log("categories is true, exercises is true")
    Object.keys(category.categories).forEach(cat =>
      nestedPanels.push(
        <ExercisesPanel
          category={category.categories[cat]}
          list={list}
          lang={lang}
          onAdd={onAdd}
          openExerciseDialog={callback => openExerciseDialog(callback)}
          openCategoryDialog={callback => openCategoryDialog(callback)}
          classes={classes}
        />
      )
    );
    return (
      <DropdownPanel
        isExpanded={isExpanded}
        setExpanded={() => setExpanded(!isExpanded)}
        panelStyle={classes.panel}
        detailsStyle={classes.details}
        summaryStyle={classes.summary}
        summaryContent={summary}
      >
        <ExerciseArray
          exercises={category.exercises}
          list={list}
          lang={lang}
          openExerciseDialog={callback => openExerciseDialog(callback)}
        />
        {nestedPanels}
      </DropdownPanel>
    );
    //IF CATEGORY CONTAINS EXERCISES BUT NOT SUBCATEGORIES
  } else if (category.exercises && !category.categories) {
    //console.log("categories is false, exercises is true")
    return (
      <DropdownPanel
        isExpanded={isExpanded}
        setExpanded={() => setExpanded(!isExpanded)}
        panelStyle={classes.panel}
        detailsStyle={classes.details}
        summaryStyle={classes.summary}
        summaryContent={summary}
      >
        <ExerciseArray
          exercises={category.exercises}
          list={list}
          lang={lang}
          openExerciseDialog={callback => openExerciseDialog(callback)}
        />
      </DropdownPanel>
    );
    //IF CATEGORY CONTAINS NEITHER EXERCISES OR SUBCATEGORIES
  } else {
    return (
    <DropdownPanel
      isExpanded={isExpanded}
      setExpanded={() => setExpanded(!isExpanded)}
      panelStyle={classes.panel}
      detailsStyle={classes.details}
      summaryStyle={classes.summary}
      summaryContent={summary}
    >
      <p>...</p>
    </DropdownPanel>
    )
  }
};

const ExercisesPanel = withStyles(styles)(exercisesPanel);

const ExerciseArray = props => {
  const { exercises, list, lang, openExerciseDialog } = props;
  //console.log("exercises at ExerciseArray: ", exercises)
  let arr = [];
  Object.keys(exercises).forEach(ex => {
    arr.push(
      <Exercise
        exercise={list[ex]}
        lang={lang}
        openExerciseDialog={() =>
          openExerciseDialog({ type: "edit", target: list[ex].id })
        }
        key={list[ex].id}
      />
    );
  });
  return arr;
};

const exercisePaper = props => {
  const { exercise, lang, openExerciseDialog, classes } = props;
  return (
    <Paper key={exercise.id} square>
      <span className={classes.exercise}>
        <p>{exercise.id}</p>
        <p>{exercise.name[lang]}</p>
        <SquareButton icon="edit" onClick={() => openExerciseDialog()} />
      </span>
    </Paper>
  );
};

const Exercise = withStyles(styles)(exercisePaper);

export default withStyles(styles)(EditExercises);
