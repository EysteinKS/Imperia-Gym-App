import React from "react"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";
import LockIcon from "@material-ui/icons/Lock"
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel"

export const getIcon = (icon) => {
  switch(icon){
    case("edit"):
      return <EditIcon/>
    case("delete"):
      return <DeleteIcon/>
    case("play"):
      return <PlayIcon/>
    case("pause"):
      return <PauseIcon/>
    case("stop"):
      return <StopIcon/>
    case("lock"):
      return <LockIcon/>
    case("add"):
      return <AddIcon/>
    case("save"):
      return <SaveIcon/>
    case("cancel"):
      return <CancelIcon/>
    default:
      break
  }
}