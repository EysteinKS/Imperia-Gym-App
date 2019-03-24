import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { DialogWindow } from "./dialog";
import { SquareButton } from "./buttons";

const styles = () => ({
  dialog: {},
  title: {},
  content: {},
  actions: {}
});

const AdminDialog = props => {
  const { classes, openDialog, onClose, onAdd, onEdit, dialogType } = props;
  const { content, action } = dialogType;

  let title = ""
  let form;
  if (action.type === "add") {
    title += "Legg til ";
  }
  if (action.type === "edit") {
    title += "Rediger ";
  }
  if (content === "exercise") {
    title += "øvelse";
    form = <EditExercise />;
  }
  if (content === "category") {
    title += "kategori";
    form = <EditCategory />;
  }

  return (
    <DialogWindow
      isOpen={openDialog}
      onClose={() => onClose()}
      dialogStyle={classes.dialog}
      title={title}
      titleStyle={classes.title}
      contentStyle={classes.content}
      actions={
        <DialogActions
          close={onClose}
          add={onAdd}
          edit={onEdit}
          actionType={action.type}
        />
      }
      actionsStyle={classes.actions}
    >
      {form}
    </DialogWindow>
  );
};
AdminDialog.propTypes = {};

const DialogActions = props => {
  const { close, add, edit, actionType } = props;
  let done;
  if (actionType === "add") {
    done = (
      <SquareButton
        icon="save"
        onClick={() => {
          add();
          close();
        }}
      />
    );
  }
  if (actionType === "edit") {
    done = (
      <SquareButton
        icon="save"
        onClick={() => {
          edit();
          close();
        }}
      />
    );
  }

  return (
    <>
      <SquareButton icon="cancel" onClick={close} />
      {done}
    </>
  );
};

const EditCategory = props => {
  return null;
};

const EditExercise = props => {
  return null;
};

export default withStyles(styles)(AdminDialog);
