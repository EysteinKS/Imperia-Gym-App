import React from "react";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const Exercise = props => {
  const { machine, index, onChange, onRemove } = props;

  return (
    <Paper key={index} className="ExerciseGrid">
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
      <Button size="small" className="GridItemEdit">
        <EditIcon />
      </Button>
      <Button size="small" onClick={onRemove} className="GridItemRemove">
        <DeleteIcon />
      </Button>
      <input
        name="notes"
        type="text"
        value={machine.notes}
        onChange={event => onChange({ ...machine, notes: event.target.value })}
        className="GridItemNotes"
      />
    </Paper>
  );
};

export default Exercise;
