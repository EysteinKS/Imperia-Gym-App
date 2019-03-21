import React from "react"
import { withStyles } from "@material-ui/core/styles";
import { DialogWindow } from "./dialog"

const styles = () => ({
  dialog: {

  },
  title: {
    
  },
  content: {

  },
  actions: {

  }
})

const AdminDialog = props => {
  const { classes, openDialog } = props

  return(
    <DialogWindow
      scroll="body"
      isOpen={openDialog === "admin"}
      dialogStyle={classes.dialog}
      titleStyle={classes.title}
      contentStyle={classes.content}
      actionsStyle={classes.actions}
    >

    </DialogWindow>
  )
}

export default withStyles(styles)(AdminDialog)