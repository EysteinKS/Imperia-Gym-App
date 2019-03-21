import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: "5vh",
    height: "7vh"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const ButtonAppBar = props => {
  const [anchor, setAnchor] = useState(null);

  const { classes } = props;
  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
      <div>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={event => setAnchor(event.currentTarget)}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          ancholrEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}
        >
          <MenuItem onClick={() => setAnchor(null)}>
            <Link to={routes.HOME}>Admin</Link>
          </MenuItem>
          <MenuItem onClick={() => setAnchor(null)}>
            <Link to={routes.SESSION}>Session</Link>
          </MenuItem>
        </Menu>
        </div>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          ISNCE GYM
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
