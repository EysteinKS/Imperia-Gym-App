import React, { useRef } from "react";
import PropTypes from "prop-types";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";

import { getIcon } from "./icons"

export const DropdownPanel = props => {
  const {
    isSquare,
    isExpanded,
    setExpanded,
    panelName,
    summaryContent,
    panelStyle,
    summaryStyle,
    detailsStyle
  } = props;
  const myRef = useRef(null);

  return (
    <ExpansionPanel
      square={isSquare}
      expanded={isExpanded}
      onChange={
        isExpanded
          ? () => {
              setExpanded(null);
            }
          : () => {
              setExpanded(panelName);
              myRef.current.scrollIntoView({ behavior: "smooth" });
            }
      }
      className={panelStyle}
    >
      <ExpansionPanelSummary className={summaryStyle}>
        {summaryContent ? (
          (<p>{panelName}</p>, summaryContent)
        ) : (
          <p>{panelName}</p>
        )}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={detailsStyle}>
        <div ref={myRef}>{props.children}</div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

DropdownPanel.propTypes = {
  isSquare: PropTypes.bool,
  isExpanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
  panelName: PropTypes.string.isRequired,
  summaryContent: PropTypes.element,
  panelStyle: PropTypes.string,
  summaryStyle: PropTypes.string,
  detailsStyle: PropTypes.string
};

DropdownPanel.defaultProps = {
  isSquare: true,
  isExpanded: false
};

export const DropdownSelect = props => {
  const {
    onClick,
    paperColor,
    shouldScroll,
    divStyle,
    radioStyle,
    checked,
    value,
    index
  } = props;

  let myRef = useRef(null);

  return (
    <Paper
      onClick={() => {
        onClick(value);
        if (shouldScroll) {
          myRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }}
      key={index}
      color={paperColor}
    >
      <div ref={myRef} className={divStyle}>
        <Radio
          checked={checked === value}
          onChange={() => onClick(value)}
          value={value}
          className={radioStyle}
        />
        {props.children}
      </div>
    </Paper>
  );
};

DropdownSelect.propTypes = {
  onClick: PropTypes.func.isRequired,
  paperColor: PropTypes.string,
  shouldScroll: PropTypes.bool,
  divStyle: PropTypes.string,
  radioStyle: PropTypes.string,
  checked: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.number
};

DropdownSelect.defaultProps = {
  shouldScroll: true
};

export const DropdownEdit = (props) => {
  const {onClick, index, color} = props

  return(
    <Paper onClick={() => onClick()} key={index} color={color}>
      {props.children}
      <div>{getIcon("edit")}</div>
    </Paper>
  )
}

DropdownEdit.propTypes = {
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number,
  color: PropTypes.string
}