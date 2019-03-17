import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

export const DialogWindow = props => {
  const {
    isOpen,
    scroll,
    onClose,
    fullWidth,
    maxWidth,
    title,
    actions,
    dialogStyle,
    titleStyle,
    contentStyle,
    actionsStyle
  } = props;

  return (
    <Dialog
      open={isOpen}
      scroll={scroll}
      onClose={onClose}
      className={dialogStyle}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle className={titleStyle}>{title}</DialogTitle>
      <DialogContent className={contentStyle}>{props.children}</DialogContent>
      <DialogActions className={actionsStyle}>{actions}</DialogActions>
    </Dialog>
  );
};

DialogWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  scroll: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.element.isRequired,
  actions: PropTypes.element.isRequired,
  dialogStyle: PropTypes.string,
  titleStyle: PropTypes.string,
  actionsStyle: PropTypes.string
};

DialogWindow.defaultProps = {
  scroll: "paper",
  fullWidth: true,
  maxWidth: "md"
}