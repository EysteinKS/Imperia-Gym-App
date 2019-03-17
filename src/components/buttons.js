import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { getIcon } from "./icons";

export const SquareButton = props => {
  const { onClick, buttonStyle, variant, color, icon } = props;

  let content = props.children;
  if (icon) {
    let buttonIcon = getIcon(icon);
    buttonIcon ? (content = buttonIcon) : (content = "");
  }

  return (
    <Button onClick={onClick} className={buttonStyle} variant={variant} color={color}>
      {content}
    </Button>
  );
};

SquareButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string
};

export const RoundButton = props => {};
