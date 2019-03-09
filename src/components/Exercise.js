import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import StopIcon from "@material-ui/icons/Stop"

const Exercise = props => {
  const { machine, index, onChange, onRemove } = props;
  const [ expanded, setExpanded ] = useState(false)
  const [ timerStatus, setTimerStatus ] = useState()
  const [ confirmDelete, setConfirmDelete ] = useState(false)

  let menu = (
    <React.Fragment>
      <input
        name="notes"
        type="text"
        value={machine.notes}
        onChange={event => onChange({ ...machine, notes: event.target.value })}
        className="GridItemNotes"
      />
      {confirmDelete
        ? <Button size="small" onClick={onRemove} className="GridItemRemove" variant="contained" color="secondary"><DeleteIcon />?</Button>
        : <Button size="small" onClick={() => { setConfirmDelete(true); setTimeout(() => setConfirmDelete(false), 3000)}} className="GridItemRemove"><DeleteIcon /></Button>
      }
    </React.Fragment>
  )

  let pauseOrEdit

  if(timerStatus == "play"){
    pauseOrEdit = <Button size="small" className="GridItemEdit" onClick={() => setTimerStatus("paused")}><PauseIcon /></Button>
  } else { 
    pauseOrEdit = <Button size="small" className="GridItemEdit" onClick={() => setExpanded(!expanded)}><EditIcon /></Button>
  }

  return (
    <Paper className="ExerciseGrid" key={index}>
      <p className="GridItemName">{machine.name}</p>
      <Select
        className="GridItemSelect"
        value={machine.weight}
        onChange={event => onChange({ ...machine, weight: event.target.value })}
        input={<OutlinedInput labelWidth={0} />}
      >
        {machine.weightArray.map((weight, index) => {
          return (
            <MenuItem value={weight} key={index}>
              {weight}
            </MenuItem>
          );
        })}
      </Select>
      {pauseOrEdit}
      <ExerciseTimer timerStatus={timerStatus} setTimerStatus={setTimerStatus} setExpanded={setExpanded}/>
      {expanded ? menu : null}
    </Paper>
  );
};

//Save when exercise started, duration and when ended

const ExerciseTimer = props => {
  let icon
  if(props.timerStatus == "play") {
    icon = <Button className="GridItemTimer" onClick={() => props.setTimerStatus("stopped")}><StopIcon/></Button>
  } else {
    icon= <Button className="GridItemTimer" onClick={() => { 
      props.setTimerStatus("play") 
      props.setExpanded(false)
    }}><PlayIcon/></Button>
  }

  return icon
}

export default Exercise;
