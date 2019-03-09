import React, { useState, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const Exercise = props => {
  const { newExercise, index, onChange, onRemove } = props;
  const [expanded, setExpanded] = useState(false);
  const [timerStatus, setTimerStatus] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const timeoutRef = useRef(null);

  let menu = (
    <React.Fragment>
      <TextField
        name="notes"
        variant="outlined"
        value={newExercise.notes}
        onChange={event =>
          onChange({ ...newExercise, notes: event.target.value })
        }
        className="GridItemNotes"
      />
      {confirmDelete ? (
        <Button
          onClick={() => {
            clearTimeout(timeoutRef.current);
            setConfirmDelete(false);
            onRemove();
          }}
          className="GridItemRemove"
          variant="outlined"
          color="secondary"
        >
          <DeleteIcon />?
        </Button>
      ) : (
        <Button
          onClick={() => {
            setConfirmDelete(true);
            setDeleteTimeout();
          }}
          className="GridItemRemove"
        >
          <DeleteIcon />
        </Button>
      )}
    </React.Fragment>
  );

  const setDeleteTimeout = () => {
    const timeout = setTimeout(() => {
      setConfirmDelete(false);
    }, 3000);
    timeoutRef.current = timeout;
  };

  let pauseOrEdit;
  if (timerStatus === "play") {
    pauseOrEdit = (
      <Button className="GridItemEdit" onClick={() => setTimerStatus("paused")}>
        <PauseIcon />
      </Button>
    );
  } else {
    pauseOrEdit = (
      <Button className="GridItemEdit" onClick={() => setExpanded(!expanded)}>
        <EditIcon />
      </Button>
    );
  }

  return (
    <Paper className="ExerciseGrid" key={index}>
      <p className="GridItemName">{newExercise.name}</p>
      <FormControl className="GridItemWeight" disabled={timerStatus === "play"}>
        {newExercise.weightArray ? (
          <Select
            className="GridItemWeight"
            value={newExercise.weight}
            onChange={event =>
              onChange({ ...newExercise, weight: event.target.value })
            }
            input={<OutlinedInput labelWidth={0} />}
          >
            {newExercise.weightArray.map((weight, index) => {
              return (
                <MenuItem value={weight} key={index}>
                  {weight}
                </MenuItem>
              );
            })}
          </Select>
        ) : (
          <TextField
            className="GridItemWeight"
            value={newExercise.weight}
            variant="outlined"
            placeholder="Vekt"
            onChange={event =>
              onChange({ ...newExercise, weight: event.target.value })
            }
            disabled={timerStatus === "play"}
            InputProps={{
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>
            }}
          />
        )}
      </FormControl>
      {pauseOrEdit}
      <ExerciseTimer
        timerStatus={timerStatus}
        setTimerStatus={setTimerStatus}
        setExpanded={setExpanded}
      />
      {expanded ? menu : null}
    </Paper>
  );
};

//Save when exercise started, duration and when ended
const ExerciseTimer = props => {
  let ret;
  if (props.timerStatus === "play") {
    ret = (
      <Button
        className="GridItemTimer"
        onClick={() => props.setTimerStatus("stopped")}
      >
        <StopIcon />
      </Button>
    );
  } else {
    ret = (
      <Button
        className="GridItemTimer"
        onClick={() => {
          props.setTimerStatus("play");
          props.setExpanded(false);
        }}
      >
        <PlayIcon />
      </Button>
    );
  }

  return ret;
};

export default Exercise;
